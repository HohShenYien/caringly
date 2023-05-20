import AccountMetrics from "@/features/Account/AccountMetrics";
import UserAccounts from "@/features/Account/UserAccounts";
import getAppLayout from "@/layouts/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import openModal from "@/utils/modals/openModal";
import { deleteUserModal, editAccountNameModal } from "@/utils/modals/types";
import { ActionIcon, Select, Tooltip } from "@mantine/core";
import { useRouter } from "next/router";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const periods = [
  {
    label: "Past 1 Week",
    value: "week",
  },
  {
    label: "Past 1 Month",
    value: "month",
  },
  {
    label: "Past 1 Year",
    value: "year",
  },
  {
    label: "All Time",
    value: "all",
  },
];

const AccountPage: NextPageWithLayout = () => {
  const { id } = useRouter().query as { id: string };
  const currentUser = { name: "Leo Wai Yei", id: id };
  return (
    <div>
      <div className="mb-4 flex ">
        <div className="flex flex-1 items-center space-x-2">
          <h1 className="text-4xl">Leo Wai Yei</h1>
          <Tooltip label="Edit Name">
            <ActionIcon
              color="indigo"
              size="lg"
              onClick={() =>
                openModal({
                  type: editAccountNameModal,
                  innerProps: { user: currentUser },
                })
              }
            >
              <FiEdit size="20" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Delete">
            <ActionIcon
              color="red"
              size="lg"
              onClick={() =>
                openModal({
                  type: deleteUserModal,
                  innerProps: { user: currentUser },
                })
              }
            >
              <RiDeleteBin2Line size="20" />
            </ActionIcon>
          </Tooltip>
        </div>
        <Select
          data={periods}
          defaultValue={"month"}
          classNames={{ wrapper: "!max-w-[200px]" }}
        />
      </div>
      <AccountMetrics id={id} />
      <h2 className="mt-16 text-2xl">Social Media Accounts</h2>
      <UserAccounts id={id} />
    </div>
  );
};

AccountPage.getLayout = getAppLayout;

export default AccountPage;
