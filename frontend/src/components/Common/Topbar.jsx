import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

const TopBar = () => {
  return (
    <div className="w-full bg-stone-900 text-stone-300 border-b border-stone-800/60 font-[Manrope] select-none relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-2">

        {/* Left - Social Links Matrix */}
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200" aria-label="Facebook">
            <FaFacebookF size={12} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200" aria-label="Instagram">
            <FaInstagram size={12} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-200" aria-label="TikTok">
            <FaTiktok size={12} />
          </a>
        </div>

        {/* Center - Fine Luxury Copywriting Banner */}
        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-stone-200 flex-1 text-center md:block">
          Handcrafted Premium Wax Votives & Luxury Fragrances
        </div>

        {/* Right - Contact Methods */}
        <div className="hidden sm:flex items-center gap-5 text-[11px] font-bold uppercase tracking-wider">
          <a
            href="mailto:support@scentsationalflickers.com"
            className="flex items-center gap-1.5 hover:text-white transition-colors duration-200"
          >
            <IoMailOutline className="text-sm" />
            <span className="hidden md:inline">Atelier Care</span>
          </a>

          <div className="w-[1px] h-3 bg-stone-800" />

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors duration-200"
          >
            <FaWhatsapp className="text-sm text-emerald-500 hover:text-emerald-400" />
            <span className="hidden md:inline">Concierge</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopBar;