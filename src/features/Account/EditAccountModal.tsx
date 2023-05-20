import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { TextInput } from "@mantine/core";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import { UserSocialMediaAccountProps } from ".";
import SocialMediaSelect from "./SocialMediaSelect";

const editAccountSchema = z.object({
  type: z.string(),
  url: z.string().url(),
});

type EditAccount = z.infer<typeof editAccountSchema>;

const EditAccountModal: MantineModal<UserSocialMediaAccountProps> = ({
  innerProps: { account },
}) => {
  const form = useForm<EditAccount>({
    validate: zodResolver(editAccountSchema),
    initialValues: {
      type: account.type,
      url: account.url,
    },
  });

  const submitForm = (data: EditAccount) => {
    console.log(data);
  };
  return (
    <ModalLayout title="Edit Account">
      <form
        className="flex flex-1 flex-col justify-between space-y-2"
        onSubmit={form.onSubmit(submitForm)}
      >
        <SocialMediaSelect
          {...form.getInputProps(`type`)}
          withLabel
          classNames={{ wrapper: "!max-w-[unset]" }}
        />
        <TextInput
          label="Social Media URL"
          className="flex-1"
          placeholder="https://facebook.com/u/john.doe"
          variant="filled"
          {...form.getInputProps(`url`)}
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

export default EditAccountModal;
