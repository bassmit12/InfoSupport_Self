import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Plus_Min_Button from "../../components/ui/Plus_Min_Button";
import Header from "../../components/ui/Header";
import ItemDetails_Skeleton from "../../components/Skeletons/ItemDetails_Skeleton";

import { FoodItem } from "../../types/types";

const ItemDetails = () => {
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState<string>("");
  useEffect(() => {
    const fetchFoodInfo = async () => {
      try {
        const response = await fetch(`/api/food/item/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: FoodItem = await response.json();
        setFoodItem(data);
        setLoading(false);
      } catch (e) {
        // Check if the error is an instance of Error and use its 'message' property
        if (e instanceof Error) {
          setError(e.message);
        } else {
          // If it's not an Error instance or doesn't have a message property, use a generic message
          setError("An error occurred");
        }
        setLoading(false);
      }
    };

    fetchFoodInfo();
  }, [id]);

  useEffect(() => {
    if (foodItem) {
      setTotalPrice(quantity * foodItem.price);
    }
  }, [quantity, foodItem]);

  if (error) {
    return (
      <>
        <Header />
        <div>Error: {error}</div>
      </>
    );
  }

  if (loading || !foodItem) {
    return (
      <>
        <Header />
        <ItemDetails_Skeleton />
      </>
    );
  }

  const handleOrderNow = async () => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId: foodItem?._id,
          quantity: quantity,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Optionally handle successful addition to the cart (e.g., show a success message)
    } catch (error) {
      // Handle the error (e.g., show an error message)
      console.error("Error adding item to cart:", error);
    }
  };

  // Replace the static content with dynamic data from `foodItem`
  return (
    <>
      <Header />
      <section className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col justify-center items-center h-screen">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
            key={foodItem._id}
          >
            <div className="order-2 md:order-1 lg:order-1 flex flex-col justify-center">
              <h1 className="text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none">
                {foodItem.name}
              </h1>
              <div className="flex justify-center md:justify-normal lg:justify-normal">
                {foodItem.dietaryInfo && ( // This line checks if dietaryInfo is not an empty string
                  <span className="bg-green-100 border border-[#18BD63] rounded-full text-[#18BD63] text-sm poppins px-4 py-1 inline-block mb-4 text-center md:text-left lg:text-left">
                    {foodItem.dietaryInfo}
                  </span>
                )}
              </div>

              <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none">
                {foodItem.descriptionLong}
              </p>
              {foodItem.ingredients && foodItem.ingredients.length > 0 && (
                <p className="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none mt-5">
                  <strong className="leading-relaxed select-none">
                    Ingredients:{" "}
                  </strong>
                  {foodItem.ingredients.join(", ")}
                </p>
              )}
              {showNotes && (
                <textarea
                  id="message"
                  rows={4}
                  className="block p-2.5 mt-6 w-full text-sm poppins text-gray-500 leading-relaxed  rounded-lg border border-gray-300 outline-none"
                  placeholder="Add info for the kitchen"
                  value={notes} // Set the value of the textarea to the 'notes' state
                  onChange={(e) => setNotes(e.target.value)} // Update the 'notes' state on change
                ></textarea>
              )}
              <div className="flex ml-10 md:ml-0 lg:ml-0 items-center justify-center md:justify-start lg:justify-start space-x-6 pt-8">
                <h2 className="text-3xl font-medium text-black poppins select-none">
                  ${totalPrice?.toFixed(2)}
                </h2>
                <Plus_Min_Button
                  quantity={quantity}
                  setQuantity={setQuantity}
                />

                <button
                  onClick={() => setShowNotes(!showNotes)}
                  className="bg-primary text-white px-5 py-3 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 text-center"
                >
                  <h1>Add Notes</h1>
                </button>
              </div>

              <Link to="/Cart">
                <div className="mt-8 flex items-center justify-center md:justify-start lg:justify-start gap-x-4">
                  <button
                    className="bg-primary text-white px-8 py-3 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105 flex flex-row"
                    onClick={handleOrderNow}
                  >
                    <div className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        fill="#ffffff"
                      >
                        <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                      </svg>
                    </div>
                    <h1>Order now</h1>
                  </button>
                </div>
              </Link>
            </div>
            <div className="order-1 md:order-2 lg:order-2">
              <img
                src={foodItem.imageURL}
                alt={foodItem.name}
                className="w-3/4 md:w-3/4 lg:w-full mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetails;
