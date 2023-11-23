// Transaction.jsx
import Plus_Min_Button from "./ui/Plus_Min_Button";
import { useTranslation } from "react-i18next";
import { OrderItem } from "../types/types";

interface TransactionProps {
  item: OrderItem; // Updated to use OrderItem type
  onUpdateQuantity: (foodId: string, newQuantity: number) => void;
  onRemoveItem: (foodId: string) => void;
}

const Transaction: React.FC<TransactionProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const { food, quantity } = item;
  const { name, imageURL } = food;
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
      <img src={imageURL} className="col-span-1 h-auto w-full " alt={name} />
      <h1 className="col-span-1 text-3xl text-center hidden md:hidden lg:inline">
        {t(`menu:${name.replace(/\s/g, "_")}.name`)}
      </h1>
      <div className="col-span-1 flex justify-center items-center ">
        <Plus_Min_Button
          quantity={quantity}
          setQuantity={(newQuantity) => onUpdateQuantity(food._id, newQuantity)}
        />
      </div>

      <h2 className="col-span-1 text-gray-900 poppins text-3xl font-medium text-center hidden md:inline lg:inline">
        ${(food.price * quantity).toFixed(2)}
      </h2>

      <button
        className="col-span-1 text-3xl font-medium transform transition duration-300 hover:scale-105 text-center"
        onClick={() => onRemoveItem(food._id)}
      >
        X
      </button>

      <hr className="col-span-5 h-px bg-[#F3F4F6] border-0 my-8"></hr>
    </div>
  );
};

export default Transaction;
