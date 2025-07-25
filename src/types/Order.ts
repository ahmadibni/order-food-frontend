import type { OrderStatus } from "@/lib/constants";
import type { CartItem } from "./Cart";

export type OrderItem = Omit<CartItem, "subtotal" | "image">;

export interface Order {
  name: string;
  phone: string;
  address: string;
  totalPrice: number;
  createdAt: string;
  items: OrderItem[];
  status: OrderStatus;
}
