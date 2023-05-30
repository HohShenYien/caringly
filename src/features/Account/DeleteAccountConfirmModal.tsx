import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import { EditAccountModalProps } from "./EditAccountModal";
import { useDeleteSocialAccountMutation } from "@/api/social-accounts";
import { notifications } from "@mantine/notifications";

const DeleteAccountConfirmModal: MantineModal<EditAccountModalProps> = ({
  innerProps: { account, userId },
}) => {
  const mutation = useDeleteSocialAccountMutation(userId, account.id);
  const confirmDelete = () => {
    mutation.mutateAsync().then(() => {
      notifications.show({
        message: "Account Deleted Successfully",
        color: "green",
      });
      modals.closeAll();
    });
  };

  return (
    <ModalLayout title="Delete Account" minHeight={false}>
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="mb-8">
          Are you sure to delete the{" "}
          <span className="font-semibold capitalize">{account.type}</span>{" "}
          account <span className="font-semibold">{account.username}</span>?
        </div>

        <div className="!mt-5 flex space-x-2">
          <Button
            fullWidth
            className="rounded-md py-1"
            onClick={() => modals.closeAll()}
            variant="outline"
            gray
          >
            Cancel
          </Button>
          <Button fullWidth className="rounded-md py-1" onClick={confirmDelete}>
            Confirm
          </Button>
        </div>
      </div>
    </ModalLayout>
  );
};

DeleteAccountConfirmModal.properties = {
  size: "xs",
};

export default DeleteAccountConfirmModal;
