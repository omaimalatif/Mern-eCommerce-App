import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    title: "Luxury Candles for Every Mood",
    desc: "Hand-poured scents designed to calm, inspire, and elevate your space.",
  },
  {
    title: "Meaningful Gifts That Last",
    desc: "Thoughtfully crafted gifts that create unforgettable memories.",
  },
  {
    title: "Warm Light, Cozy Nights",
    desc: "Transform your home into a peaceful sanctuary with premium fragrances.",
  },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true); // Start fade-in
      }, 300); // Wait for fade-out to finish
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-[#FFF8F5]/40 flex flex-col lg:flex-row items-center font-[Manrope] px-4 md:px-10 lg:px-20 py-12 gap-12 overflow-hidden justify-center">
      
      {/* LEFT DESIGN ACCENT: Decorative soft ambient glow */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#8B5E3C]/5 rounded-full filter blur-[80px] pointer-events-none -z-10" />

      {/* TEXT SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center relative z-10 text-center lg:text-left order-2 lg:order-1">
        <span className="text-xs font-bold tracking-[0.2em] text-[#8B5E3C] uppercase mb-4 block">
          Artisanal Studio Selection
        </span>

        {/* Dynamic Slider Content Wrapper */}
        <div className={`transition-all duration-300 transform ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight">
            {slides[index].title}
          </h1>

          <p className="mt-5 text-sm md:text-base text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            {slides[index].desc}
          </p>
        </div>

        {/* Navigation Call-to-Action Links */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link
            to="/shop"
            className="bg-[#8B5E3C] hover:bg-[#724b2e] text-white transition-colors px-8 py-3.5 rounded-xl font-semibold text-sm shadow-xs"
          >
            Shop Collection
          </Link>

          <Link
            to="/about"
            className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-colors px-8 py-3.5 rounded-xl font-semibold text-sm"
          >
            Our Story
          </Link>
        </div>

        {/* Slider Indicator Dots Bar */}
        <div className="flex gap-2.5 mt-10 justify-center lg:justify-start">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setFade(false);
                setTimeout(() => {
                  setIndex(i);
                  setFade(true);
                }, 200);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "bg-[#8B5E3C] w-8" : "bg-gray-200 hover:bg-gray-300 w-2"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: LUXURY ASYMMETRIC VISUAL PRESENTATION */}
      <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
        <div className="relative w-full max-w-[340px] md:max-w-[420px] lg:max-w-[460px]">
          
          {/* Decorative Backdrop Framed Shadow Block */}
          <div className="absolute -inset-3 bg-[#8B5E3C]/5 rounded-[32px] rotate-2 transform scale-102 -z-10" />

          {/* Core Banner Image Showcase */}
          <div className="w-full aspect-[4/5] rounded-[28px] overflow-hidden shadow-md border border-white bg-gray-50">
            <img
              src="/photo.jpg"
              alt="Luxury candle product lifestyle curation"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Floating Minimalist Premium Product Badge */}
          <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md text-gray-800 px-4 py-2.5 rounded-xl shadow-xs text-xs font-bold border border-gray-100 flex items-center gap-1.5 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            100% Hand-Poured
          </div>

        </div>
      </div>

    </section>
  );
}

export default Hero;