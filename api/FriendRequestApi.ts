import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";
import { SecureStore } from "@/helpers/SecureStore";
import { FriendRequest } from "@/models/FriendRequest";

export class FriendRequestApi extends BaseApi {
  public static async index(): Promise<{
    friendRequests: FriendRequest[];
  }> {
    const token = await SecureStore.get("token");
    const { data } = await $axios.get("/friend-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
