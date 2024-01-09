// NewTransaction.jsx
import React from "react";
import Plus_Min_Button from "./ui/Plus_Min_Button";
import { useTranslation } from "react-i18next";
import { OrderItem } from "../types/types";

interface NewTransactionProps {
  item: OrderItem;
  onUpdateQuantity: (foodId: string, newQuantity: number) => void;
  onRemoveItem: (foodId: string) => void;
}

const NewTransaction: React.FC<NewTransactionProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const { food, quantity } = item;
  const { name, imageURL, category } = food;
  const { t } = useTranslation();

  return (
    <div className="flex items-center border-b border-red-500 p-4">
      <img src={imageURL} className="h-24 w-24 rounded" alt={name} />
      <div className="flex-grow ml-4">
        <h1 className="text-lg font-bold mb-2">
          {t(`menu:${category}.${name.replace(/\s/g, "_")}.name`)}
        </h1>
        <div className="flex items-center">
          <Plus_Min_Button
            quantity={quantity}
            setQuantity={(newQuantity) =>
              onUpdateQuantity(food._id, newQuantity)
            }
          />
        </div>
      </div>
      <span className="text-black ml-2">
        ${(food.price * quantity).toFixed(2)}
      </span>
      <button
        className="text-xl font-medium text-red-500 ml-4"
        onClick={() => onRemoveItem(food._id)}
      >
        X
      </button>
    </div>
  );
};

export default NewTransaction;
