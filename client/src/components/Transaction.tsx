// Transaction.jsx
import React from "react";
import Plus_Min_Button from "./ui/Plus_Min_Button";

const Transaction = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { food, quantity } = item;
  const { name, price, imageURL } = food;

  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <img src={imageURL} className="col-span-1 h-40 w-40 mx-auto" alt={name} />
      <h1 className="col-span-1 text-3xl text-center">{name}</h1>
      <div className="col-span-1 flex justify-center items-center">
        <Plus_Min_Button
          quantity={quantity}
          setQuantity={(newQuantity) => onUpdateQuantity(food._id, newQuantity)}
        />
      </div>

      <h2 className="col-span-1 text-gray-900 poppins text-3xl font-semibold text-center">
        ${(food.price * quantity).toFixed(2)}
      </h2>

      <button
        className="col-span-1 text-3xl font-semibold transform transition duration-300 hover:scale-105 text-center"
        onClick={() => onRemoveItem(food._id)}
      >
        X
      </button>

      <hr className="col-span-5 h-px bg-[#F3F4F6] border-0 my-8"></hr>
    </div>
  );
};

export default Transaction;
