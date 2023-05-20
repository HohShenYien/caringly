import Image from "next/image";
import { clsx, Skeleton } from "@mantine/core";

interface WatchMeta {
  logo: string;
  key: string;
  title: string;
  color: string;
}

const watchData: WatchMeta[] = [
  {
    logo: "/icons/facebook.png",
    key: "facebook",
    title: "Facebook",
    color: "bg-blue-200 shadow-blue-300/50",
  },
  {
    logo: "/icons/instagram.png",
    key: "instagram",
    title: "Instagram",
    color: "bg-violet-200 shadow-violet-300/50",
  },
  {
    logo: "/icons/reddit.png",
    key: "reddit",
    title: "Reddit",
    color: "bg-rose-200 shadow-rose-300/50",
  },
  {
    logo: "/icons/twitter.png",
    key: "twitter",
    title: "Twitter",
    color: "bg-sky-200 shadow-sky-300/50",
  },
];

const WatchList = () => {
  const isLoading = false;
  return (
    <div>
      <h2 className="mb-3 text-xl">My Watchlist</h2>
      <div className="ml-8 flex space-x-6">
        {isLoading
          ? watchData.map((_, key) => (
              <Skeleton key={key} width="180" height="80" />
            ))
          : watchData.map((data) => {
              return (
                <div
                  key={data.key}
                  className={clsx(
                    "flex w-[180px] space-x-3 rounded-md px-4 py-2 shadow-md",
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
                    <div className="text-3xl font-semibold">5</div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default WatchList;
