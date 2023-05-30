import { AddAccount } from "@/features/Account/AddAccountModal";
import { EditAccount } from "@/features/Account/EditAccountModal";
import apiClient from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateSocialAccountMutation = (accountId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["new-social-account", accountId],
    mutationFn: async (data: AddAccount) => {
      return await apiClient.post(
        `/monitored-users/${accountId}/social-accounts`,
        data
      );
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-user", accountId] });
    },
  });
};

export const useEditSocialAccountMutation = (
  userId: string,
  accountId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["edit-social-account", accountId],
    mutationFn: async (data: EditAccount) => {
      return await apiClient.put(
        `/monitored-users/${userId}/social-accounts/${accountId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-user", userId] });
    },
  });
};

export const useDeleteSocialAccountMutation = (
  userId: string,
  accountId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-social-account", accountId],
    mutationFn: async () => {
      return await apiClient.delete(
        `/monitored-users/${userId}/social-accounts/${accountId}`
      );
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-user", userId] });
    },
  });
};
