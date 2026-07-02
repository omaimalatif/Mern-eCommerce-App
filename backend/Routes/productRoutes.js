const express = require("express");
const Product = require("../models/Product");
const { protect } = require("../middleware/auth");

const router = express.Router();

// ==========================================
// ADMIN MIDDLEWARE
// ==========================================

const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only."
        });
    }

    next();
};

// ==========================================
// PUBLIC ROUTES
// ==========================================

// GET ALL PRODUCTS
// SEARCH + SORT + PAGINATION + FILTERING

router.get("/", async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = "",
            category,
            brand,
            minPrice,
            maxPrice,
            featured,
            status,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const query = {};

        // SEARCH
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } }
            ];
        }

        // FILTERS
        if (category) query.category = category;
        if (brand) query.brand = brand;

        if (featured !== undefined) {
            query.isFeatured = featured === "true";
        }

        if (status) {
            query.status = status;
        }

        // PRICE FILTER
        if (minPrice || maxPrice) {
            query.basePrice = {};

            if (minPrice) query.basePrice.$gte = Number(minPrice);
            if (maxPrice) query.basePrice.$lte = Number(maxPrice);
        }

        // SORTING
        const sortOptions = {};
        sortOptions[sortBy] = order === "asc" ? 1 : -1;

        // PAGINATION
        const currentPage = Number(page);
        const pageLimit = Number(limit);
        const skip = (currentPage - 1) * pageLimit;

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(pageLimit);

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            products,
            pagination: {
                totalProducts,
                currentPage,
                totalPages: Math.ceil(totalProducts / pageLimit),
                limit: pageLimit
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// GET SINGLE PRODUCT

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ==========================================
// ADMIN ROUTES
// ==========================================

// CREATE PRODUCT

router.post("/", protect, adminOnly, async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.status(201).json({
            message: "Product created successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE PRODUCT

router.put("/:id", protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE PRODUCT

router.delete("/:id", protect, adminOnly, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;