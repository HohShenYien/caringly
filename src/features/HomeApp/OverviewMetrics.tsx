import { clsx, RingProgress, Skeleton } from "@mantine/core";

interface MetricsMeta {
  key: string;
  title: string;
  color: string;
}

const metricsMeta: MetricsMeta[] = [
  {
    key: "scanned",
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
    color: "bg-red-100 shadow-red-200/50",
  },
];

interface MetersMeta {
  title: string;
  key: string;
  color: string;
}

const metersMeta: MetersMeta[] = [
  {
    title: "Accounts Suspected of Depression",
    key: "depression",
    color: "bg-green-100 shadow-green-200/50",
  },
  {
    title: "Accounts Suspected of Suicide",
    key: "suicide",
    color: "bg-emerald-100 shadow-emerald-200/50",
  },
];

const OverviewMetrics = () => {
  const isLoading = false;
  return (
    <div>
      <h2 className="mb-3 text-xl">
        Metrics <span className="text-zinc-400">(Past 1 Month)</span>
      </h2>
      <div className="ml-8 flex space-x-6">
        {isLoading
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
                  <div className="text-4xl font-semibold">5</div>
                </div>
              );
            })}
      </div>
      <div className="ml-8 mt-10 flex space-x-6">
        {isLoading
          ? metersMeta.map((_, key) => (
              <Skeleton key={key} width="390" height="249" />
            ))
          : metersMeta.map((data) => {
              return (
                <div
                  key={data.key}
                  className={clsx(
                    "w-[390px] space-y-2 rounded-md py-6 text-center shadow-md",
                    data.color
                  )}
                >
                  <h4 className="text-md">{data.title}</h4>
                  <div className="flex !h-[120px] justify-center overflow-hidden">
                    {/* TODO: max-value 50, do some magic */}
                    <RingProgress
                      size={240}
                      thickness={24}
                      sections={[
                        { value: 40, color: "cyan" },
                        { value: 15, color: "orange" },
                        { value: 15, color: "grape" },
                      ]}
                      className="-rotate-90 "
                    />
                  </div>
                  <div className="text-4xl font-semibold">5</div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default OverviewMetrics;
