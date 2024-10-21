const axios = require("axios");

// METHOD: GET
// URL: http://localhost:5000/api/product

// Helper function to fetch products from external API
async function fetchProducts() {
  try {
    const response = await axios.get(
      "https://670cc21f7e5a228ec1d14719.mockapi.io/api/users/product"
    );
    products = response.data;
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

module.exports = {fetchProducts}