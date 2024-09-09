import { User } from "./User";

export type FriendRequest = {
  id: string;
  fromId: string;
  toId: string;
  from: User;
  to: User;
  isFromMe: boolean;
  createdAt: Date;
};
