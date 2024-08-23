import { Merge } from "@/typescript/utils/Merge";

export type FormTypeItem<T> = {
  value: T;
};

export type FormType<T> = {
  [P in keyof T]: FormTypeItem<T>;
};

export type FormTypeItemWithError<T> = Merge<FormTypeItem<T>, { error?: string }>;

export type FormTypeWithError<T> = {
  [P in keyof T]: FormTypeItemWithError<T[P]>;
};

export type RevertedForm<T extends FormTypeWithError<T> | FormType<T>> = {
  [P in keyof T]: T[P];
};
