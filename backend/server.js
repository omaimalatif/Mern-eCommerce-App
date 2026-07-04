const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environment Variables
dotenv.config();

// Configuration Imports
const client = require("./config/db");

// Route File Imports
const userRoutes = require("./Routes/userRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   MIDDLEWARE (MUST BE TOP)
========================= */

// JSON middleware parsing capabilities FIRST
app.use(express.json());

// CORS configuration applied before mapping app routes
app.use(cors({
    origin: [
        "http://localhost:5174",
        "http://localhost:5173",
        "https://magnificent-brioche-a0a986.netlify.app",
        "https://sf-mern.adork.net"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

/* =========================
   TEST ROUTE
========================= */

app.get("/api", (req, res) => {
    res.send("API is working 🚀");
});

/* =========================
   ROUTES
========================= */

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

/* =========================
   DB + SERVER START
========================= */

async function startServer() {
  try {
    console.log("Connecting to MongoDB...");

    await client();

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("FULL DATABASE CONNECTION ERROR LOGS:");
    console.error(error);
  }
}

startServer();
