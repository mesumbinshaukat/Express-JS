const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const {fetchProducts} = require('./Controllers/Product_API_Handler')
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow Vite frontend to connect
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))

let products = [];

// GET Products Endpoint
app.get("/api/product", async (req, res) => {
  const products = await fetchProducts();
  res.send(products);
});

// POST Product Endpoint
app.post("/api/product", async (req, res) => {
  const { product_id, product_name, product_price } = req.body;

  const newProduct = {
    product_id,
    product_name,
    product_price,
  };

  try {
    await axios.post(
      "https://670cc21f7e5a228ec1d14719.mockapi.io/api/users/product",
      newProduct
    );

    // Fetch updated products and broadcast to all clients
    const updatedProducts = await fetchProducts();
    io.emit("productData", updatedProducts);

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Failed to add product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Socket.IO Setup
io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);

  // Send initial products to the client
  const products = await fetchProducts();
  socket.emit("productData", products);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
