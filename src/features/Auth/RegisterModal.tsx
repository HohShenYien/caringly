import { useRegisterMutation } from "@/api/auth";
import Button from "@/components/buttons/Button";
import ModalLayout from "@/components/modals/ModalLayout";
import { login } from "@/utils/auth";
import openModal from "@/utils/modals/openModal";
import { MantineModal, loginModal } from "@/utils/modals/types";
import { TextInput, PasswordInput, Divider } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import { z } from "zod";

export interface RegisterModalProps {}

const registerSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Password is required"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export type RegisterType = z.infer<typeof registerSchema>;

const RegisterModal: MantineModal<RegisterModalProps> = () => {
  const mutation = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterType>({
    validate: zodResolver(registerSchema),
  });

  const submitForm = (data: RegisterType) => {
    mutation
      .mutateAsync(data)
      .then((res) => {
        login(
          res.data.auth_token,
          "Registered Successfully! Redirecting to the app..."
        );
        setTimeout(() => {
          modals.closeAll();
          router.push("/app");
        }, 500);
      })
      .catch((err) => {
        notifications.show({
          message: err.response.data.message,
          color: "red",
        });
      });
  };

  return (
    <ModalLayout padding={false}>
      <div className="grid h-[500px] grid-cols-12">
        <div className="relative col-span-6 h-full">
          <Image alt="Holding Hands" src="/img/auth/register.png" fill />
        </div>
        <div className="col-span-6 space-y-4 px-6 py-8">
          <h2 className="text-2xl font-semibold">Join Caringly</h2>
          <form className="space-y-2" onSubmit={form.onSubmit(submitForm)}>
            <TextInput
              label="Username"
              placeholder="John Doe"
              variant="filled"
              type="text"
              {...form.getInputProps("username")}
            />
            <TextInput
              label="Email"
              placeholder="example@mail.com"
              variant="filled"
              type="email"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              variant="filled"
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label="Password Confirmation"
              variant="filled"
              {...form.getInputProps("confirmPassword")}
            />

            <Button
              fullWidth
              className="!mt-5 py-1"
              type="submit"
              loading={mutation.isLoading}
            >
              Sign Up
            </Button>
          </form>
          <div className="!mt-6 text-center text-sm">
            <p className="text-center text-zinc-500">
              {"Already have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() =>
                openModal({
                  type: loginModal,
                  innerProps: {},
                  closeAll: true,
                })
              }
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};

RegisterModal.properties = {
  withCloseButton: false,
  size: "lg",
};

export default RegisterModal;
