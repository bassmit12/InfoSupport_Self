import React, { useState, useEffect } from "react";
import Transaction from "../../components/Transaction";
import Header from "../../components/ui/Header";

const TransactionPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to update cart item quantity
  const updateCartItem = async (foodId, quantity) => {
    try {
      const response = await fetch("/api/cart/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId: foodId,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []); // Handle null or undefined items
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  // Function to remove cart item
  // Function to remove cart item
  const removeCartItem = async (foodId) => {
    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId: foodId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.items || []); // Handle null or undefined items
      } else {
        // Handle error response from the API
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data from the backend API endpoint
    const fetchCartData = async () => {
      try {
        const response = await fetch("/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items || []); // Handle null or undefined items
        } else {
          // Handle error response from the API
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    // Call the fetchCartData function
    fetchCartData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <>
      <Header />
      <div className="flex justify-center items-center my-10">
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
        <h1 className="text-4xl font-medium uppercase">Order</h1>
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
      </div>
      <section className="my-20 max-w-screen-xl mx-auto px-6">
        {cartItems.map((item) => (
          <Transaction
            key={item.food._id}
            item={item}
            onUpdateQuantity={updateCartItem}
            onRemoveItem={removeCartItem}
          />
        ))}

        <div className="flex flex-row justify-between items-center">
          <button className="bg-primary text-white px-9 py-3 text-xl focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105">
            Order Now
          </button>
          <h2 className="text-gray-900 poppins text-4xl font-medium">
            Total: $
            {cartItems
              .reduce(
                (total, item) => total + item.food.price * item.quantity,
                0
              )
              .toFixed(2)}
          </h2>
        </div>
      </section>
    </>
  );
};

export default TransactionPage;
