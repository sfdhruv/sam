// HomePage.js (updated)
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Product from "./Product";

function HomePage({ isAuthenticated }) {
  const navigate = useNavigate();
  
  // Banner data
  const banners = [
    {
      id: 1,
      title: "Summer Collection",
      subtitle: "Up to 50% off on summer essentials",
      image:
        "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      cta: "Shop Now",
      bgGradient: "from-yellow-100 to-orange-200",
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Discover our latest collection of premium products",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      cta: "Explore",
      bgGradient: "from-blue-50 to-indigo-100",
    },
    {
      id: 3,
      title: "Flash Sale",
      subtitle: "Limited time offers - don't miss out!",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      cta: "Grab Deals",
      bgGradient: "from-red-50 to-pink-100",
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Function to go to a particular banner by index (for dots navigation)
  const goToBanner = (index) => {
    setCurrentBanner(index);
  };

  // When a category is clicked, redirect to /products?search=categoryName
  const handleCategoryClick = (searchQuery) => {
    navigate(`/products?search=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Rotating Banner Section */}
      <section
        className={`relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r ${banners[currentBanner].bgGradient}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {banners[currentBanner].title}
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                {banners[currentBanner].subtitle}
              </p>
              <Link
                to="/products"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:-translate-y-1"
              >
                {banners[currentBanner].cta}
              </Link>
            </div>

            <div className="lg:w-1/2">
              <img
                src={banners[currentBanner].image}
                alt={banners[currentBanner].title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Banner navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToBanner(index)}
                className={`w-3 h-3 rounded-full ${
                  currentBanner === index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Product Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <button
              onClick={() => handleCategoryClick("shirt")}
              className="group text-left focus:outline-none"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105 text-center">
                <div className="h-48 bg-gradient-to-br from-green-200 to-teal-300 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    👕
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Shirts</h3>
                  <p className="text-gray-600 text-sm mt-1">Explore our collection</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("watch")}
              className="group text-left focus:outline-none"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105 text-center">
                <div className="h-48 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    ⌚
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Watches</h3>
                  <p className="text-gray-600 text-sm mt-1">Luxury timepieces</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("headphone")}
              className="group text-left focus:outline-none"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105 text-center">
                <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-300 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    🎧
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Headphones</h3>
                  <p className="text-gray-600 text-sm mt-1">Premium audio gear</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleCategoryClick("shoe")}
              className="group text-left focus:outline-none"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 group-hover:scale-105 text-center">
                <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">
                    👟
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">Shoes</h3>
                  <p className="text-gray-600 text-sm mt-1">Stylish footwear</p>
                </div>
              </div>
            </button>
          </div>
<Product/>
          {/* Featured Products Section */}
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Shirt Product Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <button
                onClick={() => handleCategoryClick("shirt")}
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-green-200 to-teal-300 flex items-center justify-center">
                  <span className="text-5xl">👕</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Premium Cotton Shirt</h3>
                <p className="text-indigo-600 font-bold mt-1">₹49.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  High-quality cotton shirt with perfect fit and comfort for all-day wear.
                </p>
                <button
                  onClick={() => handleCategoryClick("shirt")}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View Shirts
                </button>
              </div>
            </div>

            {/* Watch Product Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <button
                onClick={() => handleCategoryClick("watch")}
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center">
                  <span className="text-5xl">⌚</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Luxury Chronograph Watch</h3>
                <p className="text-indigo-600 font-bold mt-1">₹249.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  Elegant timepiece with precision movement and premium materials.
                </p>
                <button
                  onClick={() => handleCategoryClick("watch")}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View Watches
                </button>
              </div>
            </div>

            {/* Headphone Product Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <button
                onClick={() => handleCategoryClick("headphone")}
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-purple-200 to-pink-300 flex items-center justify-center">
                  <span className="text-5xl">🎧</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Wireless Noise-Canceling Headphones</h3>
                <p className="text-indigo-600 font-bold mt-1">₹179.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  Immersive audio experience with advanced noise cancellation technology.
                </p>
                <button
                  onClick={() => handleCategoryClick("headphone")}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View Headphones
                </button>
              </div>
            </div>

            {/* Shoe Product Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <button
                onClick={() => handleCategoryClick("shoe")}
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center">
                  <span className="text-5xl">👟</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Running Shoes</h3>
                <p className="text-indigo-600 font-bold mt-1">₹89.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  Lightweight and comfortable running shoes with excellent support.
                </p>
                <button
                  onClick={() => handleCategoryClick("shoe")}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View Shoes
                </button>
              </div>
            </div>

            {/* Extra Product — Designer Bag as link to all products */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
             <button
                onClick={() => handleCategoryClick("bag")}  //change
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-red-200 to-pink-300 flex items-center justify-center">
                  <span className="text-5xl">👜</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Designer Bag</h3>
                <p className="text-indigo-600 font-bold mt-1">₹149.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  Stylish and functional designer bag for everyday use.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View All Products
                </Link>
              </div>
            </div>

            {/* Extra Product — Phone Accessories */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <button
                onClick={() => handleCategoryClick("phone")}  //change
                className="w-full text-left focus:outline-none"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-blue-300 flex items-center justify-center">
                  <span className="text-5xl">📱</span>
                </div>
              </button>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Phone Accessories</h3>
                <p className="text-indigo-600 font-bold mt-1">From ₹24.99</p>
                <p className="text-gray-600 text-sm my-2 line-clamp-2">
                  Protective cases and accessories for your mobile devices.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mt-2"
                >
                  View All Products
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                All our products are carefully selected for their exceptional quality and durability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Your transactions are protected with industry-leading security measures.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We ship worldwide with express options to get your products to you quickly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;