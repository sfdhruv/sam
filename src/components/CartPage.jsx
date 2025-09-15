import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    const loggedIn = !!userData;
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      // Redirect to products page if not logged in
      navigate("/products");
      return;
    }
    
    // Load cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [navigate]);

  // If not logged in, don't render the cart page
  if (!isLoggedIn) {
    return null;
  }

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-shopping-cart text-5xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <button 
            onClick={() => navigate("/products")}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {cartItems.map(item => (
            <div key={item.id} className="p-4 border-b border-gray-200 flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              
              <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹ {item.price}</p>
              </div>
              
              <div className="flex items-center">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  -
                </button>
                
                <span className="mx-3 font-medium">{item.quantity}</span>
                
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center"
                >
                  +
                </button>
                
                <button 
                  onClick={() => removeItem(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-gray-50 flex justify-between items-center">
            <h3 className="text-xl font-bold">Total: ₹ {calculateTotal()}</h3>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between">
          <button 
            onClick={() => navigate("/products")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 flex items-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Shopping
          </button>
          <button 
            onClick={() => navigate("/checkout")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Continue to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;