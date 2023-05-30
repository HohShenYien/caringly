import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";
import { MonitoredUserData } from "@/api/monitored-users";
import SidebarNavButton from "../buttons/SidebarNavButton";
import { modals } from "@mantine/modals";
import { Avatar, Tooltip, clsx } from "@mantine/core";
import Link from "next/link";

export interface DangerousUserModalProps {
  accounts: MonitoredUserData[];
  type: "depression" | "suicide";
}

const DangerousUserModal: MantineModal<DangerousUserModalProps> = ({
  innerProps: { accounts, type },
}) => {
  const isDepressed = type == "depression";
  return (
    <ModalLayout
      padding={false}
      titleNode={
        <div className="font-semibold">{`Accounts suspected of ${type}`}</div>
      }
    >
      <div className="pb-6">
        {accounts.map((acc, index) => {
          const text = acc.name;
          return (
            <div
              key={index}
              onClick={() => {
                modals.closeAll();
              }}
            >
              <Link href={`/app/users/${acc.id}`}>
                <Tooltip
                  label={text.length > 15 && text}
                  position="bottom-end"
                  disabled={text.length <= 15}
                >
                  <div
                    className={clsx(
                      "flex items-center space-x-2 rounded-md px-4 py-3",
                      {
                        "hover:bg-red-50": !isDepressed,
                        "hover:bg-orange-50": isDepressed,
                      }
                    )}
                  >
                    <Avatar
                      size="md"
                      className="rounded-full shadow-sm shadow-yellow-800/50"
                      classNames={{
                        placeholder: clsx("rounded-full", {
                          "bg-orange-200 text-orange-600": isDepressed,
                          "bg-red-200 text-red-600": !isDepressed,
                        }),
                      }}
                    >
                      {text.charAt(0)}
                    </Avatar>
                    <span className="line-clamp-1 flex-1">{text}</span>
                  </div>
                </Tooltip>
              </Link>
            </div>
          );
        })}
      </div>
    </ModalLayout>
  );
};

DangerousUserModal.properties = {
  size: "sm",
};

export default DangerousUserModal;
