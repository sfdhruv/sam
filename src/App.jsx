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
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
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
          <AppRoutes isAuthenticated={isAuthenticated} />
        </main>

        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
