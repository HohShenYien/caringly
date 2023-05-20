import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { TextInput } from "@mantine/core";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import { UserAccountProps } from ".";

const accountNameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

type AccountName = z.infer<typeof accountNameSchema>;

const EditAccountNameModal: MantineModal<UserAccountProps> = ({
  innerProps: { user },
}) => {
  const form = useForm<AccountName>({
    validate: zodResolver(accountNameSchema),
    initialValues: {
      name: user?.name ?? "",
    },
  });

  const submitForm = (data: AccountName) => {
    console.log(data);
  };
  return (
    <ModalLayout title="Edit Username">
      <form
        className="flex flex-1 flex-col justify-between space-y-2"
        onSubmit={form.onSubmit(submitForm)}
      >
        <TextInput
          required
          label="Name"
          placeholder="John Doe"
          variant="filled"
          {...form.getInputProps("name")}
        />

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
          <Button fullWidth className="rounded-md py-1" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

EditAccountNameModal.properties = {
  size: "xs",
};

export default EditAccountNameModal;
