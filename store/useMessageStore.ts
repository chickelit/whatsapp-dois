import { Message } from "@/models/Message";
import { create } from "zustand";

type Store = {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
};

export const useMessageStore = create<Store>((set) => ({
  messages: [],
  setMessages: (messages) => set((state) => ({ ...state, messages: messages })),
}));
