import { useEffect, useState } from "react";
import Item from "./Item";
import Item_Skeleton from "./Item_Skeleton";
import { useTranslation } from "react-i18next";
import { fetchFoodItems } from "../../utils/api";
import { FoodItem } from "../../types/types";
import IngredientFilter from "./IngredientFilter";

const Items = () => {
  const [menuTab, setMenuTab] = useState<string>("Breakfast");
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [allIngredients, setAllIngredients] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFoodItems();

        if (response.code === "success") {
          setFoodItems(response.data);

          // Extract all unique ingredients from the fetched data and sort them alphabetically
          const uniqueIngredients = Array.from(
            new Set(response.data.flatMap((item) => item.ingredients))
          ).sort();
          setAllIngredients(uniqueIngredients);
        } else {
          throw new Error("Error fetching food items");
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

  const handleIngredientSelection = (ingredient: string) => {
    setSelectedIngredients((prevIngredients) => {
      if (prevIngredients.includes(ingredient)) {
        // If ingredient is already selected, remove it from the list
        return prevIngredients.filter((item) => item !== ingredient);
      } else {
        // If ingredient is not selected, add it to the list
        return [...prevIngredients, ingredient];
      }
    });
  };

  const filteredFoodItems = foodItems.filter((item) => {
    return (
      item.category === menuTab &&
      (selectedIngredients.length === 0 ||
        selectedIngredients.every(
          (ingredient) => !item.ingredients.includes(ingredient)
        ))
    );
  });

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex justify-center items-center mb-20">
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
        <h1 className="text-4xl font-medium uppercase">Menu</h1>
        <hr className="w-28 h-1 bg-primary border-0 rounded mx-4"></hr>
      </div>
      <div className="flex items-center justify-center space-x-6 mr-6">
        <p
          className={
            menuTab === "Breakfast"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Breakfast")}
        >
          {t("common:translation:Breakfast")}
        </p>
        <p
          className={
            menuTab === "Lunch"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Lunch")}
        >
          {t("common:translation:Lunch")}
        </p>
        <p
          className={
            menuTab === "Dinner"
              ? "active_menu_tab poppins bg-primary px-10"
              : "menu_tab poppins border px-10 border-gray-100 rounded-full py-2"
          }
          onClick={() => handleMenuTabs("Dinner")}
        >
          {t("common:translation:Dinner")}
        </p>

        <IngredientFilter
          allIngredients={allIngredients} // Add the closing curly brace here
          selectedIngredients={selectedIngredients}
          onSelectIngredient={handleIngredientSelection}
        />
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
              price={item.price}
              dietaryInfo={item.dietaryInfo}
              category={item.category}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Items;
