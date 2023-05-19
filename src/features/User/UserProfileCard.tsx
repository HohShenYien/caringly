import { Avatar, HoverCard, Popover } from "@mantine/core";
import useSession from "../Auth/useSession";
import Button from "@/components/buttons/Button";
import { useState } from "react";
import openModal from "@/utils/modals/openModal";
import { editUserModal } from "@/utils/modals/types";

const UserProfileCard = () => {
  const { user } = useSession();
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      offset={{ mainAxis: -40, crossAxis: 100 }}
      classNames={{ dropdown: "!left-2 shadow-sm" }}
      transitionProps={{ transition: "slide-down" }}
      opened={opened}
      onChange={setOpened}
    >
      <Popover.Target>
        <Avatar
          radius="xl"
          className="shadow-sm"
          classNames={{
            placeholder:
              "bg-rose-200 transition-all hover:bg-rose-300 text-rose-600 cursor-pointer",
          }}
          onClick={() => setOpened(true)}
        >
          {user?.username?.charAt(0)}
        </Avatar>
      </Popover.Target>
      <Popover.Dropdown>
        <div className="flex items-center space-x-4">
          <Avatar
            size="xl"
            className="rounded-full shadow-sm"
            classNames={{
              placeholder: "bg-rose-200 text-rose-600",
            }}
          >
            {user?.username?.charAt(0)}
          </Avatar>
          <div className="">
            <div className="text-lg font-semibold">{user?.username}</div>
            <div className="text-sm">{user?.email}</div>
            <Button
              variant="link"
              className="px-0"
              onClick={() => {
                setOpened(false);
                openModal({
                  type: editUserModal,
                  innerProps: {},
                });
              }}
            >
              Configure
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default UserProfileCard;
