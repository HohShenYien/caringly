import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import Lottie from "react-lottie";
import { Post as PostType } from "../Post/types";
import Post from "../Post/Post";

export interface ScanUserResultProps {
  status: "depression" | "suicide" | "neutral";
  post?: PostType;
  name: string;
}

const getStatus = (status: "depression" | "suicide" | "neutral") => {
  if (status == "depression") {
    return "Depressive";
  }
  if (status == "suicide") {
    return "Suicidal";
  }
  return "Normal";
};

const getMessage = (
  status: "depression" | "suicide" | "neutral",
  name: string
) => {
  if (status == "depression") {
    return (
      <>
        <div className="text-lg font-semibold">
          Please reach out and offer support to {name}.
        </div>
        <div>
          You may want to contact the local helpline:{" "}
          <a href="tel:0376272929" className="link">
            0376272929
          </a>
          (
          <a
            href="https://www.befrienders.org.my/"
            target="_blank"
            className="link"
          >
            Befrienders
          </a>
          )
        </div>
      </>
    );
  }
  if (status == "suicide") {
    return (
      <>
        <div className="text-lg font-semibold">
          Please immediately approach {name}!
        </div>
        <div>You might want to contact the police right away for help!</div>
      </>
    );
  }
  return (
    <>
      <div>
        All of the {"person's"} posts appear to be normal, but please contact
        professionals if you still suspect that {name} is depressive
      </div>
    </>
  );
};

const ScanUserResultModal: MantineModal<ScanUserResultProps> = ({
  innerProps: { status, post, name },
}) => {
  return (
    <ModalLayout>
      <div className="relative z-[1] text-center text-2xl">
        <span className="font-bold">{getStatus(status)}</span>
      </div>
      {post && (
        <>
          <div className="relative z-[1] mt-1 text-center">
            The following post is found to be:{" "}
            <span className="font-bold">{getStatus(status)}</span>!
          </div>
          <Post post={post} />
        </>
      )}
      <div className="pointer-events-none relative z-0 -mt-4 flex h-[340px] justify-center">
        <Lottie
          options={{
            loop: false,
            path: `/animations/${status}.json`,
            autoplay: true,
          }}
          height="250"
          width="250"
        />
      </div>

      <div className="relative z-[1] -mt-6 space-y-2 text-center">
        {getMessage(status, name)}
      </div>
    </ModalLayout>
  );
};

export default ScanUserResultModal;
