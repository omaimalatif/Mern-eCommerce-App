import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { FaHeart, FaLeaf, FaGem } from "react-icons/fa";

const About = () => {
  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen flex flex-col justify-between antialiased">
      <Header />

      {/* Hero Section */}
      <div className="w-full bg-white border-b border-gray-100 py-16 text-center px-4">
        <span className="text-xs font-bold tracking-widest text-[#8B5E3C] uppercase block mb-3">
          Our Fragrant Journey
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight max-w-xl mx-auto">
          About Scentsational Flickers
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto mt-3">
          Crafting premium, eco-friendly hand-poured candles designed to transform your ordinary spaces into luxurious sanctuaries.
        </p>
      </div>

      {/* Brand Story & Values Section */}
      <div className="max-w-5xl mx-auto px-4 py-16 w-full space-y-16 flex-grow">
        
        {/* Core Story Banner Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-gray-100 p-6 sm:p-10 rounded-3xl shadow-3xs">
          <div className="h-72 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80" 
              alt="Handcrafted Candles Making" 
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">The Glow of Artistry</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Born from a passionate obsession with sensory aesthetics, <span className="font-semibold text-gray-800">Scentsational Flickers (@scentsational_flickers)</span> began as an artisanal studio dedicated to curation. Every flicker tells an emotional story. 
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              We carefully blend natural waxes, high-grade aromatics, and clean-burning cotton wicks. Each vessel is individually hand-poured in small batches, ensuring unparalleled throw performance, cozy crackles, and minimalist visual sophistication.
            </p>
          </div>
        </div>

        {/* Three Pillars Core Values Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-3 shadow-3xs">
            <div className="w-12 h-12 bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full flex items-center justify-center mx-auto">
              <FaLeaf size={18} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">100% Sustainable</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Formulated purely utilizing toxic-free natural soy wax alternatives kind to your respiration system and the planet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-3 shadow-3xs">
            <div className="w-12 h-12 bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full flex items-center justify-center mx-auto">
              <FaHeart size={18} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Artisan Poured</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Crafted lovingly item-by-item, making certain that your specific candle configuration arrives uniquely flawless.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center space-y-3 shadow-3xs">
            <div className="w-12 h-12 bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-full flex items-center justify-center mx-auto">
              <FaGem size={18} />
            </div>
            <h3 className="font-bold text-gray-900 text-base">Luxury Throw</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Curated using premium notes that fill complex spatial dimensions cleanly even when cold-sitting.
            </p>
          </div>
        </div>

        {/* Call To Action Box */}
        <div className="text-center bg-[#8B5E3C] text-white p-8 rounded-3xl space-y-4 shadow-sm">
          <h3 className="text-lg font-bold">Discover Your Signature Fragrance</h3>
          <p className="text-white/80 text-xs max-w-sm mx-auto leading-relaxed">
            From soothing lavender-infused nights to spiced botanical mornings, find the perfect candle aura that mirrors your seasonal lifestyle.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-[#8B5E3C] font-bold text-xs px-6 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Explore Collections
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  );
};

export default About;