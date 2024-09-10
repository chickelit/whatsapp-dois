import { FriendRequest } from "@/models/FriendRequest";
import { create } from "zustand";

type Store = {
  friendRequests: FriendRequest[];
  friendRequest?: FriendRequest;
  count?: number;
  setCount: (count: number) => void;
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
  setFriendRequest: (friendRequest: FriendRequest) => void;
};

export const useFriendRequestStore = create<Store>((set) => ({
  friendRequests: [],
  friendRequest: undefined,
  count: 0,
  setFriendRequests: (friendRequests) => set((state) => ({ ...state, friendRequests: friendRequests })),
  setFriendRequest: (friendRequest) => set((state) => ({ ...state, friendRequest: friendRequest })),
  setCount: (count) => set((state) => ({ ...state, count })),
}));
