import useCartStore from "../store/useCartStore";
import { TiPlus, TiMinus } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import type { CartItem } from "../types/Cart";

const CartItemList = ({ item }: { item: CartItem }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  return (
    <div
      key={item.foodId}
      className="relative flex items-center space-x-3 p-3 border-[1px] border-dashed border-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <button
        onClick={() => removeFromCart(item.foodId)}
        className="absolute -top-2.5 -right-2.5 z-10 me-0 bg-gray-50 rounded-full p-1.5 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <RxCross2 className="h-3 w-3 text-gray-500" />
      </button>
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-sm text-gray-900">{item.name}</h3>
        <p className="text-sm font-semibold text-red-500">
          Rp.{item.subtotal.toLocaleString()}
        </p>
      </div>
      <div className="flex flex-col justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {}}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <TiMinus className="h-3 w-3" />
          </button>
          <span className="w-6 text-center text-sm font-medium">
            {item.quantity}
          </span>
          <button
            onClick={() => {}}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <TiPlus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemList;
