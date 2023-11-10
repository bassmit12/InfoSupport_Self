import React from "react";
import Plus_Min_Button from "./ui/Plus_Min_Button";

const Transaction = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { food, quantity } = item;
  const { name, price, imageURL } = food;

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <img src={imageURL} className="h-40 w-40" alt={name} />
        <h1 className="text-3xl">{name}</h1>
        <div className="transform scale-150">
          <Plus_Min_Button
            quantity={quantity}
            setQuantity={(newQuantity) =>
              onUpdateQuantity(food._id, newQuantity)
            }
          />
        </div>

        <h2 className="text-gray-900 poppins text-3xl font-semibold">
          ${(food.price * quantity).toFixed(2)}
        </h2>

        <button
          className="text-3xl font-semibold transform transition duration-300 hover:scale-105"
          onClick={() => onRemoveItem(food._id)}
        >
          X
        </button>
      </div>
      <hr className="h-px bg-[#F3F4F6] border-0 my-8"></hr>
    </div>
  );
};

export default Transaction;
