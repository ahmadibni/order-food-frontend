import { useState } from "react";
import { RiDrinksLine } from "react-icons/ri";
import { TbShoppingBag } from "react-icons/tb";
import { PiBowlFood, PiCoffee, PiMapPin } from "react-icons/pi";
import { FiMenu, FiSearch } from "react-icons/fi";

import NavItem from "./NavItems";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"; // pastikan path sesuai struktur project Anda
import { RxCross2 } from "react-icons/rx";
import useCartStore from "@/store/useCartStore";
import { MdShoppingCart } from "react-icons/md";
import CartItemList from "./CartItemList";
import { Badge } from "./ui/badge";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const totalPrice = useCartStore((state) => state.totalPrice());

  const menuItems = [
    { label: "Main Dishes", icon: PiBowlFood },
    { label: "Coffee Based", icon: PiCoffee },
    { label: "See Our Spot", icon: PiMapPin },
    { label: "Beverages", icon: RiDrinksLine },
  ];

  return (
    <header className="bg-gray-100 py-3 px-4 sm:py-4 sm:px-6 rounded-full max-w-screen-xl mx-auto w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
          Makan<span className="text-red-500">Ki'</span>
        </h1>

        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex sm:space-x-2 lg:space-x-4 text-sm font-medium">
            {menuItems.map((item, i) => (
              <NavItem key={i} icon={item.icon} label={item.label} />
            ))}
          </ul>
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="text-xs sm:text-sm text-gray-600 hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-colors duration-100 ease-in-out flex items-center space-x-1">
            <FiSearch className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-orange-100"
            onClick={() => setOpen(true)}
          >
            <FiMenu className="w-6 h-6 text-orange-500" />
          </button>
          <button
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="relative flex bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-3xl justify-center md:space-x-2 py-2 px-2 sm:px-5 cursor-pointer"
          >
            <TbShoppingBag className="w-5 h-5 text-white" />
            <span className="hidden md:block text-xs sm:text-sm text-white font-medium">
              Cart
            </span>
            {cartItems.length > 0 && (
              <Badge variant="destructive" className="absolute -top-1.5 -right-1.5">
                {cartItems.length}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Drawer untuk Cart */}
      <Drawer open={isCartOpen} direction="right" onOpenChange={setIsCartOpen}>
        <DrawerContent className="bg-white h-full w-full sm:w-4/5 md:w-2/5 ml-auto rounded-tl-3xl rounded-bl-3xl shadow-lg flex flex-col transition-all duration-300 ease-in-out">
          <DrawerHeader className="flex flex-row justify-between">
            <DrawerTitle className="flex flex-col items-center justify-between">
              <h1 className="text-lg md:text-xl font-semibold">My Order</h1>
              <p className="text-sm text-gray-500">{cartItems.length} Orders</p>
            </DrawerTitle>
            <DrawerClose onClick={() => setIsCartOpen(false)}>
              <div className="bg-gray-50 hover:bg-gray-200 p-2 rounded-full text-gray-500 hover:text-orange-500 transition-colors duration-150">
                <RxCross2 className="h-4 w-4 text-gray-500" />
              </div>
            </DrawerClose>
          </DrawerHeader>
          <DrawerDescription className="mt-6 px-4 flex-grow overflow-y-auto">
            {/* Contoh isi cart, bisa ganti dengan data dari state/cart store */}
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-gray-400 text-sm gap-2 py-12 flex-grow">
                <MdShoppingCart className="w-10 h-10" />
                <p>Keranjang masih kosong</p>
              </div>
            ) : (
              <div className="flex-grow min-h-0 p-2 overflow-y-auto">
                <div className="space-y-4 pr-1">
                  {cartItems.map((item) => (
                    <CartItemList key={item.foodId} item={item} />
                  ))}
                </div>
              </div>
            )}
          </DrawerDescription>
          <DrawerFooter className="mt-6 px-4">
            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-gray-300 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-700">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-red-500">
                    Rp.{totalPrice.toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-400 text-white font-semibold py-2 rounded-xl transition-colors cursor-pointer">
                  Order Now !
                </button>
              </div>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Drawer for Mobile */}
      <Drawer open={open} direction="left" onOpenChange={setOpen}>
        <DrawerContent className="md:hidden bg-white rounded-tr-3xl rounded-br-3xl shadow-lg h-full w-4/5 sm:w-3/5 transition-all duration-300 ease-in-out">
          <DrawerHeader className="flex flex-row justify-between">
            <DrawerTitle>
              <h1 className="text-xl font-bold text-orange-500">
                Makan<span className="text-red-500">Ki'</span>
              </h1>
            </DrawerTitle>
            <DrawerClose className="bg-gray-50 hover:bg-gray-200 p-2 rounded-full text-gray-500 hover:text-orange-500 transition-colors duration-150">
              <RxCross2 className="h-3 w-3 text-gray-500" />
            </DrawerClose>
          </DrawerHeader>
          <DrawerDescription className="mt-6 px-4">
            <ul className="space-y-4 flex flex-col items-start">
              {menuItems.map((item, i) => (
                <NavItem key={i} icon={item.icon} label={item.label} />
              ))}
            </ul>
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
