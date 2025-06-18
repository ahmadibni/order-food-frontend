export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (cartItem: CartItem) => void;
  removeFromCart: (foodId: string) => void;
  totalAmount: number;
  totalItems: number;
}

export interface CartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}
