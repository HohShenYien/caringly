import { ContextModalProps, modals } from "@mantine/modals";
import { ReactElement } from "react";

export const loginModal = "Login Modal";
export const registerModal = "Register Modal";
export const helpModal = "Help Modal";

export type ModalType =
  | typeof loginModal
  | typeof registerModal
  | typeof helpModal;

export type ModalInnerProps = {
  [key in typeof loginModal | typeof registerModal | typeof helpModal]: {};
};

export type MantineModal<P extends Record<string, any> = {}> = ((
  props: ContextModalProps<P>
) => ReactElement) & {
  properties?: Omit<
    Parameters<typeof modals.openContextModal>[0],
    "modal" | "innerProps"
  >;
};
