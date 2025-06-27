import { create } from "zustand";
import type { Food } from "../types/Food";

interface FoodState {
  foods: Food[];
  setFoods: (foods: Food[]) => void;
  selectedFood: Food | null;
  selectFood: (food: Food | null) => void;
}

const useFoodStore = create<FoodState>((set) => ({
  foods: [],
  setFoods: (foods: Food[]) => set({ foods }),
  selectedFood: null,
  selectFood: (food: Food | null) => set({ selectedFood: food }),
}));

export default useFoodStore;
