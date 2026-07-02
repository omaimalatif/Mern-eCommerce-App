import React from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { FaInstagram, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/40 min-h-screen flex flex-col justify-between antialiased">
      <Header />

      {/* Hero Header Banner */}
      <div className="w-full bg-white border-b border-gray-100 py-16 text-center px-4">
        <span className="text-xs font-bold tracking-widest text-[#8B5E3C] uppercase block mb-3">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight max-w-xl mx-auto">
          Connect With Us
        </h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto mt-3">
          Have an inquiry regarding custom wedding bulk giveaways, corporate orders, or fragrance consultations? We are here to answer.
        </p>
      </div>

      {/* Main Content Info Hub */}
      <div className="max-w-4xl mx-auto px-4 py-16 w-full flex-grow flex items-center justify-center">
        <div className="w-full bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-3xs grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Direct Outreach Links */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Our Channels</h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                We prefer direct peer communication channel methods. Drop us a message across any standard touchpoint platform.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="https://instagram.com/scentsational_flickers" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-4 p-4 border border-gray-50 rounded-2xl hover:bg-[#FFF8F5]/30 hover:border-[#8B5E3C]/20 transition"
              >
                <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 via-red-500 to-purple-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <FaInstagram size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Instagram DM</p>
                  <p className="text-sm font-bold text-gray-800 truncate">@scentsational_flickers</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 border border-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-[#8B5E3C]/10 text-[#8B5E3C] rounded-xl flex items-center justify-center shrink-0">
                  <FaEnvelope size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">Email Address</p>
                  <p className="text-sm font-bold text-gray-800 truncate">hello.scentsational@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Studio Operation Status Info */}
          <div className="space-y-6 md:border-l md:pl-8 md:border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Studio Details</h2>
              <p className="text-gray-400 text-xs leading-relaxed">
                Currently operates as an exclusive digital e-commerce storefront with local pickup facilities available across core hubs.
              </p>
            </div>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="text-[#8B5E3C] mt-0.5 shrink-0" size={14} />
                <div>
                  <p className="font-semibold text-gray-800 text-xs">Origin Location</p>
                  <p className="text-xs text-gray-400 mt-0.5">Hand-poured & Distributed locally in Pakistan.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <FaClock className="text-[#8B5E3C] mt-0.5 shrink-0" size={14} />
                <div>
                  <p className="font-semibold text-gray-800 text-xs">Support Timings</p>
                  <p className="text-xs text-gray-400 mt-0.5">Monday – Saturday: 11:00 AM – 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Aesthetic Disclaimer Footnote */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-[11px] text-amber-800/80 leading-relaxed">
              <strong>Order processing schedule notice:</strong> Please allow 24-48 business hours for tracking assignment details update after confirmation due to curing times.
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;