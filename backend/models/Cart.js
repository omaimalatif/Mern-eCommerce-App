const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    // JSON of selected options (VERY IMPORTANT)
    selectedOptions: {
        type: Object,
        default: {}
    },

    // snapshot so product changes don’t affect cart
    priceSnapshot: {
        basePrice: Number,
        optionAddons: {
            type: Number,
            default: 0
        },
        finalPrice: Number
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: String, // Changed from ObjectId to String to support temporary anonymous guest IDs
        required: true,
        unique: true,
        ref: "User" // Keeps populate capabilities intact for registered account documents
    },

    items: [cartItemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Cart", cartSchema);