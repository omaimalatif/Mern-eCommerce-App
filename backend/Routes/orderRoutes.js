const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

const router = express.Router();

// new order
router.post("/checkout", protect, async (req, res) => {
    try {
        const { shippingInfo, paymentMethod = "COD" } = req.body;

        const cart = await Cart.findOne({ user: req.user.id })
            .populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let itemsPrice = 0;

        const orderItems = cart.items.map(item => {
            const finalPrice = item.priceSnapshot.finalPrice * item.quantity;
            itemsPrice += finalPrice;

            return {
                product: item.product._id,
                nameSnapshot: item.product.name,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions,
                priceSnapshot: item.priceSnapshot
            };
        });

        const shippingPrice = itemsPrice > 5000 ? 0 : 200;
        const totalPrice = itemsPrice + shippingPrice;

        const order = new Order({
            user: req.user.id,
            items: orderItems,
            shippingInfo,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        });

        await order.save();

        // Clear cart after order
        cart.items = [];
        await cart.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//get user orders
router.get("/my-orders", protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//single order details
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//admin - get all orders
router.get("/admin/all", protect, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//admin - update order status
router.put("/:id/status", protect, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const { orderStatus, paymentStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (orderStatus) order.orderStatus = orderStatus;
        if (paymentStatus) order.paymentStatus = paymentStatus;

        await order.save();

        res.json(order);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
