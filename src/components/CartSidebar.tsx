import useCartStore from "../store/useCartStore";
import CartItemList from "./CartItemList";
import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const CartSidebar = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice());

  return (
    <div className="hidden bg-white p-4 mt-2 sm:mt-6 md:p-6 rounded-2xl md:rounded-3xl md:flex flex-col overflow-hidden max-h-[80vh] md:max-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-semibold">My Meal List</h1>
          <p className="text-sm text-gray-500">
            {cartItems.length}{" "}
            {cartItems.length === 1 || cartItems.length === 0
              ? "Order"
              : "Orders"}
          </p>
        </div>
      </div>

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-400 text-sm gap-2 py-12 flex-grow">
          <MdShoppingCart className="w-10 h-10" />
          <p>Keranjang masih kosong</p>
        </div>
      ) : (
        <ScrollArea className="flex-grow min-h-0 overflow-y-auto">
          <div className="pr-1 space-y-4">
            {cartItems.map((item) => (
              <CartItemList key={item.foodId} item={item} />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="pt-4 border-t border-gray-300 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">Total</span>
            <span className="text-lg font-semibold text-red-500">
              IDR. {totalPrice.toLocaleString()}
            </span>
          </div>
          <Link
            to="/orders/add"
            className="block w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 rounded-xl transition-colors text-center"
          >
            Order Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
