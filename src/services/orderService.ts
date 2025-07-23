import api from "@/utils/axios";
import type { Order } from "@/types/Order";

const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");
  return response.data.data;
};

export { getOrders };
