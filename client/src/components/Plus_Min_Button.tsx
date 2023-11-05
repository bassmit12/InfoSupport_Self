import React from "react";

interface PlusMinButtonProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const Plus_Min_Button: React.FC<PlusMinButtonProps> = ({
  quantity,
  setQuantity,
}) => {
  return (
    <>
      <div className="border border-gray-100 rounded-full flex flex-row justify-around ml-5 h-9 items-center w-24">
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() =>
            setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))
          }
        >
          -
        </button>
        <h1>{quantity}</h1>
        <button
          className="border rounded-full bg-primary text-white h-6 w-6 text-center"
          onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Plus_Min_Button;
