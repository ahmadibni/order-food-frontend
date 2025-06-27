import { useState } from "react";
import type { Food } from "../types/Food";
import useCartStore from "../store/useCartStore";

const FoodDetail = ({ food }: { food: Food }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState<number>(1);
  const price = food.price;

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

export default FoodDetail;
