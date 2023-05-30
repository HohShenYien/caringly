import apiClient from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { MonitoredUserData } from "./monitored-users";

export const useWatchlistQuery = () => {
  return useQuery<Record<string, number>>({
    queryKey: ["my-watchlist"],
    queryFn: async () => {
      const res = await apiClient.get("/stats/watchlist");
      return res.data.data;
    },
  });
};

type MetricsType = {
  depression: MonitoredUserData[];
  suicide: MonitoredUserData[];
  posts: Record<string, number>;
  total: number;
};

export const useMetricsQuery = () => {
  return useQuery<MetricsType>({
    queryKey: ["my-metrics"],
    queryFn: async () => {
      const res = await apiClient.get("/stats/metrics?date=month");
      return res.data.data;
    },
  });
};
