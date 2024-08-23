import { Message } from "@/models/Message";
import { useChatStore } from "@/store/useChatStore";
import { useMessageStore } from "@/store/useMessageStore";
import { io } from "socket.io-client";

export const $socket = io("https://polite-positive-pika.ngrok-free.app");

$socket.on("connect_error", (error) => {
  console.log(error);
});

$socket.on("connection-successful", () => {
  console.log("Socket connected");

  $socket.on("frontend.new-message", (data: { message: Message }) => {
    console.log(data);
    const state = useChatStore.getState();
    const messageState = useMessageStore.getState();
    const rest = state.chats.filter((c) => c.id !== data.message.chat!.id);

    state.setChats([data.message.chat!, ...rest]);

    if (messageState.messages[0]?.chatId !== data.message.chatId) return;

    messageState.setMessages([data.message, ...messageState.messages]);
  });
});
