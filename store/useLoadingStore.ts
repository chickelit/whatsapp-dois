import { create } from "zustand";

type Store = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoadingStore = create<Store>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set((state) => ({ ...state, isLoading: isLoading })),
}));
