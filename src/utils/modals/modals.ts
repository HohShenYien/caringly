import LoginModal from "@/features/Auth/LoginModal";
import {
  MantineModal,
  ModalType,
  helpModal,
  loginModal,
  registerModal,
} from "./types";
import RegisterModal from "@/features/Auth/RegisterModal";
import HelpModal from "@/components/modals/HelpModal";

export const modals: Record<ModalType, MantineModal<any>> = {
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal,
  [helpModal]: HelpModal,
};
