import React, { useState, useEffect } from "react";
import Item from "./Item";
import Item_Skeleton from "./Item_Skeleton";

const Items = () => {
  const [menuTab, setMenuTab] = useState("Breakfast");
  const [loading, setLoading] = useState(false);
  //const [foods] = useFetch();

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleMenuTabs = (type: any) => {
    setMenuTab(type);
  };

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
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
        <Item
          image="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          title="Borrel Plaat"
          description="A lovely Borrelplaat to share with friends"
          price={9.99}
          foodType="Lunch"
        />
      </div>
    </section>
  );
};

export default Items;
