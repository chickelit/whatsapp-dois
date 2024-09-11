import { Chat } from "@/models/Chat";
import { create } from "zustand";

type Store = {
  chats: Chat[];
  chat?: Chat;
  setChats: (chats: Chat[]) => void;
  setChat: (chat: Chat | undefined) => void;
};

export const useChatStore = create<Store>((set) => ({
  chats: [],
  chat: undefined,
  setChats: (chats) => set((state) => ({ ...state, chats: chats })),
  setChat: (chat) => set((state) => ({ ...state, chat: chat })),
}));
