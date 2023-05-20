import { Skeleton, clsx } from "@mantine/core";
import { HasUserId } from ".";

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

const AccountMetrics = ({}: HasUserId) => {
  const isLoading = false;
  return (
    <div className="ml-8 mt-6 flex justify-center space-x-12">
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
  );
};

export default AccountMetrics;
