import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { TextInput } from "@mantine/core";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";
import SocialMediaSelect from "./SocialMediaSelect";
import { useCreateSocialAccountMutation } from "@/api/social-accounts";
import { notifications } from "@mantine/notifications";
import { socialMediaAccountSchema } from ".";

export type AddAccount = z.infer<typeof socialMediaAccountSchema>;

const AddAccountModal: MantineModal<{ userId: string }> = ({
  innerProps: { userId },
}) => {
  const mutation = useCreateSocialAccountMutation(userId);

  const form = useForm<AddAccount>({
    validate: zodResolver(socialMediaAccountSchema),
    initialValues: {
      type: "twitter",
      url: "",
    },
  });

  const submitForm = (data: AddAccount) => {
    mutation
      .mutateAsync(data)
      .then(() => {
        notifications.show({
          message: "Account Created",
          color: "green",
        });
        modals.closeAll();
      })
      .catch((err) => {
        notifications.show({
          message:
            err?.response?.data?.message ??
            "Something went wrong, please try again",
          color: "red",
        });
      });
  };
  return (
    <ModalLayout title="Add New Account">
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
            disabled={mutation.isLoading}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            className="rounded-md py-1"
            type="submit"
            loading={mutation.isLoading}
          >
            Submit
          </Button>
        </div>
      </form>
    </ModalLayout>
  );
};

export default AddAccountModal;
