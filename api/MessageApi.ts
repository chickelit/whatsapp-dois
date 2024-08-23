import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";
import { SecureStore } from "@/helpers/SecureStore";

type StorePayload = {
  chatId?: string;
  userId?: string;
  message: {
    text: string;
  };
};

type Pagination = {
  page: number;
  perPage: number;
};

export class MessageApi extends BaseApi {
  public static async index(chat: string, pagination: Pagination = { page: 1, perPage: 50 }) {
    const token = await SecureStore.get("token");
    const { data } = await $axios.get(`/messages?chat=${chat}&page=${pagination.page}&perPage=${pagination.perPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public static async store(payload: StorePayload) {
    const token = await SecureStore.get("token");
    const { data } = await $axios.post("/messages", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
