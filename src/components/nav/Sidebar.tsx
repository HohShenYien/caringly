import useSession from "@/features/Auth/useSession";
import { Avatar, TextInput, Tooltip } from "@mantine/core";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import { RiQrScan2Line, RiQrScanFill } from "react-icons/ri";
import { BiLogOut, BiQuestionMark } from "react-icons/bi";
import SidebarNavButton from "@/components/buttons/SidebarNavButton";
import Button from "@/components/buttons/Button";
import Logo from "../branding/Logo";
import { helpModal } from "@/utils/modals/types";
import openModal from "@/utils/modals/openModal";

const Sidebar = () => {
  const { user } = useSession();
  return (
    <div className="fixed bottom-0 left-0 top-0 flex w-80 border-r-[1px] border-r-gray-200 bg-white">
      <div className="flex w-20 flex-col items-center border-r-[1px] border-r-indigo-200 bg-indigo-50 px-2 py-2">
        <Avatar
          radius="xl"
          className="shadow-sm"
          classNames={{
            placeholder:
              "bg-rose-200 transition-all hover:bg-rose-300 text-rose-600",
          }}
        >
          {user?.username?.charAt(0)}
        </Avatar>
        <div className="flex-1" />
        <Tooltip label="Help" position="top">
          <div className="mb-2">
            <Button
              variant="default"
              className="!rounded-md !px-1"
              onClick={() =>
                openModal({
                  type: helpModal,
                  innerProps: {},
                })
              }
            >
              <BiQuestionMark size="24" />
            </Button>
          </div>
        </Tooltip>
        <Tooltip label="Logout" position="top">
          <div>
            <Button variant="default" className="!rounded-md !px-1">
              <BiLogOut size="24" />
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className="relative flex max-h-screen flex-1 flex-col overflow-hidden">
        <div className="px-2 py-3">
          <div className="mb-4 flex items-center justify-center">
            <Logo size={36} />
            <h1 className="text-xl font-bold text-indigo-600">aringly</h1>
          </div>
          <TextInput
            placeholder="Search Account"
            rightSection={<AiOutlineSearch />}
            variant="filled"
          />
        </div>

        <div className="relative flex-1 space-y-2 overflow-auto px-2 py-2">
          <Button className="fixed bottom-4 left-64 px-1">
            <AiOutlinePlus size="28" />
          </Button>
          <SidebarNavButton
            href="/app"
            text="Home"
            logo={(isActive) => (isActive ? AiFillHome : AiOutlineHome)}
          />
          <SidebarNavButton
            href="/app/scan"
            text="Scan Text"
            logo={(isActive) => (isActive ? RiQrScanFill : RiQrScan2Line)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;