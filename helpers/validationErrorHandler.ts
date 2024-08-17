import React, { SetStateAction } from "react";
import { FormTypeWithError } from "@/typescript/utils/FormType";
import { ReactState } from "@/typescript/utils/ReactState";

export function validationErrorHandler<FT>(state: ReactState<FormTypeWithError<FT>>, details: { path: string[]; message: string }[]) {
  const [value, setValue] = state;

  for (const detail of details) {
    const field = detail.path[0] as keyof FT;
    const message = detail.message;

    setValue({
      ...value,
      [field]: {
        value: value[field].value,
        error: message,
      },
    });
  }

  return;
}
