import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import Lottie from "react-lottie";

export interface ScanResultProps {
  status: "depression" | "suicide" | "neutral";
  text: string;
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

const getColor = (status: "depression" | "suicide" | "neutral") => {
  if (status == "depression") {
    return "bg-orange-100";
  }
  if (status == "suicide") {
    return "bg-red-100";
  }
  return "bg-green-100";
};

const getMessage = (status: "depression" | "suicide" | "neutral") => {
  if (status == "depression") {
    return (
      <>
        <div className="text-lg font-semibold">
          Please reach out and offer support to the person.
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
          Please immediately approach the person!
        </div>
        <div>You might want to contact the police right away for help!</div>
      </>
    );
  }
  return (
    <>
      <div>
        The text appears to be normal, but please contact professionals if you
        still suspects the person is depressive
      </div>
    </>
  );
};

const ScanResultModal: MantineModal<ScanResultProps> = ({
  innerProps: { status, text },
}) => {
  return (
    <ModalLayout>
      <div className="text-center text-2xl">
        <span className="font-bold">{getStatus(status)}</span>
      </div>
      <div
        className={`p-1 ${getColor(
          status
        )} mt-2 line-clamp-2 rounded-lg text-center text-sm text-gray-800`}
      >
        {text}
      </div>
      <div className="relative z-[1] mt-1 text-center">
        The message is detected to be{" "}
        <span className="font-bold">{getStatus(status)}</span>!
      </div>
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
        {getMessage(status)}
      </div>
    </ModalLayout>
  );
};

export default ScanResultModal;
