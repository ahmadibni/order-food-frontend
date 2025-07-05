import CartSidebar from "@/components/CartSidebar";
import { FaArrowLeft } from "react-icons/fa";
import { Link, Outlet } from "react-router";

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
    <div className="flex flex-col md:flex-row gap-6 flex-grow min-h-0">
      {/* Main Content */}
      <div className="flex-1 mt-4 md:mt-6 min-h-0">
        <div className="bg-gray-100 p-4 md:p-6 rounded-2xl md:rounded-3xl">
          {/* Food Categories */}
          <div>
            <div className="flex items-center gap-x-2 mb-4">
              <Link to="/">
                <FaArrowLeft className="cursor-pointer" />
              </Link>
              <h1 className="text-lg md:text-xl font-semibold">Main Category</h1>
            </div>
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="bg-white px-4 md:px-5 py-2 rounded-full hover:bg-gray-800 hover:text-white ease-in-out transition-colors whitespace-nowrap text-sm md:text-base"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Cart Sidebar - Responsive width and margin */}
      <div className="w-full md:w-80 self-stretch">
        <CartSidebar />
      </div>
    </div>
  );
};

export default FoodLayout;