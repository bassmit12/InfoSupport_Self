import React from "react";

interface PlusMinButtonProps {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
}

const Plus_Min_Button: React.FC<PlusMinButtonProps> = ({
  quantity,
  setQuantity,
}) => {
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="border border-gray-100 rounded-full flex flex-row justify-around h-14 items-center w-36 select-none">
        <button
          className="border rounded-full bg-primary text-white h-9 w-9 text-center text-2xl"
          onClick={handleDecrease}
        >
          -
        </button>
        <h1 className="text-xl">{quantity}</h1>
        <button
          className="border rounded-full bg-primary text-white h-9 w-9 text-center text-2xl"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Plus_Min_Button;
