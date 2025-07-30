import api from "@/lib/axios";
import type { Order, OrderRequest } from "@/types/Order";

const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/orders");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

const createOrder = async (order: OrderRequest): Promise<Order> => {
  try {
    const response = await api.post("/orders", order);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export { getOrders, createOrder };
