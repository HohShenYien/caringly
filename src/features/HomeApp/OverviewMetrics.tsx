import { useMetricsQuery } from "@/api/stats";
import openModal from "@/utils/modals/openModal";
import { dangerousUserModal } from "@/utils/modals/types";
import { clsx, RingProgress, Skeleton } from "@mantine/core";

interface MetricsMeta {
  key: string;
  title: string;
  color: string;
}

const metricsMeta: MetricsMeta[] = [
  {
    key: "total",
    title: "Posts Scanned",
    color: "bg-blue-100 shadow-blue-200/50",
  },
  {
    key: "depression",
    title: "Depression Detected",
    color: "bg-orange-100 shadow-orange-200/50",
  },
  {
    key: "suicide",
    title: "Suicide Detected",
    color: "bg-zinc-200 shadow-zinc-300/50",
  },
];

interface MetersMeta {
  title: string;
  key: "depression" | "suicide";
  color: string;
  alert: string;
}

const metersMeta: MetersMeta[] = [
  {
    title: "Accounts Suspected of Depression",
    key: "depression",
    color: "bg-green-100 shadow-green-200/50",
    alert: "bg-yellow-100 shadow-yellow-200/50",
  },
  {
    title: "Accounts Suspected of Suicide",
    key: "suicide",
    color: "bg-emerald-100 shadow-emerald-200/50",
    alert: "bg-red-100 shadow-red-200/50",
  },
];

const OverviewMetrics = () => {
  const { data: metrics, isSuccess } = useMetricsQuery();
  return (
    <div>
      <h2 className="mb-3 text-xl">
        Metrics <span className="text-zinc-400">(Past 1 Month)</span>
      </h2>
      <div className="ml-8 flex space-x-6">
        {!isSuccess
          ? metricsMeta.map((_, key) => (
              <Skeleton key={key} width="250" height="145" />
            ))
          : metricsMeta.map((data) => {
              return (
                <div
                  key={data.key}
                  className={clsx(
                    "w-[250px] space-y-4 rounded-md py-8 text-center shadow-md",
                    data.color
                  )}
                >
                  <h4 className="text-md">{data.title}</h4>
                  <div className="text-4xl font-semibold">
                    {metrics.posts[data.key]}
                  </div>
                </div>
              );
            })}
      </div>
      <div className="ml-8 mt-6 flex space-x-6">
        {!isSuccess
          ? metersMeta.map((_, key) => (
              <Skeleton key={key} width="390" height="249" />
            ))
          : metersMeta.map((data) => {
              const cur = metrics[data.key];
              return (
                <div
                  key={data.key}
                  className={clsx(
                    "w-[390px] space-y-2 rounded-md py-6 text-center shadow-md",
                    {
                      [data.alert]: cur.length >= 1,
                      [data.color]: cur.length == 0,
                    },
                    {
                      "cursor-pointer transition-all hover:shadow-lg":
                        cur.length > 0,
                    }
                  )}
                  onClick={() => {
                    cur.length > 0 &&
                      openModal({
                        type: dangerousUserModal,
                        innerProps: {
                          accounts: cur,
                          type: data.key,
                        },
                      });
                  }}
                >
                  <h4 className="text-md">{data.title}</h4>
                  <div className="flex !h-[120px] justify-center overflow-hidden">
                    {/* TODO: max-value 50, do some magic */}
                    <RingProgress
                      size={240}
                      thickness={24}
                      sections={[
                        {
                          value: (cur.length / metrics.total) * 50,
                          color: "red",
                        },
                        {
                          value: 100 - (cur.length / metrics.total) * 50,
                          color: "#BFDBFE",
                        },
                      ]}
                      className="-rotate-90 "
                    />
                  </div>
                  <div className="text-4xl font-semibold">{cur.length}</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default OverviewMetrics;
