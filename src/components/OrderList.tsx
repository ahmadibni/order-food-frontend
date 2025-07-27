import type { Order } from "@/types/Order";
import { ORDER_STATUS } from "@/lib/constants";
import clsx from "clsx";

const OrderList = ({ order }: { order: Order }) => {
  const date = new Date(order.createdAt);

  return (
    <div className="p-4 border-[1px] rounded-lg mb-4">
      <p
        className={clsx(
          "px-4 py-1 mb-2 text-base rounded-full w-fit font-base",
          ORDER_STATUS[order.status].color
        )}
      >
        {ORDER_STATUS[order.status].label}
      </p>
      <div>
        <p className="text-xl font-semibold">{order.name}</p>
        <p className="text-xs text-gray-500">{date.toLocaleString()}</p>
      </div>

      <div className="mt-2 border-b-[1px] border-gray-w00 pb-4">
        {order.items.map((item, index) => (
          <p key={index} className="text-xs text-gray-700">
            {item.quantity}x {item.name}
          </p>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-start gap-x-2">
        <h2 className="text-xs text-gray-500">Cost :</h2>
        <p className="text-lg font-semibold">
          IDR. {order.totalPrice.toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
};

export default OrderList;
