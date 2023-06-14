import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";
import { useMonitoredUserPostsQuery } from "@/api/monitored-users";
import { Skeleton } from "@mantine/core";
import Post from "@/features/Post/Post";

export interface MonitoredUserPostsProps {
  id: string;
  type: "depression" | "suicide" | "all";
  duration: string;
}

const MonitoredUserPosts: MantineModal<MonitoredUserPostsProps> = ({
  innerProps: { id, type, duration },
}) => {
  const query = useMonitoredUserPostsQuery(id, type, duration);
  return (
    <ModalLayout
      padding={false}
      titleNode={
        <div className="font-semibold">
          {type == "all" ? "All Posts" : `Posts suspected of ${type}`}
        </div>
      }
    >
      <div className="px-2 pb-6">
        {query.isSuccess
          ? query.data.map((post, index) => <Post key={index} post={post} />)
          : new Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} height="68" width="356" />
              ))}
      </div>
    </ModalLayout>
  );
};

MonitoredUserPosts.properties = {
  size: "sm",
};

export default MonitoredUserPosts;
