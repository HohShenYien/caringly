import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";
import Lottie from "react-lottie";

const ScanningModal: MantineModal = () => {
  return (
    <ModalLayout>
      <div className="flex flex-col items-center justify-center">
        <div className="pointer-events-none -my-8">
          <Lottie
            options={{
              loop: true,
              path: "/animations/scanning.json",
              autoplay: true,
            }}
            height="150"
            width="150"
          />
        </div>

        <div className="-mt-6 mb-4 text-center text-xl">Scanning...</div>
      </div>
    </ModalLayout>
  );
};

ScanningModal.properties = {
  closeOnClickOutside: false,
  withCloseButton: false,
};

export default ScanningModal;
