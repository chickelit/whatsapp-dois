import { Chat } from "./Chat";
import { User } from "./User";

export type Message = {
  id: string;
  fromId: string;
  chatId: string;
  text: string;
  chat?: Chat;
  from?: User;
  createdAt: Date;
};
