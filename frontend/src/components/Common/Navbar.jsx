import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { fetchUserCart } from "../../redux/cartSlice"; 
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline, IoBagOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaCircleNotch } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Connect live Redux state variables
  const { items: cartItems = [], loading } = useSelector((state) => state.cart);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync cart contents immediately when component drops onto browser layouts
  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  // Compute total item count for badge displaying rules
  const totalItemCount = cartItems.reduce((acc, item) => acc + (item?.quantity || 0), 0);

  // Compute subtotal value cleanly using the finalPrice key from your priceSnapshot object
  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item?.priceSnapshot?.finalPrice || item?.product?.basePrice || 0;
    return acc + itemPrice * (item?.quantity || 0);
  }, 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <>
      {/* HEADER BAR TRACK FRAME */}
      <header className="w-full font-[Manrope] sticky top-0 z-40">
        
        {/* GLASS + GRADIENT BACKGROUND LAYER */}
        <div className="relative bg-white/70 backdrop-blur-xl border-b border-gray-200/40 select-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8F5]/60 via-white/40 to-[#F7F1EC]/60 pointer-events-none" />

          {/* MAIN CONTENT ROW CONTEXT */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">

            {/* LOGO IMAGE EMBED BRAND HOOK */}
            <Link to="/" className="flex items-center transform active:scale-98 transition-transform">
              <div className="h-12 w-32 sm:h-14 sm:w-40 flex items-center justify-start overflow-hidden">
                <img
                  src="/Scentsational Flickers (1).webp"
                  alt="Scentsational Flickers Ateliers"
                  className="w-full h-full object-contain object-left scale-175 origin-left"
                  loading="eager"
                />
              </div>
            </Link>

            {/* MID-ZONE DESKTOP DESCRIPTIVE NAVIGATION LINKS */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-500">
              <Link className="hover:text-[#8B5E3C] transition-colors" to="/">Home</Link>
              <Link className="hover:text-[#8B5E3C] transition-colors" to="/shop">Shop</Link>
              <Link className="hover:text-[#8B5E3C] transition-colors" to="/about">About</Link>
              <Link className="hover:text-[#8B5E3C] transition-colors" to="/contact">Contact</Link>
            </nav>

            {/* UTILITIES RIGHT CONTROLS PORTFOLIO */}
            <div className="flex items-center gap-3.5 sm:gap-4 text-gray-700">

              {/* ACTION TRIGGER: INLINE SEARCH */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 rounded-lg hover:bg-gray-100/60 transition-colors cursor-pointer text-xl text-gray-600 hover:text-gray-900"
                aria-label="Toggle Search Grid"
              >
                <IoSearchOutline />
              </button>

              {/* ACTION TRIGGER: USER ACCOUNT CONTROL */}
              <button 
                onClick={() => navigate("/profile")}
                className="p-1.5 rounded-lg hover:bg-gray-100/60 transition-colors cursor-pointer text-lg text-gray-600 hover:text-gray-900"
                aria-label="View Profile parameters"
              >
                <FaRegUser />
              </button>

              {/* ACTION TRIGGER: EXTENDED COLLAPSIBLE SHOPPING BAG */}
              <button
                className="p-1.5 rounded-lg hover:bg-gray-100/60 transition-colors cursor-pointer relative select-none text-xl text-gray-600 hover:text-gray-900"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open Curation Bag Panel"
              >
                <IoBagOutline />
                {totalItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#8B5E3C] text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full shadow-xs transform translate-x-1.5 -translate-y-1">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* ACTION TRIGGER: TARGET INTERACTION DRAWER FOR TABLETS/MOBILES */}
              <button 
                className="md:hidden p-1.5 rounded-lg hover:bg-gray-100/60 transition-colors cursor-pointer text-2xl text-gray-600"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open Mobile Drawer Menu"
              >
                <IoMenuOutline />
              </button>
            </div>
          </div>
        </div>

        {/* INLINE EXPANSION INPUT STRIP SEARCH SECTORS */}
        {isSearchOpen && (
          <div className="border-b border-gray-200/40 bg-white/80 backdrop-blur-md relative z-20 animate-fadeIn">
            <form
              onSubmit={handleSearch}
              className="max-w-4xl mx-auto px-6 py-3 flex gap-2.5 items-center"
            >
              <input
                className="w-full bg-gray-50/50 border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-medium placeholder-gray-400 outline-none focus:bg-white focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all"
                placeholder="Search premium dynamic collections, handcrafted wax votives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />

              <button className="bg-[#8B5E3C] hover:bg-[#724b2e] cursor-pointer text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-2xs">
                Search
              </button>

              <button 
                type="button"
                className="cursor-pointer text-2xl p-1 text-gray-400 hover:text-gray-600 transition-colors" 
                onClick={() => setIsSearchOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* MOBILE EXPANSION NAV MENUS SKELETON CLIPS */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 animate-fadeIn">
          <div className="w-72 h-full bg-white/95 backdrop-blur-xl p-6 shadow-2xl flex flex-col justify-between animate-slideRight">
            <div>
              <div className="flex justify-between items-center mb-8 pb-3 border-b border-gray-100">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Navigation Suite</span>
                <button className="cursor-pointer p-1 text-gray-400 hover:text-gray-900 transition-colors text-2xl" onClick={() => setIsMenuOpen(false)}>
                  <IoCloseOutline />
                </button>
              </div>

              <div className="flex flex-col gap-4 text-gray-700 font-bold text-sm uppercase tracking-wider">
                <Link className="hover:text-[#8B5E3C] transition-colors py-1" to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link className="hover:text-[#8B5E3C] transition-colors py-1" to="/shop" onClick={() => setIsMenuOpen(false)}>Shop Collection</Link>
                <Link className="hover:text-[#8B5E3C] transition-colors py-1" to="/about" onClick={() => setIsMenuOpen(false)}>About Our Atelier</Link>
                <Link className="hover:text-[#8B5E3C] transition-colors py-1" to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">&copy; Scentsational Flickers Inc.</p>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED INTERACTIVE CART DRAWER WRAPPER ZONE */}
      <div
        className={`fixed top-0 right-0 h-full w-85 sm:w-100 bg-white shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header Block */}
        <div className="p-4 sm:p-5 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm uppercase tracking-wider text-gray-900">Your Selection Bag</h2>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-md text-gray-500 font-bold">
              {totalItemCount} Units
            </span>
          </div>
          <button className="cursor-pointer p-1 text-gray-400 hover:text-gray-700 transition-colors text-2xl" onClick={() => setIsCartOpen(false)}>
            <IoCloseOutline />
          </button>
        </div>

        {/* Drawer Scroll Container Core Viewport Area */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto flex-grow max-h-[calc(100vh-190px)] bg-gray-50/20">
          {loading && cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-48 gap-3 flex-grow">
              <FaCircleNotch className="text-[#8B5E3C] text-xl animate-spin" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Syncing Curation</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4 flex-grow animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-3">
                <IoBagOutline className="text-gray-300 text-xl" />
              </div>
              <p className="text-xs font-bold text-gray-800 uppercase tracking-wider">Your curation is empty</p>
              <p className="text-[11px] text-gray-400 mt-1 max-w-[200px] mx-auto leading-normal">Introduce signature aromatic notes into your daily rituals.</p>
              <Link 
                to="/shop" 
                onClick={() => setIsCartOpen(false)}
                className="mt-5 text-[10px] bg-[#8B5E3C] hover:bg-[#724b2e] text-white font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer"
              >
                Explore Catalog
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cartItems.map((item, index) => {
                const price = item?.priceSnapshot?.finalPrice || item?.product?.basePrice || 0;
                const name = item?.product?.name || "Unnamed Premium Votive";
                const image = item?.product?.images?.[0] || "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=100&q=80";

                return (
                  <div 
                    key={item?._id || item?.product?._id || `cart-item-${index}`} 
                    className="flex gap-4 py-4 first:pt-0 last:pb-0 animate-fadeIn"
                  >
                    {/* Item Image Preview Frame Thumbnail */}
                    <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100/80 shadow-3xs">
                      <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Dynamic Detail Text Information Blocks */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div>
                        <p className="font-extrabold text-xs text-gray-900 truncate leading-tight">{name}</p>
                        <p className="text-[10px] text-gray-400 font-semibold truncate mt-1 bg-gray-50 px-2 py-0.5 rounded border border-gray-100/50 inline-block">
                          Size: {item?.selectedOptions?.size || "Standard"} &bull; Profile: {item?.selectedOptions?.color || "Base"}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-[11px] text-gray-400 font-bold">Qty: {item?.quantity || 0}</p>
                        <span className="font-black text-xs text-gray-900 tracking-tight">
                          Rs. {((price * (item?.quantity || 0))).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Persistent Summary Control Actions Footer Block */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white shadow-lg">
            <div className="flex justify-between items-center font-bold text-gray-900 mb-4 px-1">
              <span className="text-xs uppercase tracking-wider text-gray-400">Estimated Total</span>
              <span className="text-lg font-black tracking-tight text-gray-900">Rs. {(subtotal ).toFixed(2)}</span>
            </div>

            <Link 
              to="/cart" 
              onClick={() => setIsCartOpen(false)}
              className="w-full block text-center bg-[#8B5E3C] hover:bg-[#724b2e] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-2xs transition-all cursor-pointer transform active:translate-y-px"
            >
              Review Curation & Checkout
            </Link>
          </div>
        )}
      </div>

      {/* DETACHED CLICK-AWAY UNDERLAY SHIELD BACKING */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 transition-opacity duration-300 animate-fadeIn"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </>
  );
}

export default Navbar;