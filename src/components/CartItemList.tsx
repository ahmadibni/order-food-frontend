import useCartStore from "../store/useCartStore";
import { TiPlus, TiMinus } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import type { CartItem } from "../types/Cart";

const CartItemList = ({ item }: { item: CartItem }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartItem = useCartStore((state) => state.updateCartItem);

  const handleIncrementQuantity = (item: CartItem) => {
    const updatedQuantity = item.quantity + 1;
    updateCartItem(item.foodId, updatedQuantity);
  };

  const handleDecreementQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      const updatedQuantity = item.quantity - 1;
      updateCartItem(item.foodId, updatedQuantity);
    }
  };

  return (
    <div
      key={item.foodId}
      className="relative grid grid-cols-3 grid-rows-2 items-center space-x-3 p-3 border-[1px] border-dashed border-gray-400 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <button
        onClick={() => removeFromCart(item.foodId)}
        className="absolute -top-2.5 -right-2.5 z-10 me-0 bg-gray-50 rounded-full p-1.5 shadow-sm hover:bg-gray-200 transition-colors cursor-pointer"
      >
        <RxCross2 className="h-3 w-3 text-gray-500" />
      </button>
      <div className="row-span-2 flex items-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
        />
      </div>
      <div className="col-span-2">
        <h3 className="font-medium md:text-sm lg:text-base text-gray-900">
          {item.name}
        </h3>
      </div>
      <div className="col-start-2 row-start-2">
        <p className="text-xs font-semibold text-red-500">
          IDR. {item.subtotal.toLocaleString()}
        </p>
      </div>
      <div className="flex items-center col-start-3 row-start-2">
        <button
          onClick={() => {
            handleDecreementQuantity(item);
          }}
          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <TiMinus className="h-3 w-3" />
        </button>
        <span className="w-6 text-center md:text-sm lg:text-base font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => {
            handleIncrementQuantity(item);
          }}
          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <TiPlus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export default CartItemList;
