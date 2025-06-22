import useCartStore from "../store/useCartStore";
import CartItemList from "./CartItemList";

const CartSidebar = () => {
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="w-80 bg-gray-100 mt-6 p-6 h-screen rounded-2xl overflow-y-scroll">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">My Order</h1>
        <p className="text-sm text-gray-500">{cartItems.length} Orders</p>
      </div>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <CartItemList key={item.foodId} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CartSidebar;
