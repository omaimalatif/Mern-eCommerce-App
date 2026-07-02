import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import { IoSearchOutline } from "react-icons/io5";
import { FaSlidersH, FaBoxOpen, FaCircleNotch } from "react-icons/fa";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); 
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  // Static brand categories matching Scentsational Flickers collections
  const categories = ["Candles", "Diffusers", "Gifts", "Room Sprays", "Accessories"];

  useEffect(() => {
    const fetchShopProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts({
          page,
          limit: 9, 
          search,
          category,
          minPrice,
          maxPrice,
          sortBy,
          order
        });
        setProducts(data.products || []);
        setPagination(data.pagination || { currentPage: 1, totalPages: 1 });
      } catch (err) {
        console.error("Error fetching shop items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchShopProducts();
  }, [page, search, category, minPrice, maxPrice, sortBy, order]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1); 
  };

  const handleClearFilters = () => {
    setSearch("");
    setSearchInput("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/30 min-h-screen flex flex-col justify-between antialiased">
      <Header />
      
      <div className="p-4 md:p-8 mx-auto w-full max-w-7xl lg:max-w-[72vw] py-10 flex-grow">
        
        {/* INTERACTIVE COMPACT PAGE BANNER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              The Sensory Catalog
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">
              Hand-poured luxury essentials engineered for ultimate spatial warmth.
            </p>
          </div>

          {/* SOPHISTICATED SORT SELECTOR CONTAINER */}
          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap hidden sm:inline">
              Sort Matrix
            </span>
            <select 
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [sort, ord] = e.target.value.split("-");
                setSortBy(sort);
                setOrder(ord);
                setPage(1);
              }}
              className="text-xs font-semibold text-gray-700 border border-gray-200 rounded-xl p-3 bg-white focus:outline-none focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] cursor-pointer w-full md:w-56 shadow-2xs transition-colors"
            >
              <option value="createdAt-desc">Newest Studio Arrivals</option>
              <option value="basePrice-asc">Price: Low to High</option>
              <option value="basePrice-desc">Price: High to Low</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>
        </div>

        {/* CORE MARKETPLACE MULTI-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ASIDE STICKY CONTROL FILTER BAR */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 flex flex-col gap-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
            <div className="flex items-center justify-between border-b pb-3 border-gray-50">
              <div className="flex items-center gap-2 text-gray-800">
                <FaSlidersH className="text-[#8B5E3C] text-xs" />
                <h2 className="text-sm font-bold tracking-tight">Refine Collection</h2>
              </div>
              <button 
                onClick={handleClearFilters}
                className="text-[11px] font-bold text-[#8B5E3C] hover:text-[#724b2e] transition-colors"
              >
                Reset All
              </button>
            </div>

            {/* FORM OUTREACH MINIMAL SEARCH */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
              <input 
                type="text"
                placeholder="Search fragrances..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-gray-50/50 border border-gray-200 pl-3.5 pr-10 py-2.5 rounded-xl text-xs font-medium placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#8B5E3C] focus:ring-1 focus:ring-[#8B5E3C] transition-all"
              />
              <button type="submit" className="absolute right-3.5 text-gray-400 hover:text-gray-900 transition-colors" aria-label="Search">
                <IoSearchOutline size={16} />
              </button>
            </form>

            {/* BRAND COLLECTION FILTER ACCORDIONS */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Collections</h3>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => { setCategory(""); setPage(1); }}
                  className={`text-left text-xs py-2 px-3 rounded-xl transition-all font-medium ${!category ? "bg-[#8B5E3C]/10 text-[#8B5E3C] font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                >
                  All Master Batches
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setCategory(cat); setPage(1); }}
                    className={`text-left text-xs py-2 px-3 rounded-xl transition-all font-medium ${category.toLowerCase() === cat.toLowerCase() ? "bg-[#8B5E3C]/10 text-[#8B5E3C] font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* CURRENCY VALUATION INTERSTICIAL FILTER RANGE */}
            <div className="border-t border-gray-50 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Spectrum (Rs)</h3>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => { setMinPrice(e.target.value); setPage(1); }}
                  className="w-full bg-gray-50/50 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-center text-gray-700 focus:outline-none focus:bg-white focus:border-[#8B5E3C] transition-all"
                />
                <span className="text-gray-300 text-xs shrink-0">—</span>
                <input 
                  type="number" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
                  className="w-full bg-gray-50/50 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-center text-gray-700 focus:outline-none focus:bg-white focus:border-[#8B5E3C] transition-all"
                />
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN CONTAINER VIEWPORTS */}
          <div className="lg:col-span-9 w-full">
            {loading ? (
              /* MODERN SKELETON REPLACEMENT CONTAINER GRID */
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="w-full space-y-3 animate-pulse bg-white p-3 rounded-2xl border border-gray-100">
                    <div className="w-full aspect-[4/5] bg-gray-100 rounded-xl" />
                    <div className="h-3.5 bg-gray-100 rounded-md w-3/4 mx-auto" />
                    <div className="h-3 bg-gray-100 rounded-md w-1/2 mx-auto" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              /* CLEAN EMPTY LOG VIEWER SEARCH FALLBACK */
              <div className="text-center py-24 bg-white border border-dashed border-gray-200 rounded-2xl max-w-md mx-auto px-4 shadow-3xs mt-2 animate-fadeIn">
                <FaBoxOpen className="text-gray-300 text-4xl mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 text-base">No Fragrances Found</h3>
                <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto leading-relaxed">
                  We couldn't locate any products matching your current query combination parameters. Try clearing limits.
                </p>
                <button 
                  onClick={handleClearFilters}
                  className="mt-5 inline-block bg-[#8B5E3C] hover:bg-[#724b2e] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-2xs transition-colors"
                >
                  Clear Global Modifiers
                </button>
              </div>
            ) : (
              /* CORE COMPONENT CARD ARRAY MOUNT SYSTEM */
              <div className="space-y-12 animate-fadeIn">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-center w-full">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>

                {/* ADVANCED MULTI-PAGE SYSTEM PAGINATION NAVIGATION CONTROLS */}
                {pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 border-t border-gray-200/60 pt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-3xs"
                    >
                      Previous
                    </button>
                    
                    <span className="text-xs text-gray-400 font-semibold tracking-wide">
                      Batch <span className="text-gray-800 font-bold">{pagination.currentPage}</span> of {pagination.totalPages}
                    </span>
                    
                    <button
                      onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                      disabled={page === pagination.totalPages}
                      className="px-4 py-2.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-3xs"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ShopPage;