const mongoose = require("mongoose");

const optionChoiceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },

    value: {
        type: String,
        required: true
    },

    priceAdjustment: {
        type: Number,
        default: 0
    },

    salePriceAdjustment: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    sku: {
        type: String,
        default: ""
    },

    isAvailable: {
        type: Boolean,
        default: true
    }
}, { _id: false });

const productOptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "text",
            "textarea",
            "dropdown",
            "radio",
            "checkbox",
            "color",
            "size"
        ],
        required: true
    },

    required: {
        type: Boolean,
        default: false
    },

    enableStockTracking: {
        type: Boolean,
        default: false
    },

    placeholder: {
        type: String,
        default: ""
    },

    choices: {
        type: [optionChoiceSchema],
        default: []
    }
}, { _id: false });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },

    shortDescription: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    images: {
        type: [String],
        default: []
    },

    basePrice: {
        type: Number,
        required: true,
        default: 0
    },

    baseSalePrice: {
        type: Number,
        default: 0
    },

    baseOriginalPrice: {
        type: Number,
        default: 0
    },

    stock: {
        type: Number,
        default: 0
    },

    trackStock: {
        type: Boolean,
        default: true
    },

    options: {
        type: [productOptionSchema],
        default: []
    },

    category: {
        type: String,
        default: ""
    },

    tags: {
        type: [String],
        default: []
    },

    brand: {
        type: String,
        default: ""
    },

    sku: {
        type: String,
        default: ""
    },

    weight: {
        type: Number,
        default: 0
    },

    dimensions: {
        length: {
            type: Number,
            default: 0
        },

        width: {
            type: Number,
            default: 0
        },

        height: {
            type: Number,
            default: 0
        }
    },

    isFeatured: {
        type: Boolean,
        default: false
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    status: {
        type: String,
        enum: ["draft", "active", "out_of_stock", "archived"],
        default: "active"
    },

    metaTitle: {
        type: String,
        default: ""
    },

    metaDescription: {
        type: String,
        default: ""
    },

    metaKeywords: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);