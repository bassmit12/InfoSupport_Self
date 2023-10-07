import React from "react";
import Plus_Min_Button from "./Plus_Min_Button";

const Transaction = () => {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <img
          src="https://joflow.nl/cdn/shop/products/Voorfoto_3bc2c4c8-01a8-4565-98f9-dadbbbea9e41_1200x1200.jpg?v=1657801731"
          className="h-40 w-40"
        />
        <h1 className="text-3xl">Borrel Plaat</h1>
        <div className="transform scale-150">
          <Plus_Min_Button />
        </div>

        <h2 className="text-gray-900 poppins text-3xl font-semibold">$9.99</h2>
        <button className="text-3xl font-semibold transform transition duration-300 hover:scale-105">
          X
        </button>
      </div>
      <hr className="h-px bg-[#F3F4F6] border-0  my-8"></hr>
    </div>
  );
};

export default Transaction;
