import { DangerousUserModalProps } from "@/components/modals/DangerousUserModal";
import { MonitoredUserPostsProps } from "@/components/modals/MonitoredUserPosts";
import { UserAccount, UserSocialMediaAccountProps } from "@/features/Account";
import { UserAccountProps } from "@/features/Account";
import { EditAccountModalProps } from "@/features/Account/EditAccountModal";
import { ScanResultProps } from "@/features/Scan/ScanResultModal";
import { ScanUserResultProps } from "@/features/Scan/ScanUserResultModal";
import { ContextModalProps, modals } from "@mantine/modals";
import { ReactElement } from "react";

export const loginModal = "Login Modal";
export const registerModal = "Register Modal";
export const helpModal = "Help Modal";
export const editUserModal = "Edit User Modal";
export const newAccountModal = "New Account Modal";
export const editAccountNameModal = "Edit Account Name Modal";
export const deleteUserModal = "Delete User Modal";
export const deleteAccountModal = "Delete Account Modal";
export const editAccountModal = "Edit Account Modal";
export const addAccountModal = "Add Account Modal";
export const dangerousUserModal = "Dangerous User Modal";
export const scanResultModal = "Scan Result Modal";
export const scanningModal = "Scanning Modal";
export const scanUserResultModal = "Scan User Result Modal";
export const monitoredUserPostsModal = "Monitored User Posts Modal";

export type ModalType =
  | typeof loginModal
  | typeof registerModal
  | typeof helpModal
  | typeof editUserModal
  | typeof newAccountModal
  | typeof editAccountNameModal
  | typeof deleteUserModal
  | typeof deleteAccountModal
  | typeof editAccountModal
  | typeof addAccountModal
  | typeof dangerousUserModal
  | typeof scanResultModal
  | typeof scanningModal
  | typeof scanUserResultModal
  | typeof monitoredUserPostsModal;

export type ModalInnerProps = {
  [key in
    | typeof loginModal
    | typeof registerModal
    | typeof helpModal
    | typeof editUserModal
    | typeof newAccountModal
    | typeof scanningModal]: {};
} & {
  [key in
    | typeof editAccountNameModal
    | typeof deleteUserModal]: UserAccountProps;
} & {
  [key in typeof addAccountModal]: {
    userId: string;
  };
} & {
  [key in
    | typeof editAccountModal
    | typeof deleteAccountModal]: EditAccountModalProps;
} & {
  [key in typeof dangerousUserModal]: DangerousUserModalProps;
} & {
  [key in typeof scanResultModal]: ScanResultProps;
} & {
  [key in typeof scanUserResultModal]: ScanUserResultProps;
} & {
  [key in typeof monitoredUserPostsModal]: MonitoredUserPostsProps;
};

export type MantineModal<P extends Record<string, any> = {}> = ((
  props: ContextModalProps<P>
) => ReactElement) & {
  properties?: Omit<
    Parameters<typeof modals.openContextModal>[0],
    "modal" | "innerProps"
  >;
};
