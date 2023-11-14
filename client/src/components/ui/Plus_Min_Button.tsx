import React from "react";

const Plus_Min_Button = ({ quantity, setQuantity }) => {
  return (
    <>
      <div className="border border-gray-100 rounded-full flex flex-row justify-around h-14 items-center w-36 select-none">
        <button
          className="border rounded-full bg-primary text-white h-9 w-9 text-center text-2xl"
          onClick={() => setQuantity(quantity - 1)}
        >
          -
        </button>
        <h1 className="text-xl">{quantity}</h1>
        <button
          className="border rounded-full bg-primary text-white h-9 w-9 text-center text-2xl"
          onClick={() => setQuantity(quantity + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Plus_Min_Button;
2;
