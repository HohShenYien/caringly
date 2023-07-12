import Image from "next/image";
import { clsx, Skeleton } from "@mantine/core";
import { useWatchlistQuery } from "@/api/stats";

interface WatchMeta {
  logo: string;
  key: string;
  title: string;
  color: string;
}

const watchData: WatchMeta[] = [
  {
    logo: "/icons/instagram.png",
    key: "instagram",
    title: "Instagram",
    color: "bg-violet-200 shadow-violet-300/50",
  },
  {
    logo: "/icons/twitter.png",
    key: "twitter",
    title: "Twitter",
    color: "bg-sky-200 shadow-sky-300/50",
  },
  {
    logo: "/icons/facebook.png",
    key: "facebook",
    title: "Facebook (Soon)",
    color: "bg-blue-200 shadow-blue-300/50",
  },
];

const WatchList = () => {
  const { data: metrics, isSuccess } = useWatchlistQuery();
  return (
    <div>
      <h2 className="mb-3 text-xl">My Watchlist Accounts</h2>
      <div className="ml-8 flex space-x-6">
        {!isSuccess
          ? watchData.map((_, key) => (
              <Skeleton key={key} width="250" height="97" />
            ))
          : watchData.map((data) => {
              return (
                <div
                  key={data.key}
                  className={clsx(
                    "flex w-[250px] space-x-3 rounded-md px-4 py-4 shadow-md",
                    data.color
                  )}
                >
                  <Image
                    alt={data.title}
                    src={data.logo}
                    height="64"
                    width="64"
                    key={data.logo}
                  />
                  <div className="flex h-full flex-1 flex-col items-center justify-between">
                    <h4 className="text-sm">{data.title}</h4>
                    <div className="text-3xl font-semibold">
                      {metrics[data.key] ?? 0}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default WatchList;
