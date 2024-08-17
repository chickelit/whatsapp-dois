import { FormType, FormTypeWithError } from "@/typescript/utils/FormType";

export class BaseApi {
  protected static _sanitize<T>(form: FormType<T> | FormTypeWithError<T>) {
    return Object.keys(form).reduce((result, key) => ({ ...result, [key]: form[key as keyof typeof form].value }), {} as T);
  }
}
