import { useState } from "react";
import { Order } from "../../types/types";

function KitchenTab({
  order,
  onComplete,
}: {
  order: Order;
  onComplete: (orderId: string) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<Array<string>>(
    new Array(order.items.length).fill("red")
  );

  const handleCompleteClick = () => {
    // Implement logic for completing (deleting) the order
    onComplete(order._id);
  };

  const handleItemClick = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems[index] === "red") {
      updatedSelectedItems[index] = "yellow";
    } else if (updatedSelectedItems[index] === "yellow") {
      updatedSelectedItems[index] = "green";
    }
    setSelectedItems(updatedSelectedItems);
  };

  const handleItemClickReverse = (index: number) => {
    const updatedSelectedItems = [...selectedItems];
    if (updatedSelectedItems[index] === "green") {
      updatedSelectedItems[index] = "yellow";
    } else if (updatedSelectedItems[index] === "yellow") {
      updatedSelectedItems[index] = "red";
    }
    setSelectedItems(updatedSelectedItems);
  };

  const headerColor = () => {
    if (selectedItems.every((color) => color === "red")) {
      return "red";
    } else if (selectedItems.every((color) => color === "green")) {
      return "green";
    } else {
      return "yellow";
    }
  };

  if (order.items.length === 0) {
    return <div>No pending orders</div>;
  }

  return (
    <div className="select-none relative flex flex-col h-full">
      <div
        className={`${headerColor()} rounded-t-3xl p-4 border-x border-t border-slate-300`}
      >
        <div className="flex text-white justify-between">
          <div className="flex items-center gap-4">
            <img src="/src/assets/Table.png" className="h-8 invert" />
            <p>{order.table}</p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/src/assets/Hourglass.png" className="h-8 invert" />
            <p>
              {new Date(order.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 white p-5 border-x border-slate-300 border-b rounded-b-3xl rounded pb-12`}
      >
        <div>
          <div className="mb-2 ml-7">
            <div className="text-xs">Item count: {order.items.length}</div>
          </div>
          <ul>
            {order.items.map((item, index) => (
              <li className="mb-2" key={index}>
                <div className="flex justify-between">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleItemClick(index)}
                  >
                    <hr
                      className={`w-2 mr-5 ${selectedItems[index]} border-0 h-8`}
                    />
                    <div className="flex flex-col">
                      <p>
                        {item.quantity} x {item.food.name}
                      </p>
                      {item.notes && (
                        <p className="text-red-500 ml-6">Notes: {item.notes}</p>
                      )}
                    </div>
                  </div>

                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => handleItemClickReverse(index)}
                  >
                    <img
                      src="https://static.thenounproject.com/png/3547811-200.png"
                      className="h-8"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <div className="ml-7 text-red-500 italic text-xs">
              {order.notes}
            </div>
          </div>
        </div>
      </div>
      {headerColor() === "green" && (
        <div className="absolute bottom-0 right-0 p-5 text-white">
          <button
            className="green px-5 py-1 rounded-full"
            onClick={handleCompleteClick}
          >
            Complete
          </button>
        </div>
      )}
    </div>
  );
}

export default KitchenTab;
