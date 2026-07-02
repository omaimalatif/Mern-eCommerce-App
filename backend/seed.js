require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const products = require("./data/products");

const importData = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        console.log("Deleting old products...");
        await Product.deleteMany();

        console.log("Inserting new products...");
        await Product.insertMany(products);

        console.log("✅ Products imported successfully!");

        process.exit();
    } catch (error) {
        console.error("❌ Error importing products:");
        console.error(error);

        process.exit(1);
    }
};

importData();