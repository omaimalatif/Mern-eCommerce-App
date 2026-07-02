import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
    // Falls back seamlessly if product is temporarily resolving
    if (!product) return null;

    const rawPrice = product.baseSalePrice || product.basePrice;
    // Formats into cleaner localized thousands presentation layouts
    const formattedPrice = (rawPrice).toLocaleString('en-PK', { maximumFractionDigits: 2 });

    return (
        <div className="flex flex-col bg-white w-full max-w-[280px] group">
            {/* Zoomed Image Container with click routing link */}
            <Link 
                to={`/product/${product._id}`} 
                className="w-full aspect-square bg-[#F3F4F6] rounded-lg overflow-hidden block"
            >
                <img
                    src={product.images?.[0] || "https://images.unsplash.com/photo-1542291026-7eec264c27ff"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </Link>

            {/* Product Details */}
            <div className="mt-4 flex flex-col gap-1">
                <Link to={`/product/${product._id}`} className="hover:underline block">
                    <h3 className="text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-[#8B5E3C] transition-colors">
                        {product.name}
                    </h3>
                </Link>
                
                {product.shortDescription && (
                    <p className="text-sm text-gray-500 line-clamp-1">
                        {product.shortDescription}
                    </p>
                )}
                
                <span className="text-sm font-semibold text-gray-900 mt-1">
                    PKR {formattedPrice}
                </span>
            </div>
        </div>
    );
};

export default ProductCard;