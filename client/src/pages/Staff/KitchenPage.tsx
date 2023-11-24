import React, { useState, useEffect } from "react";
import Tab from "../../components/kitchen/KitchenTab.tsx";
import { Order as OrderType } from "../../types/types";

interface KitchenPageProps {}

const KitchenPage: React.FC<KitchenPageProps> = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //const [tables, setTables] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/order");
        const ordersData = await response.json();

        // Fetch table details for each order
        const ordersWithTables = await Promise.all(
          ordersData.map(async (order: OrderType) => {
            const tableResponse = await fetch(
              `/api/users/profile/${order.table}`
            );
            const tableData = await tableResponse.json();
            return { ...order, tableNumber: tableData.tableNumber };
          })
        );

        setOrders(ordersWithTables);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);
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
      {isLoading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No pending orders at the moment.</p>
      ) : (
        <div className="grid gray gap-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="col-span-1">
              <Tab order={order} onComplete={handleOrderComplete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KitchenPage;
