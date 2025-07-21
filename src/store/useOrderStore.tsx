import type { Order } from "@/types/Order";
import { create } from "zustand";

interface OrderState {
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const useOrderStore = create<OrderState>((set) => ({
    orders: [],
    setOrders: (orders: Order[]) => set({ orders }),
}));

export default useOrderStore;
