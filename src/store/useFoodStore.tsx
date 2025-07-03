import { create } from "zustand";
import type { Food } from "../types/Food";

interface FoodState {
  foods: Food[];
  setFoods: (foods: Food[]) => void;
}

const useFoodStore = create<FoodState>((set) => ({
  foods: [],
  setFoods: (foods: Food[]) => set({ foods }),
}));

export default useFoodStore;
