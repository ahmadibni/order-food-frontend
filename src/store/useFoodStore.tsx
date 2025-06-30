import { create } from "zustand";
import type { Food } from "../types/Food";

interface FoodState {
  foods: Food[];
  setFoods: (foods: Food[]) => void;
  food: Food | null;
  setFood: (food: Food) => void;
}

const useFoodStore = create<FoodState>((set) => ({
  foods: [],
  setFoods: (foods: Food[]) => set({ foods }),
  food: null,
  setFood: (food: Food) => set({ food }),
}));

export default useFoodStore;
