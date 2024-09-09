import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";
import { SecureStore } from "@/helpers/SecureStore";
import { User } from "@/models/User";

export class FriendApi extends BaseApi {
  public static async index(): Promise<{
    friends: User[];
  }> {
    const token = await SecureStore.get("token");
    const { data } = await $axios.get("/friends", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
