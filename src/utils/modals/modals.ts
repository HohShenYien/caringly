import LoginModal from "@/features/Auth/LoginModal";
import { MantineModal, ModalType, loginModal, registerModal } from "./types";
import RegisterModal from "@/features/Auth/RegisterModal";

export const modals: Record<ModalType, MantineModal<any>> = {
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal
};
