import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Plus_Min_Button from "../../components/Plus_Min_Button";
import Header from "../../components/Header";

// Define the interface for the food item structure
interface FoodItem {
  _id: string;
  name: string;
  descriptionLong: string;
  descriptionShort: string;
  price: number;
  category: string;
  imageURL: string;
  ingredients?: string[];
  dietaryInfo?: string;
}

const ItemDetails = () => {
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

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
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!foodItem) {
    return <div>Food item not found.</div>;
  }

  // Replace the static content with dynamic data from `foodItem`
  return (
    <>
      <Header />
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-12">
            <div className="flex-col flex-1">
              <h1 className="text-5xl mb-9 font-semibold">{foodItem.name}</h1>
              <p className="text-xl font-light">{foodItem.descriptionLong}</p>
              <div className="mt-10 flex flex-row ">
                <h2 className="text-gray-900 poppins text-2xl font-semibold">
                  ${foodItem.price.toFixed(2)}
                </h2>
                <Plus_Min_Button />
              </div>
              <Link to="/TransactionPage">
                <button className="bg-primary text-white px-8 py-3 focus:outline-none poppins rounded-full mt-8 transform transition duration-300 hover:scale-105 flex flex-row">
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
              </Link>
            </div>
            <div className="w-full h-auto justify-center my-auto">
              <img src={foodItem.imageURL} alt={foodItem.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetails;
