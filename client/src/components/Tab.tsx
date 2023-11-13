import React from "react";

export interface FoodItem {
  _id: string;
  food: {
    name: string;
    price: number;
  };
  quantity: number;
}

export interface Order {
  _id: string;
  table: string;
  items: FoodItem[];
  status: string;
  total: number;
  notes?: string;
}

interface TabProps {
  order: Order;
  onUpdate: (orderId: string, updatedData: Partial<Order>) => void;
  onComplete: (orderId: string) => void;
}

const Tab: React.FC<TabProps> = ({ order, onUpdate, onComplete }) => {
  const handleUpdateClick = () => {
    // Implement logic for updating order details
    onUpdate(order._id, { status: "Updated Status", notes: "Updated Notes" });
  };

  const handleCompleteClick = () => {
    // Implement logic for completing (deleting) the order
    onComplete(order._id);
  };

  return (
    <div className="p-5">
      <div className="rounded-t-3xl p-4 border-x border-t border-slate-300 bg-red-500">
        <div className="flex text-white justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/Table.png"
              className="h-8 invert"
              alt="Table icon"
            />
            <p>{`Table ${order.table}`}</p>
          </div>
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/Hourglass.png"
              className="h-8 invert"
              alt="Hourglass icon"
            />
            <p>{order.status === "Paid" ? "Completed" : order.status}</p>
          </div>
        </div>
      </div>
      <div className="white p-5 border-x border-slate-300">
        <ul>
          {order.items.map((item) => (
            <li
              key={item._id}
              className="flex justify-between items-center mb-2"
            >
              <p>{`${item.quantity} x ${item.food.name}`}</p>
              <p>{`€${(item.quantity * item.food.price).toFixed(2)}`}</p>
            </li>
          ))}
          <li>
            <div className="flex justify-between items-center border-t-2 border-black border-dashed pt-2">
              <p>Totaal</p>
              <p>{`€${order.total.toFixed(2)}`}</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="white rounded-b-3xl p-5 flex justify-end text-white gap-4 border-x border-b border-slate-300">
        <button
          onClick={handleUpdateClick}
          className="red px-5 py-1 rounded-full"
        >
          Edit
        </button>
        <button
          onClick={handleCompleteClick}
          className="red px-5 py-1 rounded-full"
        >
          {order.status === "Paid" ? "Completed" : "Pay"}
        </button>
      </div>
    </div>
  );
};

export default Tab;
