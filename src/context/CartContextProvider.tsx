import { createContext, useState, type ReactNode } from "react";
import type { CartContextType, CartItem } from "../types/Cart";

export const cartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem>();
};

export default CartContextProvider;
