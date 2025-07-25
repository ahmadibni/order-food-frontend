import { useEffect, useState } from "react";
import type { Food } from "../../types/Food";
import useCartStore from "../../store/useCartStore";
import { Link, useLoaderData } from "react-router";
import { categories } from "@/lib/constants";
import { FaArrowLeft } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const FoodDetailPage = () => {
  const data = useLoaderData();

  const addToCart = useCartStore((state) => state.addToCart);

  const [food, setFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setFood(data);
  }, [data, setFood]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCartClick = (food: Food, quantity?: number) => {
    addToCart(food, quantity);
  };

  // const price = food.price;

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl">
      {/* Food Categories */}

      <div className="flex items-center gap-x-2 mb-4">
        <Link to="/">
          <FaArrowLeft className="cursor-pointer" />
        </Link>
        <h1 className="text-lg md:text-xl font-semibold">Main Category</h1>
      </div>

      <ScrollArea className="mb-2">
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={index}
              className="bg-gray-100 px-4 md:px-5 py-2 rounded-full hover:bg-gray-800 hover:text-white ease-in-out transition-colors whitespace-nowrap text-sm md:text-base"
            >
              {category}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {food ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <img
            src={food.image}
            className="w-full h-64 md:h-96 object-cover rounded-2xl mb-6 md:mb-0"
            alt={food.name}
          />

          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-3">
                {food.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed text-base md:text-lg">
                {food.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDecreement}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  <span className="text-xl">-</span>
                </button>
                <p className="text-xl font-medium">{quantity}</p>
                <button
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xl font-bold text-gray-800 ml-0 md:ml-4">
                  IDR. {(food.price * quantity).toLocaleString("id-ID")}
                </span>
                <button
                  onClick={() => {
                    handleAddToCartClick(food, quantity);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors py-2 px-5 rounded-full text-white cursor-pointer"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No food found</div>
      )}
    </div>
  );
};

export default FoodDetailPage;
