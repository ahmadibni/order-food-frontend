import { useEffect, useState } from "react";
import type { Food } from "../types/Food";
import useCartStore from "../store/useCartStore";
import useFoodStore from "../store/useFoodStore";
import { getFoods } from "@/services/foodService";
import { useNavigate } from "react-router";

// Define interface for Food data

const FoodsPage = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const foods = useFoodStore((state) => state.foods);
  const setFoods = useFoodStore((state) => state.setFoods);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getFoods();
        setFoods(data);
      } catch (err) {
        setError("Failed to fetch foods. Please try again later.");
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const handleNavigateToDetail = (foodId: string) => {
    navigate(`/foods/${foodId}`);
  };

  const handleAddToCartClick = (food: Food, quantity?: number) => {
    addToCart(food, quantity);
  };

  if (loading) {
    return <div className="text-center py-8">Loading foods...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Popular Dishes</h2>

      {error && <div className="text-center py-8 text-red-500">{error}</div>}

      {foods.length === 0 && !error ? (
        <div className="text-center py-8">No foods available</div>
      ) : (
        // Food List
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              onClick={() => handleNavigateToDetail(food._id)}
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
  );
};

export default FoodsPage;
