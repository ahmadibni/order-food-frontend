import type { Food } from "../../types/Food";
import useCartStore from "../../store/useCartStore";
import useFoodStore from "../../store/useFoodStore";
import { useNavigate } from "react-router";
import { categories } from "@/lib/constants";
import { useEffect } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TiPlus } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { getFoods } from "@/services/foodService";

// Define interface for Food data

const FoodsPage = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const foods = useFoodStore((state) => state.foods);
  const setFoods = useFoodStore((state) => state.setFoods);

  const { data } = useQuery({
    queryKey: ["foods"],
    queryFn: getFoods,
  });

  useEffect(() => {
    if (data) {
      setFoods(data);
    }
  }, [data, setFoods]);

  const navigate = useNavigate();

  const handleNavigateToDetail = (foodId: string) => {
    navigate(`/foods/${foodId}`);
  };

  const handleAddToCartClick = (food: Food, quantity?: number) => {
    addToCart(food, quantity);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl">
      {/* Food Categories */}

      <h1 className="text-lg md:text-xl font-semibold mb-4">Main Category</h1>

      <ScrollArea>
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

      <h2 className="text-lg font-semibold mb-4">Popular Dishes</h2>

      {foods.length === 0 ? (
        <p className="text-center py-8">No foods available</p>
      ) : (
        // Food List

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {foods.map((food) => (
            <div
              key={food._id}
              onClick={() => handleNavigateToDetail(food._id)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full"
            >
              <div className="w-full aspect-[4/3]">
                <img
                  src={food.image}
                  alt={food.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex flex-col justify-between items-start mb-2">
                  <h3 className="font-semibold text-sm md:text-base sm:text-lg">
                    {food.name}
                  </h3>
                  <p className="font-medium text-orange-600 text-sm md:text-base">
                    IDR {food.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
                  {food.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCartClick(food);
                    }}
                    className="relative w-full flex bg-orange-500 transition-colors duration-100 ease-in-out hover:bg-orange-400 items-center rounded-xl justify-center space-x-2 py-2 px-2 sm:px-5 cursor-pointer"
                  >
                    <TiPlus className="h-3 w-3 text-white" />
                    <span className="text-sm text-white font-medium">
                      Add Item
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Food List */}
    </div>
  );
};

export default FoodsPage;
