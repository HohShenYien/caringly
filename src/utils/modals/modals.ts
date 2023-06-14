import LoginModal from "@/features/Auth/LoginModal";
import {
  MantineModal,
  ModalType,
  addAccountModal,
  dangerousUserModal,
  deleteAccountModal,
  deleteUserModal,
  editAccountModal,
  editAccountNameModal,
  editUserModal,
  helpModal,
  loginModal,
  monitoredUserPostsModal,
  newAccountModal,
  registerModal,
  scanResultModal,
  scanUserResultModal,
  scanningModal,
} from "./types";
import RegisterModal from "@/features/Auth/RegisterModal";
import HelpModal from "@/components/modals/HelpModal";
import EditUserModal from "@/features/User/EditUserModal";
import NewAccountModal from "@/features/Account/NewAccountModal";
import EditAccountNameModal from "@/features/Account/EditAccountNameModal";
import DeleteUserConfirmModal from "@/features/Account/DeleteUserConfirmModal";
import DeleteAccountConfirmModal from "@/features/Account/DeleteAccountConfirmModal";
import EditAccountModal from "@/features/Account/EditAccountModal";
import AddAccountModal from "@/features/Account/AddAccountModal";
import DangerousUserModal from "@/components/modals/DangerousUserModal";
import ScanResultModal from "@/features/Scan/ScanResultModal";
import ScanningModal from "@/components/modals/ScanningModal";
import ScanUserResultModal from "@/features/Scan/ScanUserResultModal";
import MonitoredUserPosts from "@/components/modals/MonitoredUserPosts";

export const modals: Record<ModalType, MantineModal<any>> = {
  [loginModal]: LoginModal,
  [registerModal]: RegisterModal,
  [helpModal]: HelpModal,
  [editUserModal]: EditUserModal,
  [newAccountModal]: NewAccountModal,
  [editAccountNameModal]: EditAccountNameModal,
  [deleteUserModal]: DeleteUserConfirmModal,
  [deleteAccountModal]: DeleteAccountConfirmModal,
  [editAccountModal]: EditAccountModal,
  [addAccountModal]: AddAccountModal,
  [dangerousUserModal]: DangerousUserModal,
  [scanResultModal]: ScanResultModal,
  [scanningModal]: ScanningModal,
  [scanUserResultModal]: ScanUserResultModal,
  [monitoredUserPostsModal]: MonitoredUserPosts,
};
