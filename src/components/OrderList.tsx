import type { Order } from "@/types/Order";

const OrderList = ({ order }: { order: Order }) => {
  const date = new Date(order.createdAt);

  return (
    <div className="flex items-center justify-between p-4 border-[1px] rounded-lg">
      <div>
        <h2 className="text-md font-semibold mb-2">{order.name}</h2>
        <p className="text-sm text-gray-600">{date.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-lg font-semibold text-red-500">
          Total: Rp. {order.totalPrice.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default OrderList;
