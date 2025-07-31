import OrderList from "@/components/OrderList";
import { getOrders } from "@/services/orderService";
import useOrderStore from "@/store/useOrderStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const MyOrderPage = () => {
  const orders = useOrderStore((state) => state.orders);
  const setOrders = useOrderStore((state) => state.setOrders);

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  useEffect(() => {
    if (data) setOrders(data);
  }, [data, setOrders]);

  return (
    <div className="mt-4 md:mt-6 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl">
      <h1 className="text-lg md:text-xl font-semibold mb-4">My Orders</h1>

      {isLoading && <div className="text-center py-8">Loading orders...</div>}

      {error && (
        <div className="text-red-500 text-center py-8">{error.message}</div>
      )}

      {orders.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No orders found.</div>
      ) : (
        <>
          {orders.map((order, i) => (
            <OrderList key={i} order={order} />
          ))}
        </>
      )}
    </div>
  );
};

export default MyOrderPage;
