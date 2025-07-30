import { useEffect, useState } from "react";
import type { Food } from "../../types/Food";
import useCartStore from "../../store/useCartStore";
import { Link, useParams } from "react-router";
import { categories } from "@/lib/constants";
import { FaArrowLeft } from "react-icons/fa";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TiPlus } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { getFoodById } from "@/services/foodService";

const FoodDetailPage = () => {
  const { foodId } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const [food, setFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { data } = useQuery({
    queryKey: ["foods", foodId],
    queryFn: () => {
      if (!foodId) throw new Error("foodId is required");
      return getFoodById(foodId);
    },
  });

  useEffect(() => {
    if (data) {
      setFood(data);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <img
            src={food.image}
            className="w-full h-64 md:h-96 object-cover rounded-2xl"
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
                  IDR {(food.price * quantity).toLocaleString("id-ID")}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCartClick(food);
                  }}
                  className="relative flex bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-xl justify-center space-x-2 py-2 px-5 cursor-pointer"
                >
                  <TiPlus className="h-3 w-3 text-white" />
                  <span className="text-md text-white font-medium">
                    Add Item
                  </span>
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
