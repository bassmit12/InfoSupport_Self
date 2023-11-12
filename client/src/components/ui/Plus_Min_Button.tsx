import React, { useState } from "react";

const Plus_Min_Button = ({ quantity, setQuantity }) => {
  return (
    <>
      <div className="border border-gray-100 rounded-full flex flex-row justify-around h-9 items-center w-24 select-none">
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() => setQuantity(4)}
        >
          -
        </button>
        <h1>{quantity}</h1>
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() => setQuantity(2)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Plus_Min_Button;
