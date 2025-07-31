import { useState } from "react";
import { RiDrinksLine } from "react-icons/ri";
import { PiBowlFood, PiCoffee, PiMapPin, PiUser } from "react-icons/pi";
import { FiMenu, FiSearch } from "react-icons/fi";

import NavItem from "./NavItems";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
} from "@/components/ui/drawer"; // pastikan path sesuai struktur project Anda
import { RxCross2 } from "react-icons/rx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { BiReceipt } from "react-icons/bi";
import { Link } from "react-router";
import { TbReceipt } from "react-icons/tb";

const Header = () => {
  const [open, setOpen] = useState<boolean>(false);

  const menuItems = [
    { label: "Main Dishes", icon: PiBowlFood, link: "/" },
    { label: "Coffee Based", icon: PiCoffee, link: "/coffee-based" },
    { label: "See Our Spot", icon: PiMapPin, link: "/see-our-spot" },
    { label: "Beverages", icon: RiDrinksLine, link: "/beverages" },
  ];

  return (
    <header className="bg-white mx-auto w-full py-3 px-4 sm:py-4 sm:px-6 rounded-3xl max-w-screen-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl font-bold text-orange-500">
            Makan<span className="font-extrabold text-red-500">Ki'</span>
          </h1>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:block">
          <ul className="flex sm:space-x-2 lg:space-x-4 text-sm font-medium">
            {menuItems.map((item, i) => (
              <NavItem
                key={i}
                icon={item.icon}
                label={item.label}
                link={item.link}
              />
            ))}
          </ul>
        </nav>

        {/* Search & Cart */}
        <div className="flex items-center space-x-2">
          <button className="text-xs sm:text-sm text-gray-600 hover:bg-gray-200 p-2 cursor-pointer rounded-full transition-colors duration-100 ease-in-out flex items-center space-x-1">
            <FiSearch className="w-5 h-5 text-gray-600" />
          </button>
          <Link
            to="/orders"
            className="sm:hidden relative flex py-2 px-2 bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-3xl justify-center md:space-x-2 cursor-pointer"
          >
            <TbReceipt className="h-5 w-5 text-white" />
          </Link>
          <button
            className="md:hidden p-2 rounded-full hover:bg-orange-100"
            onClick={() => setOpen(true)}
          >
            <FiMenu className="w-6 h-6 text-orange-500" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <div className="hidden md:flex p-2 items-center space-x-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-100 ease-in-out rounded-full cursor-pointer">
                  <PiUser className="w-5 h-5 text-gray-600" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
              <DropdownMenuLabel>Hello, Ibni</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/orders" className="flex flex-row">
                  <BiReceipt />
                  <span>My Orders</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Drawer Navigationfor Mobile */}
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
                <NavItem
                  key={i}
                  icon={item.icon}
                  label={item.label}
                  link={item.link}
                />
              ))}
            </ul>
          </DrawerDescription>
        </DrawerContent>
      </Drawer>
    </header>
  );
};

export default Header;
