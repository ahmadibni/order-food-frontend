import { create } from "zustand";
import type { CartItem } from "../types/Cart";
import type { Food } from "../types/Food";

interface CartState {
  cartItems: CartItem[];
  addToCart: (food: Food, quantity: number | undefined) => void;
  updateCartItem: (foodId: string, quantity: number) => void;
  removeFromCart: (foodId: string) => void;
  tax: number;
  totalPrice: () => number;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (food, quantity = 1) => {
    const item: CartItem = {
      foodId: food._id,
      name: food.name,
      price: food.price,
      quantity,
      subtotal: food.price * quantity,
      image: food.image,
    };

    const existingCartItem = get().cartItems.find(
      (cartItem) => cartItem.foodId === item.foodId
    );

    if (existingCartItem) {
      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
                subtotal: (cartItem.quantity + quantity) * cartItem.price,
              }
            : cartItem
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [
          ...state.cartItems,
          {
            ...item,
            quantity,
            subtotal: item.price * quantity,
          },
        ],
      }));
    }
  },
  updateCartItem: (foodId, quantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        foodId === cartItem.foodId
          ? {
              ...cartItem,
              quantity,
              subtotal: quantity * cartItem.price,
            }
          : cartItem
      ),
    }));
  },
  tax: 0.1, // Example tax rate
  removeFromCart: (foodId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.foodId !== foodId),
    }));
  },
  totalPrice: () =>
    get().cartItems.reduce((total, item) => total + item.subtotal, 0),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
