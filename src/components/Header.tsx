import { RiDrinksLine } from "react-icons/ri";
import { TbShoppingBag } from "react-icons/tb";
import { PiBowlFood, PiCoffee, PiMapPin } from "react-icons/pi";
import { FiMenu } from "react-icons/fi";

import type { FC } from "react";
import NavItem from "./NavItems";

const Header: FC = () => {
  const menuItems = [
    { label: "Main Dishes", icon: PiBowlFood },
    { label: "Coffee Based", icon: PiCoffee },
    { label: "See Our Spot", icon: PiMapPin },
    { label: "Beverages", icon: RiDrinksLine },
  ];
  return (
    <header className="bg-gray-100 py-3 px-4 sm:py-4 sm:px-6 rounded-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
          Makan<span className="text-red-500">Ki'</span>
        </h1>

        {/* Hamburger Menu for Mobile */}
        <button className="sm:hidden p-2 rounded-full hover:bg-orange-100">
          <FiMenu className="w-6 h-6 text-orange-500" />
        </button>

        {/* Navigation Menu */}
        <nav className="hidden sm:block">
          <ul className="flex space-x-4 text-sm font-medium">
            {menuItems.map((item, i) => (
              <NavItem key={i} icon={item.icon} label={item.label} />
            ))}
          </ul>
        </nav>

        {/* Search & Cart */}
        <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
          <button className="text-xs sm:text-sm text-gray-600">Search</button>
          <div className="flex bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-3xl justify-center space-x-2 py-2 px-3 sm:px-5 cursor-pointer">
            <TbShoppingBag className="w-5 h-5 text-white" />
            <span className="text-xs sm:text-sm text-white font-medium">
              Cart
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
