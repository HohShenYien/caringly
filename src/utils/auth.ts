import { notifications } from "@mantine/notifications";
import { setCookie } from "cookies-next";

export const login = (jwt: string, message?: string) => {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  setCookie("authToken", jwt, { expires: expiryDate });
  notifications.show({
    message: message ?? "Login successfully, redirecting...",
    color: "green",
  });
};
