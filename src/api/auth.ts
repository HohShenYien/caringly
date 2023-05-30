import { AuthType } from "@/features/Auth/LoginModal";
import { RegisterType } from "@/features/Auth/RegisterModal";
import { UserProfile } from "@/features/User/EditUserModal";
import apiClient from "@/utils/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useLoginMutation = () => {
  const query = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: AuthType) => {
      return await apiClient.post("/auth/login", data);
    },
  });
  return query;
};

export const useRegisterMutation = () => {
  const query = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterType) => {
      return await apiClient.post("/auth/register", data);
    },
  });
  return query;
};

export const useUpdateMeMutation = () => {
  const mutation = useMutation({
    mutationKey: ["UpdateMe"],
    mutationFn: async (data: UserProfile) => {
      return await apiClient.put("/auth/me", {
        username: data.username,
        email: data.email,
        password: data.password,
        receive_email: data.receiveEmailNotification,
        ...(data.newPassword
          ? {
              new_password: data.newPassword,
            }
          : null),
      });
    },
  });
  return mutation;
};

export const useUserQuery = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    setAuthToken(getCookie("authToken") as string | null);
  }, [router.pathname]);
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await apiClient.get("/auth/me");
    },
    enabled: !!authToken,
    retry: false,
  });
  return query;
};
