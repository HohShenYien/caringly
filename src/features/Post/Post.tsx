import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { Post as PostType } from "./types";

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
  return (
    <div
      className={`p-2 ${getColor(
        post.category
      )} relative z-[1] mt-2 line-clamp-2 rounded-lg text-sm text-gray-800 shadow-sm`}
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
        </div>
        <a
          href={post.url}
          target="_blank"
          className="link flex items-center space-x-1"
        >
          <span>Open the post</span> <FiExternalLink />
        </a>
      </div>
      <div className="px-4">{post?.text}</div>
    </div>
  );
};

export default Post;
