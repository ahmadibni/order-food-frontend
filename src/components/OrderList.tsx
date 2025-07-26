import type { Order } from "@/types/Order";
import { ORDER_STATUS } from "@/lib/constants";
import clsx from "clsx";

const OrderList = ({ order }: { order: Order }) => {
  const date = new Date(order.createdAt);

  return (
    <div className="flex justify-between p-4 border-[1px] rounded-lg text-center">
      <div>
        <h2 className="text-xs text-gray-500 mb-3 underline underline-offset-4">
          Created at
        </h2>
        <p className="text-base text-gray-600">{date.toLocaleDateString()}</p>
        <p className="text-base text-gray-600">{date.toLocaleTimeString()}</p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500 mb-3 underline underline-offset-4">
          Name
        </h2>
        <p className="text-base font-semibold">{order.name}</p>
        <p className="text-base text-gray-500">{order.phone}</p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500 mb-3 underline underline-offset-4">
          Destination
        </h2>
        <p className="text-base font-semibold">{order.address}</p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500 mb-3 underline underline-offset-4">
          Cost
        </h2>
        <p className="text-lg font-semibold text-lime-600">
          IDR. {order.totalPrice.toLocaleString()}
        </p>
      </div>
      <div>
        <h2 className="text-xs text-gray-500 mb-3 underline underline-offset-4">
          Status
        </h2>
        <p
          className={clsx(
            "text-sm rounded-full font-semibold px-4 py-1",
            ORDER_STATUS[order.status].color
          )}
        >
          {ORDER_STATUS[order.status].label}
        </p>
      </div>
    </div>
  );
};

export default OrderList;
