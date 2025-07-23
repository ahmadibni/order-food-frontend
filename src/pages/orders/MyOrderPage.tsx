import OrderList from "@/components/OrderList";
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

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border p-4 rounded-lg">
          <ul className="space-y-2">
            {["all", "pending", "preparing", "delivered", "cancelled"].map(
              (status) => (
                <li key={status}>
                  <button
                    // onClick={() => setSelectedStatus(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-4">
          {loading && <div className="text-center py-8">Loading orders...</div>}

          {error && (
            <div className="text-red-500 text-center py-8">{error}</div>
          )}

          {orders.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No orders found.
            </div>
          ) : (
            <>
              {orders.map((order, i) => (
                <OrderList key={i} order={order} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
