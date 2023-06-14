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

export type SocialMediaUserData = {
  type: SocialMediaType;
  url: string;
  id: string;
  username: string;
  profile_pic_url: string;
};

type UserAccountsProps = HasUserId & {
  accounts?: SocialMediaUserData[];
  isLoading: boolean;
};

const UserAccounts = ({ accounts, isLoading, id }: UserAccountsProps) => {
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
              {accounts?.length == 0 ? (
                <tr>
                  <td colSpan={4} align="center">
                    No Account yet...
                  </td>
                </tr>
              ) : (
                accounts?.map((account) => (
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
                      <a href={account.url} target="_blank" className="link">
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
                                  userId: id,
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
                                  userId: id,
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
                ))
              )}
              <tr>
                <td colSpan={4} align="center">
                  <Button
                    className="rounded-md py-1"
                    onClick={() => {
                      openModal({
                        type: addAccountModal,
                        innerProps: {
                          userId: id,
                        },
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
