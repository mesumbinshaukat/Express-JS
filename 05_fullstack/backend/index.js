const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv").config();
const cors = require("cors"); // Allow cross-origin requests
const axios = require("axios");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow Vite frontend to connect
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Handle CORS for the frontend

// Mock Products Data
let products = [
  { id: "1", product: "TV", price: "20000" },
  { id: "2", product: "Mobile", price: "10000" },
  { id: "3", product: "Laptop", price: "30000" },
];

// GET Products Endpoint
app.get("/api/product", (req, res) => {
  res.send(products);
});

// POST Endpoint to Add a New Product
app.post("/api/product", (req, res) => {
  const { product_id, product_name, product_price } = req.body;

  const newProduct = {
    product_id: product_id,
    product_name: product_name,
    product_price: product_price,
    product_description: "",
    product_category: "",
    product_image: "",
  };

  axios.post("https://670cc21f7e5a228ec1d14719.mockapi.io/api/users/product", newProduct)
  .then((response) => {
    console.log(response.data);  })
  .catch((error) => {
    console.error(error);
  })

  // Add the new product to the list
  products.push(newProduct);

  // Broadcast the new product to all connected clients
  io.emit("productData", products);

  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// Handle Socket.IO Connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send initial products when a client connects
  socket.emit("productData", products);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
