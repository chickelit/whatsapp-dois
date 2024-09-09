import { User } from "@/models/User";
import { $socket } from "@/utils/$socket";
import { create } from "zustand";

type Store = {
  user?: User;
  setUser: (user: User | undefined) => void;
};

export const useUserStore = create<Store>((set) => ({
  user: undefined,
  setUser: (user) => {
    user && $socket.emit("create", user.id);

    return set((state) => ({ ...state, user: user }));
  },
}));
