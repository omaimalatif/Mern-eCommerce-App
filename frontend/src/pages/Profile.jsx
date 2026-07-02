import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import API from "../api/axios"; // ⚡ Import your pre-configured Axios instance with interceptor
import { FaUser, FaShoppingBag, FaBox, FaClock, FaCheckCircle, FaChevronDown } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null); // Accordion toggle state

  // Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchMyOrders();
    }
  }, [user, navigate]);

  const fetchMyOrders = async () => {
    try {
      // ⚡ Connects directly to your backend GET router.get("/my-orders") endpoint
      const response = await API.get("/orders/my-orders");
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to fetch order history snapshots:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const toggleOrderAccordion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  // Helper method to style order status pills nicely
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered": return "bg-green-50 text-green-700 border border-green-200";
      case "shipped": return "bg-blue-50 text-blue-700 border border-blue-200";
      case "processing": return "bg-amber-50 text-amber-700 border border-amber-200";
      case "cancelled": return "bg-red-50 text-red-700 border border-red-200";
      default: return "bg-gray-50 text-gray-600 border border-gray-200";
    }
  };

  if (!user) return null;

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen flex flex-col justify-between antialiased">
      <Header />

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACCOUNT INFOCARD */}
        <div className="lg:col-span-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs">
          <div className="flex flex-col items-center text-center border-b pb-6 mb-6">
            <div className="w-16 h-16 bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full flex items-center justify-center mb-3">
              <FaUser size={28} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.name || "User Account"}</h2>
            <p className="text-xs text-gray-400 font-medium mt-1">{user.email}</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Account ID</span>
              <span className="font-mono text-xs text-gray-700 truncate max-w-[150px]">
                {user._id || user.id || "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Privilege Role</span>
              <span className="capitalize font-semibold text-gray-800 bg-gray-100 px-2.5 py-0.5 rounded-md text-xs">
                {user.role || "user"}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/logout"
              className="w-full block text-center bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Logout Account
            </Link>
            <Link
              to="/shop"
              className="w-full block text-center border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: ORDERS TRANSACTION LOGS HISTORY */}
        <div className="lg:col-span-8 bg-white border border-gray-100 p-6 rounded-2xl shadow-xs min-h-[400px]">
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <FaShoppingBag className="text-[#8B5E3C]" />
            <h2 className="text-lg font-bold text-gray-900">Your Order Logs History</h2>
          </div>

          {loadingOrders ? (
            <div className="flex flex-col justify-center items-center py-24">
              <div className="w-8 h-8 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-xs font-medium mt-4">Retrieving backend logs records...</p>
            </div>
          ) : orders.length === 0 ? (
            /* EMPTY LOG STATE VIEW */
            <div className="text-center py-20 border border-dashed border-gray-200 rounded-2xl max-w-md mx-auto px-4 mt-4">
              <FaBox className="text-gray-300 text-4xl mx-auto mb-3" />
              <h3 className="font-bold text-gray-800 text-base">No Orders Recorded Yet</h3>
              <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto">
                Looks like you haven't placed any purchases through our secure system pipeline yet.
              </p>
              <Link
                to="/shop"
                className="mt-5 inline-block bg-[#8B5E3C] hover:bg-[#724b2e] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition"
              >
                Browse Catalog
              </Link>
            </div>
          ) : (
            /* MAP THROUGH USER ORDERS */
            <div className="space-y-4">
              {orders.map((order) => {
                const isExpanded = expandedOrder === order._id;
                // Stored in Cents inside Database Schema -> Divide by 100 to show Rupees
                const displayTotal = order.totalPrice ;
                const formattedDate = new Date(order.createdAt).toLocaleDateString("en-PK", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });

                return (
                  <div 
                    key={order._id} 
                    className="border border-gray-100 rounded-xl overflow-hidden shadow-2xs hover:border-gray-200 transition-all bg-white"
                  >
                    {/* Header Summary Row (Clickable) */}
                    <div 
                      onClick={() => toggleOrderAccordion(order._id)}
                      className="p-4 bg-gray-50/50 flex flex-wrap justify-between items-center gap-4 cursor-pointer select-none"
                    >
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium">Order Reference</p>
                        <p className="text-sm font-bold text-gray-800 truncate max-w-[140px] sm:max-w-none">
                          #{order._id.substring(order._id.length - 8).toUpperCase()}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium">Date Placed</p>
                        <p className="text-sm font-semibold text-gray-700">{formattedDate}</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-gray-400 font-medium">Total Amount</p>
                        <p className="text-sm font-extrabold text-[#8B5E3C]">
                          Rs {displayTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusBadgeClass(order.orderStatus)}`}>
                          {order.orderStatus || "pending"}
                        </span>
                        <FaChevronDown 
                          size={12} 
                          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[#8B5E3C]" : ""}`} 
                        />
                      </div>
                    </div>

                    {/* Accordion Items Detail Dropdown Section */}
                    {isExpanded && (
                      <div className="p-4 border-t border-gray-100 space-y-4 bg-white animate-fadeIn">
                        
                        {/* Nested Map Items Loop */}
                        <div className="divide-y divide-gray-50">
                          {order.items?.map((item, index) => {
                            const itemPrice = (item.priceSnapshot?.finalPrice || 0) ;
                            
                            return (
                              <div key={index} className="py-3 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                                <div className="space-y-0.5">
                                  <p className="font-semibold text-gray-800">{item.nameSnapshot || "Product Details Snapshot"}</p>
                                  {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                                    <p className="text-xs text-gray-400 font-medium">
                                      {Object.entries(item.selectedOptions)
                                        .map(([key, val]) => `${key}: ${val}`)
                                        .join(" | ")}
                                    </p>
                                  )}
                                  <p className="text-xs text-gray-400">Quantity: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-gray-700 text-sm">
                                  Rs {(itemPrice * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Breakdown Pricing and Shipping Snapshot metadata info blocks */}
                        <div className="bg-gray-50 rounded-xl p-3 text-xs grid grid-cols-1 sm:grid-cols-2 gap-4 border border-gray-100">
                          <div className="space-y-1">
                            <p className="font-bold text-gray-700 mb-1">Shipping Target Details</p>
                            <p className="text-gray-500"><span className="font-medium">Recipient:</span> {order.shippingInfo?.fullName}</p>
                            <p className="text-gray-500"><span className="font-medium">Phone:</span> {order.shippingInfo?.phone || "N/A"}</p>
                            <p className="text-gray-500 truncate"><span className="font-medium">Address:</span> {order.shippingInfo?.address}, {order.shippingInfo?.city}</p>
                          </div>
                          
                          <div className="space-y-1.5 sm:text-right flex flex-col justify-end">
                            <div className="flex justify-between sm:justify-end gap-4 text-gray-400">
                              <span>Subtotal Price:</span>
                              <span className="font-medium text-gray-700">Rs {(order.itemsPrice ).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between sm:justify-end gap-4 text-gray-400">
                              <span>Shipping Logistics Fee:</span>
                              <span className="font-medium text-gray-700">Rs {(order.shippingPrice ).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between sm:justify-end gap-4 text-gray-400 font-bold border-t pt-1.5 mt-1">
                              <span className="text-gray-700">Grand Invoice Total:</span>
                              <span className="text-[#8B5E3C] text-sm">Rs {displayTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      <Footer />
    </main>
  );
};

export default Profile;