import {
  useCurrentMonitoredUserQuery,
  useDeleteMonitoredUserMutation,
} from "@/api/monitored-users";
import AccountMetrics from "@/features/Account/AccountMetrics";
import UserAccounts from "@/features/Account/UserAccounts";
import getAppLayout from "@/layouts/AppLayout";
import { NextPageWithLayout } from "@/pages/_app";
import openModal from "@/utils/modals/openModal";
import { deleteUserModal, editAccountNameModal } from "@/utils/modals/types";
import { ActionIcon, Select, Skeleton, Tooltip } from "@mantine/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const { data, isSuccess } = useCurrentMonitoredUserQuery(id);
  const [duration, setDuration] = useState<string>("month");
  return (
    <div>
      <Head>
        <title>{data?.name ?? "Loading"} | Caringly</title>
      </Head>
      <div className="mb-4 flex ">
        <div className="flex flex-1 items-center space-x-2">
          <h1 className="text-4xl">
            {isSuccess ? data.name : <Skeleton w={255} h={40} />}
          </h1>
          {isSuccess && (
            <>
              <Tooltip label="Edit Name">
                <ActionIcon
                  color="indigo"
                  size="lg"
                  onClick={() =>
                    openModal({
                      type: editAccountNameModal,
                      innerProps: { user: data },
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
                      innerProps: { user: data },
                    })
                  }
                >
                  <RiDeleteBin2Line size="20" />
                </ActionIcon>
              </Tooltip>
            </>
          )}
        </div>
        <Select
          data={periods}
          defaultValue={"month"}
          value={duration}
          classNames={{ wrapper: "!max-w-[200px]" }}
          onChange={(val) => setDuration(val ?? "month")}
        />
      </div>
      <AccountMetrics id={id} duration={duration} />
      <h2 className="mt-16 text-2xl">Social Media Accounts</h2>
      <UserAccounts id={id} isLoading={!isSuccess} accounts={data?.accounts} />
    </div>
  );
};

AccountPage.getLayout = getAppLayout;

export default AccountPage;
