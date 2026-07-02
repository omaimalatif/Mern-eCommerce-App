import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsHome } from "../api/products";
import ProductCard from "./ProductCard";
import { FaBoxOpen } from "react-icons/fa";

const HomeProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsHome();
        setProducts(data || []);
      } catch (err) {
        console.error("Home products fetch runtime exception:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full font-[Manrope] px-4 md:px-8 py-16 mx-auto max-w-7xl lg:max-w-[72vw]">
      
      {/* SECTION HEADER BLOCK TITLE */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-[#8B5E3C] uppercase block mb-2">
          Customer Favorites
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Trending Products
        </h2>
        <div className="w-12 h-0.5 bg-[#8B5E3C] mx-auto mt-4 rounded-full" />
      </div>

      {/* CONDITIONAL RENDERING ARCHITECTURE STATE PIPELINE */}
      {loading ? (
        /* SKELETON PLACEHOLDER LOADING LIST GRID */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="w-full space-y-3 animate-pulse">
              <div className="w-full aspect-square bg-gray-100 rounded-2xl" />
              <div className="h-4 bg-gray-100 rounded-md w-3/4 mx-auto" />
              <div className="h-3 bg-gray-100 rounded-md w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* NO PRODUCTS FALLBACK STATE CONTAINER */
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl max-w-sm mx-auto px-4">
          <FaBoxOpen className="text-gray-300 text-3xl mx-auto mb-2" />
          <p className="text-sm font-semibold text-gray-500">No items available right now.</p>
        </div>
      ) : (
        /* ACTIVE PRODUCT DISPLAY ITEMS GRID CARD LAYOUT */
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* MINIMALIST LUXE PROMOTIONAL CATALYST COLLECTION BANNER */}
      <div className="mt-20 w-full bg-[#8B5E3C]/5 border border-[#8B5E3C]/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden">
        
        {/* Abstract structural glow accent inside banner layout */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#8B5E3C]/5 rounded-full filter blur-2xl pointer-events-none" />

        <div className="space-y-1 relative z-10">
          <h3 className="text-lg md:text-xl font-extrabold text-gray-900 tracking-tight">
            Explore the Full Studio Experience
          </h3>
          <p className="text-xs md:text-sm text-gray-500 max-w-md leading-relaxed">
            Discover our comprehensive signature catalog of scented wax bars, luxury sensory gift sets, and custom vessel curations.
          </p>
        </div>

        <Link
          to="/shop"
          className="bg-[#8B5E3C] hover:bg-[#724b2e] text-white transition-colors px-7 py-3 rounded-xl font-bold text-xs whitespace-nowrap shadow-xs relative z-10 uppercase tracking-wider"
        >
          Shop Full Collection
        </Link>
      </div>

    </section>
  );
};

export default HomeProductsSection;