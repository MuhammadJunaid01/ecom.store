import * as SecureStore from "expo-secure-store";
import showToast from "./showToast";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}
export const clearSecureStorage = async () => {
  try {
    await SecureStore.deleteItemAsync("email");
    await SecureStore.deleteItemAsync("password");
  } catch (error) {
    showToast({ type: "error", message: JSON.stringify(error) });
  }
};
export const MySecureStore = {
  save,
  getValueFor,
  clearSecureStorage,
};
