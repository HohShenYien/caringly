import { Skeleton, clsx } from "@mantine/core";
import { HasUserId } from ".";
import { useCurrentMonitoredUserMetricsQuery } from "@/api/monitored-users";
import { useEffect } from "react";
import openModal from "@/utils/modals/openModal";
import { monitoredUserPostsModal } from "@/utils/modals/types";

interface MetricsMeta {
  key: string;
  title: string;
  color: string;
  active: string;
  target: "all" | "depression" | "suicide";
}

const metricsMeta: MetricsMeta[] = [
  {
    key: "total",
    title: "Posts Scanned",
    color: "bg-blue-200 shadow-blue-200/50",
    active: "hover:bg-blue-100",
    target: "all",
  },
  {
    key: "depression",
    title: "Depression Detected",
    color: "bg-orange-200 shadow-orange-200/50",
    active: "hover:bg-orange-100",
    target: "depression",
  },
  {
    key: "suicide",
    title: "Suicide Detected",
    color: "bg-red-200 shadow-red-200/50",
    active: "hover:bg-red-100",
    target: "suicide",
  },
];

interface AccountMetricsProps extends HasUserId {
  duration: string;
}

const AccountMetrics = ({ id, duration }: AccountMetricsProps) => {
  const {
    isSuccess,
    data: metrics,
    refetch,
  } = useCurrentMonitoredUserMetricsQuery(id, duration);
  useEffect(() => {
    refetch();
  }, [duration, refetch]);
  return (
    <div className="ml-8 mt-6 flex justify-center space-x-12">
      {!isSuccess
        ? metricsMeta.map((_, key) => (
            <Skeleton key={key} width="250" height="145" />
          ))
        : metricsMeta.map((data) => {
            return (
              <div
                key={data.key}
                className={clsx(
                  "w-[250px] space-y-4 rounded-md py-8 text-center shadow-md transition-all",
                  data.color,
                  { [`${data.active} cursor-pointer`]: metrics[data.key] > 0 }
                )}
                onClick={() => {
                  if (metrics[data.key] > 0) {
                    openModal({
                      type: monitoredUserPostsModal,
                      innerProps: {
                        duration,
                        id,
                        type: data.target,
                      },
                    });
                  }
                }}
              >
                <h4 className="text-md">{data.title}</h4>
                <div className="text-4xl font-semibold">
                  {metrics[data.key]}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default AccountMetrics;
