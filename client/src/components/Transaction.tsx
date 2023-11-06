import React, { useState, useEffect } from "react";
import Plus_Min_Button from "./ui/Plus_Min_Button";

const Transaction = () => {
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const pricePerItem = 9.99; // This should ideally come from props or state
  const [totalPrice, setTotalPrice] = useState(pricePerItem);

  useEffect(() => {
    // Update the total price whenever the quantity changes
    setTotalPrice(quantity * pricePerItem);
  }, [quantity]);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <img
          src="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          className="h-40 w-40"
          alt="Borrel Plaat"
        />
        <h1 className="text-3xl">Borrel Plaat</h1>
        <div className="transform scale-150">
          <Plus_Min_Button quantity={quantity} setQuantity={setQuantity} />
        </div>

        <h2 className="text-gray-900 poppins text-3xl font-semibold">
          ${totalPrice.toFixed(2)}
        </h2>
        <button className="text-3xl font-semibold transform transition duration-300 hover:scale-105">
          X
        </button>
      </div>
      <hr className="h-px bg-[#F3F4F6] border-0 my-8"></hr>
    </div>
  );
};

export default Transaction;
