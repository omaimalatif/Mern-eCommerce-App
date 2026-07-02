import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { addItemToCart } from "../redux/cartSlice"; 
import { getProductById } from "../api/products"; 
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { IoStar, IoBagAddOutline } from "react-icons/io5";
import { FiGlobe, FiAward, FiArrowLeft } from "react-icons/fi";
import { FaCircleNotch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast"; 

const ProductDetailPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const { loading: cartUpdating } = useSelector((state) => state.cart);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({});
  const [engravingText, setEngravingText] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);

        if (!data) {
          setError("Product parameters could not be resolved.");
          return;
        }

        setProduct(data);

        // AUTO SELECT FIRST AVAILABLE OPTIONS (SAFE)
        const defaults = {};
        data.options?.forEach((opt) => {
          if (opt.type !== "text" && opt.choices?.length) {
            const first = opt.choices.find(c => c.isAvailable !== false);
            if (first) {
              defaults[opt.name] = first.value;
            }
          }
        });

        setSelectedOptions(defaults);

      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product specifications.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  const getOption = (name) =>
    product?.options?.find(o => o.name.toLowerCase() === name.toLowerCase());

  const getChoice = (optionName, value) => {
    const opt = getOption(optionName);
    return opt?.choices?.find(c => c.value === value);
  };

  const getCalculatedPrice = () => {
    if (!product) return 0;

    let finalPrice = product.baseSalePrice || product.basePrice;

    Object.entries(selectedOptions).forEach(([key, value]) => {
      const choice = getChoice(key, value);
      if (choice) {
        finalPrice += choice.priceAdjustment || 0;
      }
    });

    return finalPrice;
  };

  const handleAddToCartSubmit = async () => {
    setValidationError("");

    const payload = {
      productId: product._id,
      quantity: 1,
      selectedOptions: {
        ...selectedOptions,
        ...(engravingText.trim() && { customText: engravingText })
      }
    };

    try {
      await dispatch(addItemToCart(payload)).unwrap();

      toast.success(`${product.name} added safely to your cart!`, {
        position: "bottom-right"
      });

    } catch (err) {
      setValidationError(err || "Authentication validation failure.");
    }
  };

  if (loading) {
    return (
      <main className="w-full bg-[#FFF8F5]/30 min-h-screen font-[Manrope] flex flex-col justify-between">
        <Header />
        <div className="flex flex-col justify-center items-center py-44 flex-grow">
          <FaCircleNotch className="text-[#8B5E3C] text-3xl animate-spin" />
          <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mt-4">
            Syncing Specifications
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="w-full bg-[#FFF8F5]/30 min-h-screen font-[Manrope] flex flex-col justify-between">
        <Header />
        <div className="flex flex-col justify-center items-center py-40 gap-4 text-center px-6 flex-grow">
          <p className="text-gray-500 text-sm font-semibold max-w-xs">
            {error || "Product unavailable."}
          </p>
          <Link to="/shop" className="text-xs font-bold text-[#8B5E3C] flex items-center gap-2">
            <FiArrowLeft /> Return to Shop
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const textOption = product.options?.find(o => o.type === "text");

  return (
    <main className="w-full font-[Manrope] bg-[#FFF8F5]/30 min-h-screen flex flex-col justify-between">
      <Toaster />
      <Header />

      <div className="p-4 md:p-8 mx-auto w-full max-w-7xl py-10 flex-grow">
        <div className="mb-6">
          <Link to="/shop" className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
            <FiArrowLeft size={14} /> Back to Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* IMAGE */}
          <div className="lg:col-span-7">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full rounded-2xl object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl">

            <h1 className="text-xl font-bold">{product.name}</h1>

            <p className="text-xl font-black mt-3">
              Rs {getCalculatedPrice().toLocaleString()}
            </p>

            {/* OPTIONS (DYNAMIC - NO HARD CODING) */}
            {product.options?.map((opt) => {
              if (opt.type === "text") return null;

              return (
                <div key={opt.name} className="mt-5">
                  <p className="text-xs font-bold uppercase text-gray-400 mb-2">
                    {opt.name}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {opt.choices?.map((choice) => (
                      <button
                        key={choice.value}
                        onClick={() =>
                          setSelectedOptions(prev => ({
                            ...prev,
                            [opt.name]: choice.value
                          }))
                        }
                        className={`px-3 py-2 border rounded text-xs font-bold ${
                          selectedOptions[opt.name] === choice.value
                            ? "bg-[#8B5E3C] text-white"
                            : "bg-white"
                        }`}
                      >
                        {choice.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* TEXT OPTION */}
            {textOption && (
              <div className="mt-5">
                <p className="text-xs font-bold uppercase text-gray-400 mb-2">
                  {textOption.name}
                </p>

                <input
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder={textOption.placeholder}
                  className="w-full border p-3 rounded text-sm"
                />
              </div>
            )}

            {validationError && (
              <p className="text-red-500 text-xs mt-3">{validationError}</p>
            )}

            <button
              onClick={handleAddToCartSubmit}
              disabled={cartUpdating}
              className="w-full mt-6 bg-[#8B5E3C] text-white py-3 rounded flex items-center justify-center gap-2"
            >
              <IoBagAddOutline />
              {cartUpdating ? "Adding..." : "Add to Bag"}
            </button>

            <p className="text-xs text-gray-500 mt-5">
              {product.description}
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default ProductDetailPage;