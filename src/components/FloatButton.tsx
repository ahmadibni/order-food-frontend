import { Badge } from "@/components/ui/badge";
import useCartStore from "@/store/useCartStore";
import { MdShoppingCart } from "react-icons/md";
import { TbShoppingBag } from "react-icons/tb";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

import { Link } from "react-router";
import { useState } from "react";
import CartItemList from "@/components/CartItemList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const FloatButton = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice());

  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="sticky flex items-center bottom-5 bg-white p-2 rounded-4xl md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm">
        {cartItems.length === 0 && (
          <div className="flex items-center justify-center text-gray-400 text-sm gap-2 p-3 flex-grow">
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
              <p className="text-xs text-center font-medium text-gray-700">
                Total :
              </p>
              <p className="text-lg font-semibold text-red-500">
                IDR {totalPrice.toLocaleString("id-ID")}
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
        <DrawerContent className="bg-white rounded-t-3xl shadow-lg transition-all duration-300 ease-in-out max-h-[90vh] flex flex-col">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 text-sm gap-2 py-12 flex-grow">
              <MdShoppingCart className="w-10 h-10" />
              <p>Keranjang masih kosong</p>
            </div>
          ) : (
            <ScrollArea className="flex-grow min-h-0 overflow-y-auto">
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <CartItemList key={item.foodId} item={item} />
                ))}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FloatButton;
