import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Redirect after submission

function Add_Product() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const product = {
      product_id: productId,
      product_name: productName,
      product_price: productPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Product added successfully!");
        // navigate("/"); // Redirect to the product display page
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default Add_Product;
