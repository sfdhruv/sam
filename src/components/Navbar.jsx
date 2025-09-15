import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

function Navigation({ onSearch, searchQuery: externalSearchQuery }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);

  // Determine if we're controlling search internally or externally
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : localSearchQuery;

  // Function to determine active class
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (externalSearchQuery === undefined) {
      setLocalSearchQuery(value);
    }
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Clear search
  const clearSearch = () => {
    if (externalSearchQuery === undefined) {
      setLocalSearchQuery("");
    }
    if (onSearch) {
      onSearch("");
    }
    if (location.pathname === "/products") {
      navigate("/products");
    }
  };

  // Handle auth form input change
  const handleAuthFormChange = (e) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Switch between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setAuthError("");
    setAuthForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  // Handle login
  const handleLogin = () => {
    if (!authForm.email || !authForm.password) {
      setAuthError("Please fill in all fields");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === authForm.email && u.password === authForm.password);

    if (user) {
      setIsLoggedIn(true);
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setShowAuthModal(false);
      setAuthError("");
      setAuthForm({ name: "", email: "", password: "", confirmPassword: "" });
      window.location.reload();
    } else {
      setAuthError("Invalid email or password");
    }
  };

  // Handle signup
  const handleSignup = () => {
    if (!authForm.name || !authForm.email || !authForm.password) {
      setAuthError("Please fill in all fields");
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.some(u => u.email === authForm.email);

    if (userExists) {
      setAuthError("User with this email already exists");
      return;
    }
    const newUser = {
      id: Date.now(),
      name: authForm.name,
      email: authForm.email,
      password: authForm.password
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(newUser));
    setIsLoggedIn(true);
    setUser(newUser);
    setShowAuthModal(false);
    setAuthError("");
    setAuthForm({ name: "", email: "", password: "", confirmPassword: "" });
    window.location.reload();
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
  };

  // Handle auth form submission
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <>
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-bold text-indigo-600 border-b-2 border-indigo-600"
                      : "text-xl font-bold text-indigo-600"
                  }>
                  MyStore
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
                <NavLink to="/products" className={getNavLinkClass}>Products</NavLink>
                <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
                <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              {location.pathname === "/products" && (
                <div className={`relative ${isSearchFocused || searchQuery ? 'w-64' : 'w-48'} transition-all duration-300`}>
                  <form onSubmit={handleSearchSubmit}>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                      />
                      {searchQuery && (
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            className="h-5 w-5 text-gray-400 hover:text-gray-500"
                            onClick={clearSearch}
                          >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              )}

              {/* Cart Button */}
{/* Cart Button */}
{isLoggedIn && (
  <button
    onClick={() => navigate("/cart")}
    className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
  >
    🛒 Cart
  </button>
)}

              {/* User Account Section */}
              {isLoggedIn ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-800 font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block">{user?.name}</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Orders</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      setShowAuthModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      setShowAuthModal(true);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal (unchanged) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            {/* same modal content as before */}
            <div className="mt-3">
              <div className="flex justify-between items-center pb-3 border-b">
                <h3 className="text-xl font-medium text-gray-900">
                  {isLogin ? "Log in to your account" : "Create an account"}
                </h3>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="mt-4 space-y-4" onSubmit={handleAuthSubmit}>
                {!isLogin && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={authForm.name}
                      onChange={handleAuthFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="John Doe"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={authForm.email}
                    onChange={handleAuthFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={authForm.password}
                    onChange={handleAuthFormChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={authForm.confirmPassword}
                      onChange={handleAuthFormChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="••••••••"
                    />
                  </div>
                )}
                
                {authError && (
                  <div className="text-red-600 text-sm">{authError}</div>
                )}
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLogin ? "Sign in" : "Create account"}
                  </button>
                </div>
                
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navigation;
