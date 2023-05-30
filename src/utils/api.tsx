import { notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
const queryClient = new QueryClient();

const AxiosInterceptor = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const errInterceptor = (error: any) => {
      if (error?.response?.status === 401) {
        notifications.show({
          message: "You are unauthenticated, please login",
          color: "red",
        });
        router.push("/");
      }

      return Promise.reject(error);
    };

    const reqInterceptor = apiClient.interceptors.request.use((config) => {
      const authToken = getCookie("authToken");
      config.headers.Authorization = `bearer ${authToken}`;

      return config;
    });

    const interceptor = apiClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => {
      apiClient.interceptors.response.eject(interceptor);
      apiClient.interceptors.request.eject(reqInterceptor);
    };
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default apiClient;
export { AxiosInterceptor };
