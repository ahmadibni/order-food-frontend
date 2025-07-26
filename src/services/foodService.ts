import api from "@/lib/axios";
import type { Food } from "@/types/Food";

const getFoods = async (): Promise<Food[]> => {
  const response = await api.get("/foods");
  return response.data.data;
};

const getFoodById = async (id: string): Promise<Food> => {
  const response = await api.get(`/foods/${id}`);
  return response.data.data;
};

export { getFoods, getFoodById };
