import { useState, useEffect } from "react";
import Transaction from "../../components/Transaction";
import Header from "../../components/ui/Header";
import useCustomToast from "../../hooks/useToast";
import LoadingSpinner from "../../hooks/useLoadingSpinner";
import { useTranslation } from "react-i18next";
import { CartItem } from "../../types/types";
import {
  fetchCartData,
  placeOrder,
  removeItem,
  updateQuantity,
} from "../../utils/api";

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

      // Use the new placeOrder request
      const response = await placeOrder();

      if (response.code === "success") {
        // Clear the local cart items on successful conversion
        setCartItems([]);
        showSuccessToast("Order placed successfully!");
        console.log("Order successfully placed!");
      } else {
        showErrorToast("Something went wrong while placing your order");
        console.error("Error placing order:", response.error?.message);
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
      // Use the new updateQuantity request
      const response = await updateQuantity({ foodId, quantity: newQuantity });

      if (response.code === "success") {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.food._id === foodId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        console.error("Error updating quantity:", response.error?.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const onRemoveItem = async (foodId: string) => {
    try {
      // Use the new removeItem request
      const response = await removeItem({ foodId });

      if (response.code === "success") {
        // Update the local state by filtering out the removed item
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.food._id !== foodId)
        );
      } else {
        // Handle error response from the API
        console.error("Error removing item:", response.error?.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data from the backend API endpoint
    const fetchCartDataCall = async () => {
      try {
        const response = await fetchCartData();

        if (response.code === "success") {
          const data = response.data;
          setCartItems(data.items || []); // Handle null or undefined items
        } else {
          // Handle error response from the API
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    // Call the fetchCartData function
    fetchCartDataCall();
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
      <section className="my-20 max-w-screen-lg mx-auto px-6">
        {/* Updated component import */}
        {cartItems.map((item) => (
          <Transaction
            key={item.food._id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}

        <div className="flex flex-col  my-8">
          <h2 className="text-gray-900 poppins text-4xl font-medium mb-4 mx-auto">
            Total: $
            {cartItems
              .reduce(
                (total, item) => total + item.food.price * item.quantity,
                0
              )
              .toFixed(2)}
          </h2>
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
        </div>
      </section>
    </>
  );
};

export default TransactionPage;
