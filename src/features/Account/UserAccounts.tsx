import Image from "next/image";
import { HasUserId, SocialMediaType } from ".";
import { Tooltip, ActionIcon, Table, Skeleton } from "@mantine/core";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import Button from "@/components/buttons/Button";
import openModal from "@/utils/modals/openModal";
import {
  addAccountModal,
  deleteAccountModal,
  editAccountModal,
} from "@/utils/modals/types";

interface SocialMediaUserData {
  type: SocialMediaType;
  url: string;
  id: string;
  username: string;
}

const accounts: SocialMediaUserData[] = [
  {
    type: "facebook",
    username: "Riley Leo",
    url: "https://facebook.com/u/riley.leo",
    id: "abcdyef",
  },
  {
    type: "reddit",
    username: "Riley Leo",
    url: "https://reddit.com/u/riley.leo",
    id: "fbcdyef",
  },
  {
    type: "instagram",
    username: "Riley Leo",
    url: "https://instagram.com/u/riley.leo",
    id: "kbcdyef",
  },
  {
    type: "twitter",
    username: "Riley Leo",
    url: "https://twitter.com/u/riley.leo",
    id: "lfbcdyef",
  },
];

const UserAccounts = ({}: HasUserId) => {
  const isLoading = false;
  return (
    <div className="m-4 px-4">
      <Table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Username</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton height={36} width={36} circle />
                  </td>
                  <td>
                    <Skeleton height={19} width={120} />
                  </td>
                  <td>
                    <Skeleton height={19} width={200} />
                  </td>
                  <td>
                    <Skeleton height={19} width={180} />
                  </td>
                </tr>
              ))
          ) : (
            <>
              {accounts.map((account) => (
                <tr key={account.id} className="hover:bg-indigo-200/50">
                  <td>
                    <Tooltip
                      label={`${account.type
                        .charAt(0)
                        .toUpperCase()}${account.type.substring(1)}`}
                    >
                      <Image
                        src={`/icons/${account.type}.png`}
                        alt={account.type}
                        width="36"
                        height="36"
                      />
                    </Tooltip>
                  </td>

                  <td>{account.username}</td>
                  <td>
                    <a
                      href={account.url}
                      target="_blank"
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      {account.url}
                    </a>
                  </td>
                  <td>
                    <div className="flex">
                      <Tooltip label="Edit">
                        <ActionIcon
                          color="indigo"
                          size="lg"
                          onClick={() => {
                            openModal({
                              type: editAccountModal,
                              innerProps: {
                                account,
                              },
                            });
                          }}
                        >
                          <FiEdit size="20" />
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon
                          color="red"
                          size="lg"
                          onClick={() => {
                            openModal({
                              type: deleteAccountModal,
                              innerProps: {
                                account,
                              },
                            });
                          }}
                        >
                          <RiDeleteBin2Line size="20" />
                        </ActionIcon>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} align="center">
                  <Button
                    className="rounded-md py-1"
                    onClick={() => {
                      openModal({
                        type: addAccountModal,
                        innerProps: {},
                      });
                    }}
                  >
                    Add Account
                  </Button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserAccounts;
