import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";
import { FormType, FormTypeWithError } from "@/types/FormType";

export type SignUpPayload = { username: string; password: string; passwordConfirmation: string };

export type SignInPayload = { username: string; password: string };

export class UserApi extends BaseApi {
  public static async signUp(payload: FormType<SignUpPayload> | FormTypeWithError<SignUpPayload>) {
    const { data } = await $axios.post("/sign-up", this._sanitize(payload));

    return data;
  }

  public static async signIn(payload: FormType<SignInPayload> | FormTypeWithError<SignInPayload>) {
    const { data } = await $axios.post("/sign-in", this._sanitize(payload));

    return data;
  }

  public static async getAccount(token: string) {
    const { data } = await $axios.get("/sign-in", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}
