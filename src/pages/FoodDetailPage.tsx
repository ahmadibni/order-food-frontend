import { useEffect, useState } from "react";
import type { Food } from "../types/Food";
import useCartStore from "../store/useCartStore";
import { useParams } from "react-router";
import { getFoodById } from "@/services/foodService";

const FoodDetailPage = () => {
  const { foodId } = useParams();

  const addToCart = useCartStore((state) => state.addToCart);

  const [food, setFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodById = async () => {
      if (!foodId) {
        setLoading(false);
        setError("Food ID is required");
        return;
      }

      try {
        setLoading(true);
        const data = await getFoodById(foodId);
        setError(null);
        setFood(data);
      } catch (err) {
        setError("Failed to fetch foods. Please try again later.");
        console.error("Error fetching foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodById();
  }, [foodId]);

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

  if (loading) {
    return <div>Loading food detail...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!food) {
    return <div>No food found</div>;
  }

  const price = food.price;

  return (
    <div className="grid grid-cols-2 gap-8">
      <img src={food.image} className="w-full h-96 object-cover rounded-2xl" />

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{food.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {food.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
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
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800 ml-4">
              Rp{(price * quantity).toLocaleString("id-ID")}
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
  );
};

export default FoodDetailPage;
