import { User } from "@/models/User";
import { create } from "zustand";

type Store = {
  friends: User[];
  setFriends: (friends: User[]) => void;
};

export const useFriendStore = create<Store>((set) => ({
  friends: [],
  setFriends: (friends) => set((state) => ({ ...state, friends: friends })),
}));
