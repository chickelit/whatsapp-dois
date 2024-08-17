import { getItemAsync, SecureStoreOptions, setItemAsync } from "expo-secure-store";

export class SecureStore {
  public static async set(key: string, value: any) {
    await setItemAsync(key, value);
  }

  public static async get(key: string, options?: SecureStoreOptions) {
    return await getItemAsync(key, options);
  }
}
