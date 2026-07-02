const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    nameSnapshot: String,

    quantity: {
        type: Number,
        required: true
    },

    selectedOptions: {
        type: Object,
        default: {}
    },

    priceSnapshot: {
        basePrice: Number,
        optionAddons: Number,
        finalPrice: Number
    }
}, { _id: false });

const shippingSchema = new mongoose.Schema({
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    country: {
        type: String,
        default: "Pakistan"
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [orderItemSchema],

    shippingInfo: shippingSchema,

    paymentMethod: {
        type: String,
        enum: ["COD", "CARD", "ESEWA", "BANK"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    orderStatus: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },

    itemsPrice: {
        type: Number,
        default: 0
    },

    shippingPrice: {
        type: Number,
        default: 0
    },

    totalPrice: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);