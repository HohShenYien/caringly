import ModalLayout from "@/components/modals/ModalLayout";
import { MantineModal } from "@/utils/modals/types";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import useSession from "../Auth/useSession";
import { PasswordInput, TextInput, Checkbox } from "@mantine/core";
import Button from "@/components/buttons/Button";
import { modals } from "@mantine/modals";

const profileSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    receiveEmailNotification: z.boolean(),
    password: z.string().min(1, "Password is required"),
    newPassword: z.string().optional(),
    newPasswordConfirmation: z.string().optional(),
  })
  .superRefine(({ newPasswordConfirmation, newPassword }, ctx) => {
    if (newPasswordConfirmation !== newPassword) {
      ctx.addIssue({
        path: ["newPasswordConfirmation"],
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

type UserProfile = z.infer<typeof profileSchema>;

const EditUserModal: MantineModal = () => {
  const { user } = useSession();
  const form = useForm<UserProfile>({
    validate: zodResolver(profileSchema),
    initialValues: {
      username: user?.username ?? "",
      email: user?.email ?? "",
      password: "",
      receiveEmailNotification: user?.receiveEmail ?? true,
      newPassword: "",
      newPasswordConfirmation: "",
    },
  });

  const submitForm = (data: UserProfile) => {
    console.log(data);
  };
  return (
    <ModalLayout title="Update User Profile">
      <form className="space-y-2" onSubmit={form.onSubmit(submitForm)}>
        <TextInput
          required
          label="Username"
          placeholder="John Doe"
          variant="filled"
          {...form.getInputProps("username")}
        />
        <TextInput
          required
          label="Email"
          placeholder="example@mail.com"
          variant="filled"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          required
          label="Password"
          variant="filled"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="New Password"
          variant="filled"
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          label="New Password Confirmation"
          variant="filled"
          {...form.getInputProps("newPasswordConfirmation")}
        />
        <div className="!mt-4">
          <Checkbox
            label="I will receive email notification for alert"
            {...form.getInputProps("receiveEmailNotification")}
            defaultChecked={user?.receiveEmail ?? true}
            color="indigo"
          />
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

EditUserModal.properties = {
  size: "xs",
};

export default EditUserModal;
