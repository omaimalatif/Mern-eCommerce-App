import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart, updateCartItem, removeCartItem } from "../redux/cartSlice";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  
  // Extract cart states from Redux store
  const { items: cartItems = [], loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  // Handle item quantity modification routines
  const handleQuantityChange = async (item, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await dispatch(
        updateCartItem({
          productId: item.product?._id,
          quantity: newQuantity,
          selectedOptions: item.selectedOptions
        })
      ).unwrap();
      toast.success("Quantity updated", { id: "cart-update" });
    } catch (err) {
      toast.error(err || "Failed to update item count parameters.");
    }
  };

  // Handle item eviction routines
  const handleRemoveItem = async (item) => {
    try {
      await dispatch(
        removeCartItem({
          productId: item.product?._id,
          selectedOptions: item.selectedOptions
        })
      ).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      toast.error(err || "Failed to remove item.");
    }
  };

  // Helper method to resolve dynamic option markup
  const renderOptionBadges = (item) => {
    const badges = [];
    
    if (item.selectedOptions?.size) {
      badges.push(`Size: ${item.selectedOptions.size}`);
    }
    if (item.selectedOptions?.color) {
      // Clean slug names like "black-white" into readable labels
      const readableColor = item.selectedOptions.color.replace("-", "/");
      badges.push(`Color: ${readableColor}`);
    }
    if (item.selectedOptions?.customEngraving) {
      badges.push(`Engraving: "${item.selectedOptions.customEngraving}"`);
    }

    return badges.join(" | ");
  };

  // Subtotal computations relying on your specific schema price targets
  const calculatedSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.priceSnapshot?.finalPrice || item.product?.basePrice || 0;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Constants
  const shippingFee = 0; // PKR 250.00 (Stored in Cents)

  return (
    <main className="w-full font-[Manrope] bg-gray-50 min-h-screen antialiased flex flex-col justify-between">
      <Toaster position="bottom-right" />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8">Shopping Cart</h1>

        {loading && cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-32 bg-white rounded-2xl border border-gray-100 shadow-xs">
            <div className="w-8 h-8 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-xs font-medium mt-4">Analyzing cart snapshots...</p>
          </div>
        ) : cartItems.length === 0 ? (
          /* EMPTY CART VIEW STATE */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-xs max-w-2xl mx-auto px-4">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingCart className="text-gray-300 text-2xl" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Your cart is feeling light</h2>
            <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
              Looks like you haven't added any items to your configuration bag yet.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#724b2e] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-xs transition"
            >
              <IoArrowBackOutline /> Continue Shopping
            </Link>
          </div>
        ) : (
          /* LIVE VIEW WITH CONTENT ITEMS */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: LIST OF PRODUCTS */}
            <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item, index) => {
                const price = item.priceSnapshot?.finalPrice || item.product?.basePrice || 0;
                const name = item.product?.name || "Unnamed Product";
                const img = item.product?.images?.[0] || "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=100&q=80";

                return (
                  <div
                    key={item._id || `cart-page-item-${index}`}
                    className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex gap-4 sm:gap-6 relative group"
                  >
                    {/* Thumbnail Image Section */}
                    <div className="w-20 h-24 sm:w-24 sm:h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img src={img} alt={name} className="w-full h-full object-cover object-center" />
                    </div>

                    {/* Meta Specifications Box */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div className="pr-6">
                        <h3 className="font-bold text-gray-900 text-base truncate hover:text-[#8B5E3C] transition">
                          <Link to={`/product/${item.product?._id}`}>{name}</Link>
                        </h3>
                        <p className="text-xs text-gray-400 font-medium mt-1">
                          {renderOptionBadges(item)}
                        </p>
                      </div>

                      {/* Controls and Price Display Area */}
                      <div className="flex flex-wrap gap-4 items-center justify-between mt-4">
                        
                        {/* Quantity Increment Wrapper */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden h-9">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="px-3 text-gray-400 hover:text-black hover:bg-gray-50 transition h-full flex items-center justify-center"
                          >
                            <FaMinus className="text-[10px]" />
                          </button>
                          <span className="w-10 text-center text-sm font-bold text-gray-800 select-none">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="px-3 text-gray-400 hover:text-black hover:bg-gray-50 transition h-full flex items-center justify-center"
                          >
                            <FaPlus className="text-[10px]" />
                          </button>
                        </div>

                        {/* Financial Summaries for current item row */}
                        <div className="text-right">
                          <span className="text-xs text-gray-400 block">Total</span>
                          <span className="font-extrabold text-base text-gray-900">
                            PKR {((price * item.quantity)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Icon Button Anchor */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition p-1"
                      title="Remove product"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY SIDEBAR */}
            <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm border-b pb-6 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">PKR {(calculatedSubtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-gray-900">PKR {(shippingFee ).toFixed(2)}</span>
                </div>
              </div>

              {/* Grand Checkout Aggregation Target */}
              <div className="flex justify-between text-base font-bold text-gray-900 mb-6">
                <span>Grand Total</span>
                <span className="text-lg text-[#8B5E3C]">
                  PKR {((calculatedSubtotal + shippingFee) ).toFixed(2)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center bg-[#8B5E3C] hover:bg-[#724b2e] text-white py-3.5 rounded-xl font-semibold tracking-wide shadow-xs transition"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4">
                <Link
                  to="/shop"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 hover:text-black transition py-2"
                >
                  <IoArrowBackOutline /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default CartPage;