const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Helper to reliably extract the identity string from req.user
const getUserId = (user) => user.id || user._id;

// Compare selectedOptions objects safely
const optionsMatch = (a = {}, b = {}) => {
    return JSON.stringify(a) === JSON.stringify(b);
};

// @route   POST /api/cart/add
// @desc    Add item to guest or user cart
router.post("/add", protect, async (req, res) => {
    try {
        const { productId, quantity = 1, selectedOptions = {} } = req.body;

        const userId = getUserId(req.user);

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let optionAddons = 0;

        const finalBasePrice =
            product.baseSalePrice || product.basePrice;

        const cartItem = {
            product: productId,
            quantity: Number(quantity),
            selectedOptions,
            priceSnapshot: {
                basePrice: finalBasePrice,
                optionAddons,
                finalPrice: finalBasePrice + optionAddons
            }
        };

        let cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        const existingItem = cart.items.find(
            (i) =>
                i.product.toString() === productId &&
                optionsMatch(
                    i.selectedOptions,
                    selectedOptions
                )
        );

        if (existingItem) {
            existingItem.quantity += Number(quantity);
        } else {
            cart.items.push(cartItem);
        }

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.json(updatedCart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// @route   GET /api/cart
// @desc    Get active cart items
router.get("/", protect, async (req, res) => {
    try {
        const userId = getUserId(req.user);

        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.json(
            cart || {
                user: userId,
                items: []
            }
        );

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// @route   PUT /api/cart/update
// @desc    Update item quantity
router.put("/update", protect, async (req, res) => {
    try {
        const {
            productId,
            quantity,
            selectedOptions = {}
        } = req.body;

        const userId = getUserId(req.user);

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            (i) =>
                i.product.toString() === productId &&
                optionsMatch(
                    i.selectedOptions,
                    selectedOptions
                )
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        item.quantity = Number(quantity);

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.json(updatedCart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// @route   DELETE /api/cart/remove
// @desc    Remove individual item from cart
router.delete("/remove", protect, async (req, res) => {
    try {
        const {
            productId,
            selectedOptions = {}
        } = req.body;

        const userId = getUserId(req.user);

        const cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                !(
                    item.product.toString() === productId &&
                    optionsMatch(
                        item.selectedOptions,
                        selectedOptions
                    )
                )
        );

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.json(updatedCart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// @route   DELETE /api/cart/clear
// @desc    Clear entire cart item list array
router.delete("/clear", protect, async (req, res) => {
    try {
        const userId = getUserId(req.user);

        await Cart.findOneAndUpdate(
            { user: userId },
            { items: [] }
        );

        res.json({
            message: "Cart cleared"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// @route   POST /api/cart/merge
// @desc    Merge local guest items into account cart upon sign-in
router.post("/merge", protect, async (req, res) => {
    try {
        const { guestItems } = req.body;

        const userId = getUserId(req.user);

        if (
            !guestItems ||
            !Array.isArray(guestItems)
        ) {
            return res.status(400).json({
                message:
                    "Invalid guest items payload structure"
            });
        }

        let cart = await Cart.findOne({
            user: userId
        });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        for (let gItem of guestItems) {

            const product = await Product.findById(
                gItem.productId
            );

            if (!product) continue;

            const existingItem = cart.items.find(
                (i) =>
                    i.product.toString() ===
                        gItem.productId &&
                    optionsMatch(
                        i.selectedOptions,
                        gItem.selectedOptions || {}
                    )
            );

            const basePrice =
                product.baseSalePrice ||
                product.basePrice;

            const newItem = {
                product: gItem.productId,
                quantity: Number(gItem.quantity),
                selectedOptions:
                    gItem.selectedOptions || {},
                priceSnapshot: {
                    basePrice,
                    optionAddons: 0,
                    finalPrice: basePrice
                }
            };

            if (existingItem) {
                existingItem.quantity += Number(
                    gItem.quantity
                );
            } else {
                cart.items.push(newItem);
            }
        }

        await cart.save();

        const updatedCart = await Cart.findOne({
            user: userId
        }).populate("items.product");

        res.json(updatedCart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;