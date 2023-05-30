import useSession from "@/features/Auth/useSession";
import { Avatar, Skeleton, TextInput, Tooltip } from "@mantine/core";
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
import { helpModal, newAccountModal } from "@/utils/modals/types";
import openModal from "@/utils/modals/openModal";
import UserProfileCard from "@/features/User/UserProfileCard";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";
import { notifications } from "@mantine/notifications";
import { useMonitoredUsersQuery } from "@/api/monitored-users";
import { useMemo, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const { data, isSuccess } = useMonitoredUsersQuery();
  const [filter, setFilter] = useState("");

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    const regexPatterns = filter
      .split(" ")
      .map((val) => new RegExp(`.*${val}.*`, "i"));
    return data.filter((val) =>
      regexPatterns.some((reg) => reg.test(val.name))
    );
  }, [data, filter]);

  const signout = () => {
    router.push("/");
    deleteCookie("authToken", { path: "/", domain: "localhost" });
    notifications.show({
      message: "Logged out successfully",
      color: "green",
    });
  };
  return (
    <div className="fixed bottom-0 left-0 top-0 z-50 flex w-80 border-r-[1px] border-r-gray-200 bg-white">
      <div className="flex w-20 flex-col items-center border-r-[1px] border-r-indigo-200 bg-indigo-50 px-2 py-2">
        <UserProfileCard />
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
            <Button
              variant="default"
              className="!rounded-md !px-1"
              onClick={signout}
            >
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
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          />
        </div>

        <div className="relative flex-1 space-y-2 overflow-auto px-2 py-2">
          {isSuccess && (
            <Tooltip label="New Watching Account">
              <div className="fixed bottom-4 left-64">
                <Button
                  className="px-1"
                  onClick={() =>
                    openModal({
                      type: newAccountModal,
                      innerProps: {},
                    })
                  }
                >
                  <AiOutlinePlus size="28" />
                </Button>
              </div>
            </Tooltip>
          )}

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
          {isSuccess
            ? filteredData.map((val) => {
                return (
                  <SidebarNavButton
                    key={val.id}
                    href={`/app/users/${val.id}`}
                    text={val.name}
                    avatar={val.name}
                  />
                );
              })
            : Array(6)
                .fill(0)
                .map((_, ind) => {
                  return <Skeleton key={ind} h={50} w={223.2} />;
                })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
