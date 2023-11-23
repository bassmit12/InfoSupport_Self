import { useState, useEffect } from "react";
import Transaction from "../../components/Transaction";
import Header from "../../components/ui/Header";
import useCustomToast from "../../hooks/useToast";
import LoadingSpinner from "../../hooks/useLoadingSpinner";
import { useTranslation } from "react-i18next";

import { CartItem } from "../../types/types";

const TransactionPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleOrderNow = async () => {
    try {
      if (cartItems.length === 0) {
        console.log("Cannot place an order with an empty cart");
        return;
      }
      setLoading(true);
      const response = await fetch("/api/cart/convert-to-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Clear the local cart items on successful conversion
        setCartItems([]);
        showSuccessToast("Order placed successfully!");
        console.log("Order successfully placed!");
      } else {
        showErrorToast("Something went wrong while placing your order");
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      showErrorToast("Something went wrong while placing your order");
      console.error("Error placing order:", error);
    } finally {
      // Reset loading to false after the API call is completed
      setLoading(false);
    }
  };

  const onUpdateQuantity = async (foodId: string, newQuantity: number) => {
    try {
      const response = await fetch("/api/cart/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId,
          quantity: newQuantity,
        }),
      });

      console.log(foodId, newQuantity);

      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.food._id === foodId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error("Error updating quantity:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const onRemoveItem = async (foodId: string) => {
    try {
      // Make a DELETE request to remove the item
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId,
        }),
      });

      if (response.ok) {
        // Update the local state by filtering out the removed item
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.food._id !== foodId)
        );
      } else {
        // Handle error response from the API
        console.error("Error removing item:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing item:", error);
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
        <h1 className="text-4xl font-medium uppercase">
          {t("common:translation:order")}
        </h1>
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
      </div>
      <section className="my-20 max-w-screen-xl mx-auto px-6">
        {cartItems.map((item) => (
          <Transaction
            key={item.food._id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}

        <div className="flex flex-row justify-between items-center">
          <button
            className="bg-primary text-white px-9 py-3 text-xl focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105"
            onClick={handleOrderNow}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner size={20} color="#ffffff" />
            ) : (
              t("common:translation:orderNow")
            )}
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
