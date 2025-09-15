import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Classic White Shirt",
      category: "shirt",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Running Shoes",
      category: "shoe",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Leather Watch",
      category: "watch",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "Wireless Headphones",
      category: "headphone",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      name: "Denim Shirt",
      category: "shirt",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      name: "Casual Loafers",
      category: "shoe",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 7,
      name: "Smart Watch",
      category: "watch",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 8,
      name: "Noise Cancelling Headphones",
      category: "headphone",
      price: 149.99,
      image:
        "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 9,
      name: "Formal Shirt",
      category: "shirt",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 10,
      name: "Basketball Shoes",
      category: "shoe",
      price: 119.99,
      image:
        "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 11,
      name: "Luxury Watch",
      category: "watch",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1585123334904-845d60e97b29?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 12,
      name: "Gaming Headset",
      category: "headphone",
      price: 99.99,
      image:
        "https://images.unsplash.com/photo-1629429407756-4a7703614972?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FtaW5nJTIwaGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D",
    },
    // Bags
    {
      id: 13,
      name: "Leather Backpack",
      category: "bag",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 14,
      name: "Designer Handbag",
      category: "bag",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 15,
      name: "Travel Duffel Bag",
      category: "bag",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1509762774605-f07235a08f1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 16,
      name: "Mini Crossbody Bag",
      category: "bag",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    // Phone Accessories
    {
      id: 17,
      name: "Wireless Charger",
      category: "phone",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpcmVsZXNzJTIwY2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 18,
      name: "Premium Phone Case",
      category: "phone",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1743670827800-61375c99e7a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJlbWl1bSUyMHBob25lJTIwY2FzZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 19,
      name: "Bluetooth Earbuds",
      category: "phone",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 20,
      name: "Phone Grip Stand",
      category: "phone",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1592571148494-08b2c2253556?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmUlMjBncmlwJTIwc3RhbmR8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 21,
      name: "Car Phone Mount",
      category: "phone",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1698314440055-5aa837af0a7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwcGhvbmUlMjBtb3VudHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 22,
      name: "Power Bank 10000mAh",
      category: "phone",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1706275400998-7fc21c8cd8ed?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvd2VyJTIwYmFua3xlbnwwfHwwfHx8MA%3D%3D",
    }
  ];
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Add this hook

  // Check login state from localStorage
  const checkLoginStatus = () => {
    const userData = localStorage.getItem("user");
    setIsLoggedIn(!!userData);
  };
  
  useEffect(() => {
    checkLoginStatus();
    const handleStorageChange = () => {
      checkLoginStatus();
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case "shirt":
      return "fa-shirt";
    case "shoe":
      return "fa-shoe-prints";
    case "watch":
      return "fa-clock";
    case "headphone":
      return "fa-headphones";
    case "bag":
      return "fa-briefcase";
    case "phone":
      return "fa-mobile-alt";
    default:
      return "fa-store";
  }
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("⚠️ Please login first to add products to cart!");
      return;
    }
    
    // Get existing cart or create new one
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = existingCart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex >= 0) {
      // Increment quantity if product exists
      existingCart[existingProductIndex].quantity += 1;
    } else {
      // Add new product with quantity 1
      existingCart.push({...product, quantity: 1});
    }
    
    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));
    
    // Navigate to cart page
    navigate("/cart");
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductDetail = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["all", "shirt", "shoe", "watch", "headphone", "bag", "phone"].map((category) => (

            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-4 py-2 rounded-full ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <i
                className={`fas ${getCategoryIcon(category)} mr-2 ${
                  activeCategory === category ? "text-white" : "text-indigo-600"
                }`}
              ></i>
              {category === "all" ? "All Products" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openProductDetail(product)}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹ {product.price}
                  </span>
                  <button
                    disabled={!isLoggedIn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className={`text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center ${
                      isLoggedIn
                        ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-5xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or search term
            </p>
          </div>
        )}

        {/* Product Detail Modal */}
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="relative">
                <button
                  onClick={closeProductDetail}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
                >
                  <i className="fas fa-times text-gray-600"></i>
                </button>
                <div className="grid md:grid-cols-2 gap-8 p-6">
                  <div className="flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-96 object-contain rounded-lg"
                    />
                  </div>
                  <div className="py-4">
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded mb-4 inline-block">
                      {selectedProduct.category.charAt(0).toUpperCase() +
                        selectedProduct.category.slice(1)}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation.
                    </p>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Details</h3>
                      <ul className="text-gray-600 list-disc pl-5">
                        <li>High-quality materials</li>
                        <li>Designed for comfort and durability</li>
                        <li>30-day return policy</li>
                        <li>Free shipping on orders over ₹1000</li>
                      </ul>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-indigo-600">
                        ₹ {selectedProduct.price}
                      </span>
                      <button
                        disabled={!isLoggedIn}
                        onClick={() => handleAddToCart(selectedProduct)}
                        className={`text-white font-medium rounded-lg text-sm px-5 py-3 text-center ${
                          isLoggedIn
                            ? "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Product;