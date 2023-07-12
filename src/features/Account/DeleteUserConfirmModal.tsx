import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import { UserAccountProps } from ".";
import { useDeleteMonitoredUserMutation } from "@/api/monitored-users";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

const DeleteUserConfirmModal: MantineModal<UserAccountProps> = ({
  innerProps: { user },
}) => {
  const router = useRouter();
  const deleteMutation = useDeleteMonitoredUserMutation(user.id);

  const confirmDelete = () => {
    deleteMutation.mutateAsync().then(() => {
      notifications.show({
        message: "Deleted successfully",
        color: "green",
      });
      modals.closeAll();
      router.push("/app");
    });
  };
  return (
    <ModalLayout title="Delete Account" minHeight={false}>
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="mb-8">
          Are you sure to delete the account{" "}
          <span className="font-semibold">{user.name}</span>?
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

DeleteUserConfirmModal.properties = {
  size: "xs",
};

export default DeleteUserConfirmModal;
