import { FormType, FormTypeItemWithError, FormTypeWithError, RevertedForm } from "@/typescript/utils/FormType";
import { $axios } from "@/utils/$axios";
import { BaseApi } from "./BaseApi";

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
}
