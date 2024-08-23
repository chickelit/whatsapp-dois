import { ReactState } from "@/types/ReactState";
import { FormTypeWithError } from "@/types/FormType";

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
