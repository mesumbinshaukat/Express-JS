import { useEffect, useState } from "react";
import { io } from "socket.io-client"; // Import Socket.IO client
import "../App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Connect to the Socket.IO server
    const socket = io("http://localhost:5000");

    // Listen for product data from the server
    socket.on("productData", (data) => {
      setProducts(data);
    });

    // Cleanup: Disconnect the socket when the component unmounts
    return () => {
      socket.disconnect();
      console.log("Disconnected from Socket.IO server");
    };
  }, []);

  return (
    <>
      <h1>Display Product Page</h1>
      <p>Products Quantity: {products.length}</p>

      {products.map((product, index) => (
        <div key={index}>
          <h4>{product.product}</h4>
          <p>{product.price}</p>
        </div>
      ))}
    </>
  );
}

export default App;
