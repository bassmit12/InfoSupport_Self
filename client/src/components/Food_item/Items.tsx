import React, { useEffect, useState } from "react";
import Item from "./Item";
import Item_Skeleton from "./Item_Skeleton";

const Items = () => {
  const [menuTab, setMenuTab] = useState("Breakfast");
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const res = await fetch("/api/food/feed");
        const data = await res.json();

        if (data.error) {
          console.log(data.error);
          setLoading(false);
          return;
        }

        setFoodItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetch function
  }, []); // The empty array ensures that this effect runs once after the initial render

  const handleMenuTabs = (type) => {
    setMenuTab(type);
  };

  const filteredFoodItems = foodItems.filter(
    (item) => item.category === menuTab
  );

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      <div className="flex items-center justify-center space-x-6">
        <p
          className={
            menuTab === "Breakfast"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Breakfast")}
        >
          Breakfast
        </p>
        <p
          className={
            menuTab === "Lunch"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Lunch")}
        >
          Lunch
        </p>
        <p
          className={
            menuTab === "Dinner"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Dinner")}
        >
          Dinner
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
              image={item.imageURL}
              title={item.name}
              description={item.descriptionShort}
              price={item.price}
              foodType={item.category}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Items;
