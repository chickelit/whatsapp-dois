import { FriendRequest } from "@/models/FriendRequest";
import { create } from "zustand";

type Store = {
  friendRequests: FriendRequest[];
  friendRequest?: FriendRequest;
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
  setFriendRequest: (friendRequest: FriendRequest) => void;
};

export const useFriendRequestStore = create<Store>((set) => ({
  friendRequests: [],
  friendRequest: undefined,
  setFriendRequests: (friendRequests) => set((state) => ({ ...state, friendRequests: friendRequests })),
  setFriendRequest: (friendRequest) => set((state) => ({ ...state, friendRequest: friendRequest })),
}));
