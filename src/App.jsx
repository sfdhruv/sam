import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./AppRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user"); // Clean up invalid data
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    // You might also want to clear other user-related data
    localStorage.removeItem("cart");
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navigation
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onLogin={handleLogin}
        />

        <main className="flex-grow">
          <AppRoutes 
            isAuthenticated={isAuthenticated} 
            user={user}
            onLogin={handleLogin}
          />
        </main>

        {/* Footer only shows when user is not authenticated */}
        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;