import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const [step, setStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get order details from localStorage or generate mock data
    const checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || {};
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    const orderData = {
      orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleDateString(),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      items: cartItems,
      total: checkoutData.total || 0,
      shippingAddress: checkoutData.shippingAddress || {}
    };
    
    setOrderDetails(orderData);
    localStorage.setItem("orderDetails", JSON.stringify(orderData));

    // Animation sequence
    const timer1 = setTimeout(() => setStep(2), 2000);
    const timer2 = setTimeout(() => setStep(3), 4000);
    const timer3 = setTimeout(() => setStep(4), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmation</h1>
          <p className="text-gray-600">Thank you for your purchase!</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Order Number</p>
                <p className="font-medium">{orderDetails.orderId}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date</p>
                <p className="font-medium">{orderDetails.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Delivery</p>
                <p className="font-medium">{orderDetails.estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Amount</p>
                <p className="font-medium text-indigo-600">₹ {orderDetails.total}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {orderDetails.shippingAddress && Object.keys(orderDetails.shippingAddress).length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h2>
              <div className="text-gray-600">
                <p>{orderDetails.shippingAddress.firstName} {orderDetails.shippingAddress.lastName}</p>
                <p>{orderDetails.shippingAddress.address}</p>
                <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.zipCode}</p>
                <p>{orderDetails.shippingAddress.country}</p>
                <p className="mt-2">📞 {orderDetails.shippingAddress.phone}</p>
                <p>✉️ {orderDetails.shippingAddress.email}</p>
              </div>
            </div>
          )}

          {/* Delivery Status Animation */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Delivery Status</h2>
            
            <div className="relative">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 z-0"></div>
                <div 
                  className="absolute top-3 left-0 h-1 bg-indigo-600 z-10 transition-all duration-1000"
                  style={{ width: step >= 1 ? '100%' : step >= 0.5 ? '50%' : '0%' }}
                ></div>
                
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative z-20">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      i <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {i}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Status Labels */}
              <div className="flex justify-between text-xs md:text-sm">
                <div className={`text-center w-1/4 ${step >= 1 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Order Confirmed
                </div>
                <div className={`text-center w-1/4 ${step >= 2 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Processing
                </div>
                <div className={`text-center w-1/4 ${step >= 3 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Shipped
                </div>
                <div className={`text-center w-1/4 ${step >= 4 ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                  Out for Delivery
                </div>
              </div>
            </div>

            {/* Animated Icons */}
            <div className="text-center mt-10">
              {step === 1 && (
                <div className="animate-bounce">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✅</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Order Confirmed!</h3>
                  <p className="text-gray-600">We've received your order.</p>
                </div>
              )}
              
              {step === 2 && (
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Processing Order</h3>
                  <p className="text-gray-600">We're preparing your items.</p>
                </div>
              )}
              
              {step === 3 && (
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Order Shipped</h3>
                  <p className="text-gray-600">Your order is on the way!</p>
                </div>
              )}
              
              {step === 4 && (
                <div className="animate-bounce">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏍️</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Out for Delivery</h3>
                  <p className="text-gray-600">Your order will arrive soon!</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Items in Your Order</h2>
            <div className="space-y-4">
              {orderDetails.items.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Order Total</span>
              <span className="text-xl font-bold text-indigo-600">₹ {orderDetails.total}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/products")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </button>
              <button 
                onClick={() => window.print()}
                className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Print Receipt
              </button>
              <button 
                onClick={() => navigate("/home")}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              >
                Back to Home
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Need help? <a href="#" className="text-indigo-600 hover:underline">Contact Support</a>
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Animation */}
        <div className="mt-8 bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Live Delivery Tracking</h2>
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-1000"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Your order is {step === 1 ? 'confirmed' : step === 2 ? 'being processed' : step === 3 ? 'on its way' : 'out for delivery'}!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;