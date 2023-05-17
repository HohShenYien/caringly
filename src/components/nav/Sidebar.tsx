import useSession from "@/features/Auth/useSession";
import { Avatar, TextInput, Tooltip } from "@mantine/core";
import { AiFillHome, AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { RiQrScan2Line, RiQrScanFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import SidebarNavButton from "@/components/buttons/SidebarNavButton";
import Button from "@/components/buttons/Button";

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
        <Tooltip label="Logout" position="top">
          <div>
            <Button variant="subtle" className="!px-2">
              <BiLogOut size="24" />
            </Button>
          </div>
        </Tooltip>
      </div>
      <div className="relative flex max-h-screen flex-1 flex-col overflow-hidden">
        <div className="px-2 py-3">
          <TextInput
            placeholder="Search Account"
            rightSection={<AiOutlineSearch />}
            variant="filled"
          />
        </div>

        <div className="relative space-y-2 overflow-auto px-2 py-2">
          <Button>+</Button>
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
