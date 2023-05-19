import LoginModal from "@/features/Auth/LoginModal";
import {
  MantineModal,
  ModalType,
  editUserModal,
  helpModal,
  loginModal,
  newAccountModal,
  registerModal,
} from "./types";
import RegisterModal from "@/features/Auth/RegisterModal";
import HelpModal from "@/components/modals/HelpModal";
import EditUserModal from "@/features/User/EditUserModal";
import NewAccountModal from "@/features/Account/NewAccountModal";

export const modals: Record<ModalType, MantineModal<any>> = {
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal,
  [helpModal]: HelpModal,
  [editUserModal]: EditUserModal,
  [newAccountModal]: NewAccountModal,
};
