import CartSidebar from "@/components/CartSidebar";
import { FaArrowLeft } from "react-icons/fa";
import { Outlet } from "react-router";

const FoodLayout = () => {
  const categories = [
    "Pasta",
    "Salad",
    "Seafood",
    "Soups",
    "Roasted Meats",
    "Oven-Baked",
    "Plant-Based",
  ];

  return (
    <div className="flex gap-6 flex-grow min-h-0">
      {/* Main Content */}
      <div className="flex-1 mt-6 min-h-0">
        <div className="bg-gray-100 p-6 rounded-3xl">
          {/* Food Categories */}
          <div>
            <div className="flex items-center gap-x-2 mb-4">
              <FaArrowLeft className="cursor-pointer" />

              <h1 className="text-xl font-semibold">Main Category</h1>
            </div>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-white px-5 py-2 rounded-full hover:bg-gray-800 hover:text-white ease-in-out transition-colors whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Outlet />
      </div>

      {/* Cart Sidebar - Tambahkan self-start untuk alignment */}
      <div className="self-start">
        <CartSidebar />
      </div>
    </div>
  );
};

export default FoodLayout;
