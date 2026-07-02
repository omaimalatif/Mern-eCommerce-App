import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full font-[Manrope] mt-auto relative z-10 select-none">
      {/* GLASS + GRADIENT LAYER COATED WRAPPER */}
      <div className="relative bg-white/70 backdrop-blur-xl border-t border-gray-200/50 overflow-hidden">
        {/* Subtle Warm Vignette Backing */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF8F5]/80 via-white/40 to-[#F7F1EC]/60 pointer-events-none" />

        {/* MAXIMUM GRID WIDTH HOLDER */}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8 flex flex-col items-center">
          
          {/* MINIMALIST LUXURY BRANDING HOOK */}
          <div className="mb-6 text-center">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-800">
              Scentsational Flickers
            </span>
            <div className="w-6 h-[1px] bg-[#8B5E3C]/40 mx-auto mt-2" />
          </div>

          {/* COMPACT NAVIGATION PILLS */}
          <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 text-xs font-bold tracking-wider text-gray-500 uppercase mb-8">
            <Link className="hover:text-[#8B5E3C] transition-colors" to="/about">About Us</Link>
            <Link className="hover:text-[#8B5E3C] transition-colors" to="/shop">The Catalog</Link>
            <Link className="hover:text-[#8B5E3C] transition-colors" to="/">Terms & Safety</Link>
            <Link className="hover:text-[#8B5E3C] transition-colors" to="/profile">My Account</Link>
          </nav>

          {/* SOCIAL MEDIA MATRIX EMBEDS */}
          <div className="flex items-center gap-5 mb-10">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300 shadow-3xs hover:-translate-y-0.5 text-sm"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300 shadow-3xs hover:-translate-y-0.5 text-sm"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300 shadow-3xs hover:-translate-y-0.5 text-sm"
              aria-label="Twitter X"
            >
              <FaXTwitter />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="w-8 h-8 rounded-full border border-gray-200/80 bg-white flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#8B5E3C] hover:border-[#8B5E3C] transition-all duration-300 shadow-3xs hover:-translate-y-0.5 text-sm"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>

          {/* HARD SYSTEM SUB-FOOTER LINE */}
          <div className="w-full border-t border-gray-200/40 pt-6 flex flex-col sm:flex-row items-center justify-center text-center gap-2">
            <p className="text-[10px] text-gray-400 font-bold tracking-wide">
              &copy; {currentYear} SCENTSATIONAL FLICKERS STUDIO. COATED ATELIER LABS.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;