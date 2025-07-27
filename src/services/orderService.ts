import api from "@/lib/axios";
import type { Order, OrderRequest } from "@/types/Order";

const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data.data;
};

const createOrder = async (order: OrderRequest): Promise<Order> => {
  const response = await api.post("/orders", order);
  return response.data.data;
};

export { getOrders, createOrder };
