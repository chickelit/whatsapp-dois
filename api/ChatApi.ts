import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";
import { SecureStore } from "@/helpers/SecureStore";
import { Chat } from "@/models/Chat";

export class ChatApi extends BaseApi {
  public static async index(): Promise<{
    chats: Chat[];
  }> {
    const token = await SecureStore.get("token");
    const { data } = await $axios.get("/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
