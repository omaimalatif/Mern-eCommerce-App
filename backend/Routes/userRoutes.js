const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/auth"); // Import the middleware
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // Ensure you ran 'npm install uuid' in your backend directory

// @route   POST /api/users/guest
// @desc    Generate a temporary session token for anonymous guest users
router.post("/guest", (req, res) => {
    try {
        // Create a unique guest string identifier
        const guestId = `guest_${uuidv4()}`;

        // Sign a token with the guest payload (expires in 7 days)
        const token = jwt.sign(
            { id: guestId, isGuest: true },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            token,
            user: { id: guestId, isGuest: true }
        });
    } catch (error) {
        console.error("Guest route creation error:", error.message);
        res.status(500).json({ message: "Failed to generate guest session" });
    }
});

// ==========================================
// PUBLIC ROUTES
// ==========================================

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already registered" });

        user = new User({ name, email, password });
        await user.save();

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Login successful",
            token,
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Adding 'protect' as a second argument secures this route
router.get("/profile", protect, async (req, res) => {
    try {
        // Option A: If the token payload has everything you need, just return req.user
        // res.status(200).json({ user: req.user });

        // Option B: Fetch fresh data from the database using the ID from the token (Recommended)
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;