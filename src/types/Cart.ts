export interface CartItem {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export type CartAdd = Omit<CartItem, "quantity" | "subtotal">;
