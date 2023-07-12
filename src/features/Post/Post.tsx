import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { Post as PostType } from "./types";
import { Popover, Tooltip, clsx } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface PostProp {
  post: PostType;
}

const getColor = (status: "depression" | "suicide" | "neutral") => {
  if (status == "depression") {
    return "bg-orange-100";
  }
  if (status == "suicide") {
    return "bg-red-100";
  }
  return "bg-green-100";
};

const Post = ({ post }: PostProp) => {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={250} opened={opened} classNames={{ dropdown: "p-0" }}>
      <Popover.Target>
        <div
          className={`p-2 ${getColor(
            post.category
          )} relative z-[1] mt-2 line-clamp-2 rounded-lg text-sm text-gray-800 shadow-sm`}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <div className="mb-2 flex">
            <div className="flex flex-1 items-center">
              <Image
                src={`/icons/${post.type}.png`}
                alt={post.type}
                width="24"
                height="24"
              />
              <span className="ml-2 font-semibold capitalize">{post.type}</span>
              <span
                className={clsx(
                  "ml-2 rounded-full border-2 border-solid px-2 text-xs",
                  {
                    "border-green-600 text-green-600":
                      post.category === "neutral",
                    "border-red-600 text-red-600": post.category === "suicide",
                    "border-orange-600 text-orange-600":
                      post.category === "depression",
                  }
                )}
              >
                {post.category}
              </span>
            </div>
            <a
              href={post.url}
              target="_blank"
              className="link flex items-center space-x-1"
            >
              <span>Open the post</span> <FiExternalLink />
            </a>
          </div>
          <div className="line-clamp-2 px-4">{post?.text}</div>
        </div>
      </Popover.Target>
      <Popover.Dropdown className="pointer-events-none">
        <div className="bg-indigo-100 p-2 text-sm">{post.text}</div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default Post;
