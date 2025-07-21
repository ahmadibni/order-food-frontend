import { getOrders } from "@/services/orderService";
import useOrderStore from "@/store/useOrderStore";
import { useEffect, useState } from "react";

const MyOrderPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const setOrders = useOrderStore((state) => state.setOrders);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch foods. Please try again later.");
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return (
    <div className="mt-4 md:mt-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl">
      <h1 className="text-lg md:text-xl font-semibold mb-4">My Orders</h1>
      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-8">{error}</div>
      ) : (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <div
                key={i}
                className="p-4 border-[1px] rounded-lg"
              >
                <h2 className="text-md font-semibold mb-2">{order.name}</h2>
                <p className="text-sm text-gray-600">
                  Total: Rp. {order.totalPrice.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-12">
              No orders found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrderPage;
