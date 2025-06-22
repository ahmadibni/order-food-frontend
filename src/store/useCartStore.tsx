import { create } from "zustand";
import type { CartItem } from "../types/Cart";

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (foodId: string) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (item) => {
    const existingCartItem = get().cartItems.find(
      (cartItem) => cartItem.foodId === item.foodId
    );

    if (existingCartItem) {
      set((state) => ({
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.foodId === item.foodId
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
                subtotal: (cartItem.quantity + 1) * cartItem.price,
              }
            : cartItem
        ),
      }));
    } else {
      set((state) => ({
        cartItems: [...state.cartItems, item],
      }));
    }
  },
  removeFromCart: (foodId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.foodId !== foodId),
    }));
  },
}));

export default useCartStore;
