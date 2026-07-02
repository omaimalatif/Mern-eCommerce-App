import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import API from "../api/axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items = [] } = useSelector((state) => state.cart || { items: [] });

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const email = user?.email || "";

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 💰 PRICE CALC (Calculated in Cents from schema targets)
  const rawSubtotal = items.reduce((acc, item) => {
    const itemPrice = item.priceSnapshot?.finalPrice || item.product?.basePrice || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  const total = rawSubtotal ;

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    // 1. Basic Form Validation
    if (!shipping.address || !shipping.city || !shipping.postalCode || !shipping.phone) {
      toast.error("Please fill all shipping details including your phone number.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    const orderPayload = {
      shippingInfo: {
        fullName: user?.name || "Guest Customer",
        phone: shipping.phone,
        address: shipping.address,
        city: shipping.city,
        postalCode: shipping.postalCode,
        country: "Pakistan",
      },
      paymentMethod: "COD",
    };

    try {
      const response = await API.post("/orders/checkout", orderPayload);

      if (response.data && response.data._id) {
        toast.success("Order placed successfully (COD)!");
        
        dispatch({ type: "cart/clearCart" }); 

        setTimeout(() => {
          navigate("/order-success"); 
        }, 1500);
      }
    } catch (error) {
      console.error("Checkout submission failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FFF8F5]/40 font-[Manrope]">
      <Toaster position="bottom-right" />
      <Header />

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE - FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-800 mb-6">Secure Checkout</h2>

          {/* CONTACT INFO */}
          <div className="mb-5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Email (locked)</label>
            <input
              value={email}
              disabled
              className="w-full text-xs font-semibold text-gray-400 border border-gray-100 p-3.5 rounded-xl bg-gray-50/80 cursor-not-allowed outline-none"
            />
          </div>

          {/* SHIPPING */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 border-b border-gray-50 pb-2">Shipping Destination</h3>

            <input
              name="address"
              placeholder="Street Address"
              onChange={handleChange}
              className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
            />

            <input
              name="phone"
              placeholder="Mobile Phone Number (e.g., 03001234567)"
              onChange={handleChange}
              className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
              />

              <input
                name="state"
                placeholder="State / Province"
                onChange={handleChange}
                className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
              />
            </div>

            <input
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleChange}
              className="w-full border border-gray-200 text-xs font-medium p-3.5 rounded-xl focus:outline-none focus:border-[#8B5E3C] bg-gray-50/30 focus:bg-white transition-all"
            />
          </div>

          {/* PAYMENT */}
          <div className="mt-6">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-800 mb-2">Payment Mode</h3>
            <div className="p-3.5 border border-amber-200/60 rounded-xl bg-amber-50/40 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
              Cash on Delivery (COD)
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-fit">
          <h2 className="text-sm font-black uppercase tracking-wider text-gray-800 mb-6">Selected Curation</h2>

          {/* ITEMS */}
          <div className="space-y-4 max-h-72 overflow-y-auto mb-6 pr-1 custom-scrollbar">
            {items.map((item, index) => {
              const price = item.priceSnapshot?.finalPrice || item.product?.basePrice || 0;
              const name = item.product?.name || "Unnamed Premium Votive";
              const img = item.product?.images?.[0] || "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=100&q=80";
              const itemTotal = (price * item.quantity) ;

              return (
                <div key={item._id || `checkout-item-${index}`} className="flex gap-4 items-center border-b border-gray-50/60 pb-3 last:border-0 last:pb-0">
                  <img
                    src={img}
                    alt={name}
                    className="w-12 h-14 object-cover rounded-xl border border-gray-100 shadow-3xs flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-gray-900 truncate leading-tight">{name}</p>
                    <p className="text-[10px] text-gray-400 font-bold mt-1">Units: {item.quantity}</p>
                  </div>
                  <p className="font-black text-xs text-gray-900 whitespace-nowrap tracking-tight">
                    Rs {itemTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </p>
                </div>
              );
            })}
          </div>

          {/* PRICES */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex justify-between font-black text-sm uppercase tracking-wider text-gray-900">
              <span>Total Payable</span>
              <span className="text-base tracking-tight">Rs {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleOrder}
            disabled={loading}
            className={`w-full mt-6 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-2xs ${
              loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#8B5E3C] hover:bg-[#724b2e] active:translate-y-px"
            }`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>

      </div>

      <Footer />
    </main>
  );
};

export default Checkout;