import { AccountName } from "@/features/Account/EditAccountNameModal";
import { NewAccountType } from "@/features/Account/NewAccountModal";
import { SocialMediaUserData } from "@/features/Account/UserAccounts";
import apiClient from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export type MonitoredUserData = {
  name: string;
  id: string;
  email: string;
};

export const useMonitoredUsersQuery = () => {
  return useQuery<MonitoredUserData[]>({
    queryKey: ["monitored-users"],
    queryFn: async () => {
      const res = await apiClient.get("/monitored-users");
      return res.data.data;
    },
  });
};

type MonitoredUserDetails = MonitoredUserData & {
  accounts: SocialMediaUserData[];
};

export const useCurrentMonitoredUserQuery = (id: string) => {
  return useQuery<MonitoredUserDetails>({
    queryKey: ["monitored-user", id],
    queryFn: async () => {
      const res = await apiClient.get(`/monitored-users/${id}`);
      return res.data.data;
    },
  });
};

export const useCurrentMonitoredUserMetricsQuery = (
  id: string,
  duration: string
) => {
  return useQuery<Record<string, number>>({
    queryKey: ["monitored-user-metrics", id],
    queryFn: async () => {
      const res = await apiClient.get(
        `/monitored-users/${id}/metrics?date=${duration}`
      );
      return res.data.data;
    },
  });
};

export const useEditMonitoredUserMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-monitored-user", id],
    mutationFn: async (data: AccountName) => {
      return await apiClient.put(`/monitored-users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-user", id] });
      queryClient.resetQueries({ queryKey: ["monitored-users"] });
    },
  });
};

export const useCreateMonitoredUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-monitored-user"],
    mutationFn: async (data: NewAccountType): Promise<MonitoredUserData> => {
      const res = await apiClient.post(`/monitored-users/`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-users"] });
    },
  });
};

export const useDeleteMonitoredUserMutation = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-monitored-user", id],
    mutationFn: async () => {
      return await apiClient.delete(`/monitored-users/${id}`);
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-users"] });
    },
  });
};
