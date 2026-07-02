import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaTruck } from "react-icons/fa";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const OrderSuccess = () => {
  // Generate a mock human-readable order date/number for display purposes
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const formattedDate = new Date().toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen antialiased flex flex-col justify-between">
      <Header />

      <div className="max-w-xl mx-auto px-4 py-16 w-full flex-grow flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
          
          {/* Animated Success Icon Area */}
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-5xl animate-bounce" />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto mb-8">
            Thank you for your purchase. Your order has been recorded and is currently being prepared for dispatch.
          </p>

          {/* Quick Info Grid Summary Box */}
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 text-sm mb-8 border border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Order Reference</span>
              <span className="font-bold text-gray-800">#PK-{orderNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Date</span>
              <span className="font-medium text-gray-700">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Payment Method</span>
              <span className="font-semibold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md text-xs">
                Cash on Delivery (COD)
              </span>
            </div>
          </div>

          {/* Logistics Milestone Indicators */}
          <div className="flex items-center justify-between px-6 mb-10 text-xs font-medium text-gray-400 relative">
            <div className="absolute top-4 left-12 right-12 h-0.5 bg-gray-200 -z-10"></div>
            
            <div className="flex flex-col items-center gap-1.5 bg-white px-2">
              <span className="w-8 h-8 rounded-full bg-[#8B5E3C] text-white flex items-center justify-center shadow-sm">
                <FaShoppingBag size={12} />
              </span>
              <span className="text-gray-900 font-semibold">Confirmed</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 bg-white px-2">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border">
                <FaTruck size={12} />
              </span>
              <span>Shipping</span>
            </div>

            <div className="flex flex-col items-center gap-1.5 bg-white px-2">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center border">
                <FaCheckCircle size={12} />
              </span>
              <span>Delivered</span>
            </div>
          </div>

          {/* Action Route Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 bg-[#8B5E3C] hover:bg-[#724b2e] text-white py-3.5 rounded-xl font-semibold text-sm shadow-xs transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/profile" // Or profile dashboard orders view link
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Check My Orders
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default OrderSuccess;