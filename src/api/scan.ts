import { Post } from "@/features/Post/types";
import apiClient from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Prediction = {
  prediction: "suicide" | "neutral" | "depression";
  probability: number;
};

export const useScanTextMutation = () => {
  return useMutation({
    mutationKey: ["scan"],
    mutationFn: async (data: { text: string }): Promise<Prediction> => {
      const res = await apiClient.post(`/scan/`, data);
      return res.data;
    },
  });
};

export const useScanUserMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["scan"],
    mutationFn: async (): Promise<Post[]> => {
      const res = await apiClient.get(`/monitored-users/${id}/scan`);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ["monitored-user-metrics", id] });
    },
  });
};
