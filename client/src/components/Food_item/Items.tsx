import { useEffect, useState } from "react";
import Item from "./Item";
import Item_Skeleton from "./Item_Skeleton";
import { useTranslation } from "react-i18next";

interface FoodItem {
  _id: string;
  name: string;
  descriptionShort: string;
  price: number;
  category: string;
  imageURL: string;
  dietaryInfo: string;
}

const Items = () => {
  const [menuTab, setMenuTab] = useState<string>("Breakfast");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]); // Use the FoodItem interface for the state
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/food/feed");
        const data = await res.json();

        if (res.ok) {
          setFoodItems(data as FoodItem[]); // Cast the data to an array of FoodItem
        } else {
          throw new Error(data.error || "Error fetching food items");
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching food items:", error.message);
        } else {
          console.error("Error fetching food items:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMenuTabs = (type: string) => {
    setMenuTab(type);
  };

  const filteredFoodItems = foodItems.filter(
    (item) => item.category === menuTab
  );

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex justify-center items-center mb-20">
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
        <h1 className="text-4xl font-medium uppercase">Menu</h1>
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
      </div>
      <div className="flex items-center justify-center space-x-6">
        <p
          className={
            menuTab === "Breakfast"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Breakfast")}
        >
          {t("breakfast")}
        </p>
        <p
          className={
            menuTab === "Lunch"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Lunch")}
        >
          {t("lunch")}
        </p>
        <p
          className={
            menuTab === "Dinner"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Dinner")}
        >
          {t("dinner")}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {loading ? (
          // Display skeleton component while loading
          Array.from({ length: 3 }).map((_, index) => (
            <Item_Skeleton key={index} />
          ))
        ) : filteredFoodItems.length === 0 ? (
          // Display message when no items are available
          <p>No items available in this category.</p>
        ) : (
          // Display actual item components when data is loaded
          filteredFoodItems.map((item) => (
            <Item
              key={item._id} // Assuming each food item has a unique ID property
              id={item._id}
              image={item.imageURL}
              title={item.name}
              descriptionShort={item.descriptionShort}
              price={item.price}
              foodType={item.category}
              dietaryInfo={item.dietaryInfo}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Items;
