import Button from "@/components/buttons/Button";
import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import { TextInput, ActionIcon, Avatar, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FiDelete } from "react-icons/fi";
import { z } from "zod";
import SocialMediaSelect from "./SocialMediaSelect";
import { modals } from "@mantine/modals";

const newAccount = z.object({
  name: z.string().min(1, "Name is required"),
  accounts: z.array(
    z.object({
      type: z.string(),
      url: z.string().url("Not a valid URL"),
    })
  ),
});
type NewAccountType = z.infer<typeof newAccount>;

const NewAccountModal: MantineModal = () => {
  const form = useForm({
    validate: zodResolver<NewAccountType>(newAccount),
    initialValues: {
      name: "",
      accounts: [
        {
          type: "facebook",
          url: "",
        },
      ],
    },
  });

  const accounts = form.values.accounts.map((account, index) => (
    <div key={index} className="flex items-start space-x-1">
      <SocialMediaSelect {...form.getInputProps(`accounts.${index}.type`)} />
      <TextInput
        className="flex-1"
        placeholder="https://facebook.com/u/john.doe"
        variant="filled"
        {...form.getInputProps(`accounts.${index}.url`)}
      />
      <ActionIcon
        onClick={() => form.removeListItem("accounts", index)}
        disabled={form.values.accounts.length === 1}
        className="mt-1 !py-2"
        color="red"
      >
        <FiDelete size="1rem" />
      </ActionIcon>
    </div>
  ));

  const onSubmit = (data: NewAccountType) => {
    console.log(data);
  };

  return (
    <ModalLayout title="New Watching Account">
      <form
        className="flex h-full flex-1 flex-col space-y-4"
        onSubmit={form.onSubmit(onSubmit)}
      >
        <TextInput
          label="Name"
          placeholder="John Doe"
          variant="filled"
          {...form.getInputProps("name")}
        />
        <div className="flex-1">
          <p className="text-sm font-medium">Social Media Accounts</p>
          <div className="space-y-1">{accounts}</div>
          <div className="flex justify-center">
            <Button
              className="mx-auto mt-2 rounded-md py-1"
              onClick={() =>
                form.insertListItem("accounts", { url: "", type: "facebook" })
              }
            >
              Add Account
            </Button>
          </div>
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
          <Button fullWidth className="rounded-md py-1" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default NewAccountModal;