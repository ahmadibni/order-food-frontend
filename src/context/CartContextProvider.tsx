import { createContext, useState, type ReactNode } from "react";
import type { CartContextType, CartItem } from "../types/Cart";

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (cartItem: CartItem) => {
    setCartItems((prev) => [...prev, cartItem]);
  };

  const removeFromCart = (foodId: string) => {
    setCartItems((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    totalAmount: cartItems.reduce((acc, item) => acc + item.subtotal, 0),
    totalItems: cartItems.length,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
