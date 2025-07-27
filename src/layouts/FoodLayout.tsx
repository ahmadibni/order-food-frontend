import CartSidebar from "@/components/CartSidebar";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/store/useCartStore";
import { MdShoppingCart } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";

import { Link, Outlet } from "react-router";
import { useState } from "react";
import CartItemList from "@/components/CartItemList";

const FoodLayout = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice());

  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex flex-col min-h-screen max-w-screen-xl mx-auto w-full relative">
      <div className="flex flex-col md:flex-row gap-6 flex-grow min-h-0">
        {/* Main Content */}
        <div className="flex-1 w-full md:w-2/3 mt-4 md:mt-6 min-h-0">
          <Outlet />
        </div>

        {/* Cart Sidebar */}
        <div className="w-full md:w-80 self-stretch">
          <CartSidebar />
        </div>
      </div>

      {/* Floating UI di bawah */}
      <div className="sticky flex items-center bottom-5 bg-white p-2 rounded-4xl md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm">
        {cartItems.length === 0 && (
          <div className="flex items-center justify-center text-gray-400 text-sm gap-2 flex-grow">
            <MdShoppingCart className="w-5 h-5" />
            <p>No orders yet, ready to take one?</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <button
              onClick={() => setOpen(true)}
              className="relative p-3 flex bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-3xl justify-center cursor-pointer"
            >
              <TbShoppingBag className="w-6 h-6 text-white" />
              {cartItems.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1.5 -right-1.5 w-2"
                >
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </Badge>
              )}
            </button>
            <div className="flex flex-col items-start w-full pl-12">
              <p className="text-sm text-center font-medium text-gray-700">
                Total :
              </p>
              <p className="text-md font-semibold text-red-500">
                IDR. {totalPrice.toLocaleString()}
              </p>
            </div>
            <Link
              to="/orders/add"
              className="text-lg text-white font-medium bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 rounded-3xl py-2.5 px-6 cursor-pointer"
            >
              <span className="">Order</span>
            </Link>
          </>
        )}
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerOverlay className="" />
        <DrawerContent className="bg-white rounded-tr-3xl rounded-br-3xl shadow-lg  transition-all duration-300 ease-in-out">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 text-sm gap-2 py-12 flex-grow">
              <MdShoppingCart className="w-10 h-10" />
              <p>Keranjang masih kosong</p>
            </div>
          ) : (
            <div className="pr-1 space-y-4">
              {cartItems.map((item) => (
                <CartItemList key={item.foodId} item={item} />
              ))}
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default FoodLayout;
