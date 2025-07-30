import api from "@/lib/axios";
import type { Food } from "@/types/Food";

const getFoods = async (): Promise<Food[]> => {
  try {
    const response = await api.get("/foods");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

const getFoodById = async (id: string): Promise<Food> => {
  try {
    const response = await api.get(`/foods/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching foods:", error);
    throw error;
  }
};

export { getFoods, getFoodById };
