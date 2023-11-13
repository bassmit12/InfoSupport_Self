import React, { useState, useEffect } from "react";
import Tab, { Order as OrderType } from "../../components/Tab";

interface KitchenPageProps {}

const KitchenPage: React.FC<KitchenPageProps> = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [tables, setTables] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderUpdate = async (
    orderId: string,
    updatedData: Partial<OrderType>
  ) => {
    try {
      const response = await fetch("/api/order/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: orderId, ...updatedData }),
      });
      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? updatedOrder : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleOrderComplete = async (orderId: string) => {
    try {
      await fetch("/api/order/complete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: orderId }),
      });

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return (
    <div className="gray h-screen p-20">
      <div className="grid gray gap-20 grid-cols-3">
        {orders.map((order) => (
          <div key={order._id} className="col-span-1">
            <Tab
              order={order}
              tableNumber={order.table} // Pass tableNumber as a prop
              onUpdate={handleOrderUpdate}
              onComplete={handleOrderComplete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitchenPage;
