import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";


function Display_Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch initial products via Axios
    const fetchInitialProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchInitialProducts();

    // Connect to the Socket.IO server
    const socket = io(import.meta.env.VITE_SOCKET_IO_CONNECTION);

    // Listen for real-time product updates
    socket.on("productData", (data) => {
      console.log("Received product data:", data);
      setProducts(data);
    });

    // Cleanup: Disconnect from the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log("Disconnected from Socket.IO server");
    };
  }, []);

  return (
    <>
      <h1>Display Product Page</h1>
      <p>Products Quantity: {products.length}</p>

      <table border="1">
        <thead>
          <tr>
            <th>#</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.product_id}</td>
              <td>{product.product_name}</td>
              <td>{product.product_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Display_Products;
