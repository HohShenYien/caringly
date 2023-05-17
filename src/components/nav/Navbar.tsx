import Button from "@/components/buttons/Button";
import Link from "next/link";
import Logo from "../branding/Logo";
import { clsx } from "@mantine/core";
import useNavStyles from "./useNavStyles";
import openModal from "@/utils/modals/openModal";
import { loginModal, registerModal } from "@/utils/modals/types";

const Navbar = () => {
  const navStyle = useNavStyles();

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
              openModal({
                type: loginModal,
                innerProps: {},
              });
            }}
          >
            Sign in
          </Button>
          <Button
            className="text-lg"
            onClick={() => {
              openModal({
                type: registerModal,
                innerProps: {},
              });
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
