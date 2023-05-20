import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import { UserAccountProps } from ".";

const DeleteUserConfirmModal: MantineModal<UserAccountProps> = ({
  innerProps: { user },
}) => {
  return (
    <ModalLayout title="Delete User" minHeight={false}>
      <div className="flex flex-1 flex-col justify-between space-y-2">
        <div className="mb-8">
          Are you sure to delete the user{" "}
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
          <Button fullWidth className="rounded-md py-1">
            Submit
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
