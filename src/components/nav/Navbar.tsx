import Button from "@/components/buttons/Button";
import Link from "next/link";
import Logo from "../branding/Logo";
import { clsx } from "@mantine/core";
import useNavStyles from "./useNavStyles";
import openModal from "@/utils/modals/openModal";
import { loginModal, registerModal } from "@/utils/modals/types";
import useSession from "@/features/Auth/useSession";
import { useRouter } from "next/router";

const Navbar = () => {
  const navStyle = useNavStyles();
  const router = useRouter();
  const { status } = useSession();
  const authAction = (modal: typeof loginModal | typeof registerModal) => {
    if (status === "authenticated") {
      router.push("/app");
    } else {
      openModal({
        type: modal,
        innerProps: {},
      });
    }
  };

  return (
    <div
      className={clsx(
        "fixed left-0 right-0 top-0 z-20 flex flex-row justify-center py-4"
      )}
      style={{ ...navStyle }}
    >
      <nav className="flex max-w-6xl flex-1 flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo size={48} />
            <h1 className="text-3xl font-bold text-indigo-600">aringly</h1>
          </div>
        </Link>
        <div className="space-x-4">
          <Button
            variant="subtle"
            className="text-lg"
            onClick={() => {
              authAction(loginModal);
            }}
          >
            Sign in
          </Button>
          <Button
            className="text-lg"
            onClick={() => {
              authAction(registerModal);
            }}
          >
            Register
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
