import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import FoodDetail from "./FoodDetail";
import type { Food } from "../types/Food";
import useCartStore from "../store/useCartStore";
import useFoodStore from "../store/useFoodStore";

// Define interface for Food data

const FoodMain = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const foods = useFoodStore((state) => state.foods);
  const setFoods = useFoodStore((state) => state.setFoods);

  const selectedFood = useFoodStore((state) => state.selectedFood);
  const selectFood = useFoodStore((state) => state.selectFood);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Pasta",
    "Salad",
    "Seafood",
    "Soups",
    "Roasted Meats",
    "Oven-Baked",
    "Plant-Based",
  ];

  function handleSelectFood(food: Food) {
    selectFood(food);
  }

  function handleGetBack() {
    selectFood(null);
  }

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/foods");
        setFoods(response.data.data);
      } catch (err) {
        setError("Failed to fetch foods. Please try again later.");
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleAddToCartClick = (food: Food, quantity?: number) => {
    addToCart(food, quantity);
  };

  if (loading) {
    return <div className="text-center py-8">Loading foods...</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-3xl">
      {/* Food Categories */}
      <div>
        <div className="flex items-center gap-x-2 mb-4">
          {selectedFood && (
            <FaArrowLeft onClick={handleGetBack} className="cursor-pointer" />
          )}
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

      <div>
        {!selectedFood && (
          <h2 className="text-lg font-semibold mb-4">Popular Dishes</h2>
        )}

        {error && <div className="text-center py-8 text-red-500">{error}</div>}

        {selectedFood ? (
          <FoodDetail food={selectedFood} />
        ) : foods.length === 0 && !error ? (
          <div className="text-center py-8">No foods available</div>
        ) : (
          // Food List
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods.map((food) => (
              <div
                key={food._id}
                onClick={() => handleSelectFood(food)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <div className="flex flex-col justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <p className="font-medium text-orange-600">
                      Rp. {food.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {food.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCartClick(food);
                      }}
                      className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Food List */}
      </div>
    </div>
  );
};

export default FoodMain;
