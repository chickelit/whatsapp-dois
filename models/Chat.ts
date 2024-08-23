import { Message } from "./Message";
import { User } from "./User";

export enum ChatTypes {
  Private = "private",
  Group = "group",
}

export type Chat = {
  id: string;
  type: ChatTypes;
  participants: User[];
  latestMessage?: Message;
};
