import { ORDER_STATUS } from "@/lib/constants";
import { getOrders } from "@/services/orderService";
import useOrderStore from "@/store/useOrderStore";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import { useEffect } from "react";
import { Link } from "react-router";

const AdminOrdersPage = () => {
  const { data } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: getOrders,
  });

  const orders = useOrderStore((state) => state.orders);
  const setOrders = useOrderStore((state) => state.setOrders);

  useEffect(() => {
    if (data) setOrders(data);
  }, [data, setOrders]);

  console.log(data);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-slate-800 mb-4">
        Orders List
      </h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Tombol 'All' */}
        <button className={`px-3 py-1 rounded-3xl border`}>All</button>

        {/* Tombol untuk setiap status */}
        {Object.entries(ORDER_STATUS).map(([key, value]) => (
          <button key={key} className={`px-3 py-1 rounded-3xl border`}>
            {value.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {orders.map((order, i) => {
          const date = new Date(order.createdAt);
          return (
            <div
              className="flex flex-col justify-between p-4 border-[1px] rounded-2xl"
              key={i}
            >
              <div className="flex justify-between mb-4 items-center">
                <p
                  className={clsx(
                    "px-2 py-1 text-sm rounded-full w-fit font-base",
                    ORDER_STATUS[order.status].color
                  )}
                >
                  {ORDER_STATUS[order.status].label}
                </p>
                <Link
                  to={`/admin/orders/${order._id}`}
                  className=" flex items-center gap-x-2 text-xs border-b-blue-300 text-blue-500 hover:text-blue-600 underline underline-offset-4"
                >
                  See Details
                </Link>
              </div>

              <div>
                <p className="text-xl font-semibold">{order.name}</p>
                <p className="text-xs text-gray-500">{date.toLocaleString()}</p>
              </div>

              <div className="mt-2  pb-4 text-xs text-gray-700">
                {order.items.map((item, index) => (
                  <span key={index}>
                    {item.quantity}x {item.name}
                    {index < order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <div className="pt-4 flex border-t border-gray-200 items-center justify-start gap-x-2">
                <p className="text-base font-semibold">
                  IDR. {order.totalPrice.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
