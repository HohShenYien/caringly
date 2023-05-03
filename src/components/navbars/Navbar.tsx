import Button from "@/components/buttons/Button";
import Link from "next/link";
import Logo from "../branding/Logo";

const Navbar = () => {
  return (
    <div className="fixed left-0 right-0 top-0 flex flex-row justify-center py-4">
      <nav className="flex max-w-6xl flex-1 flex-row items-center justify-between">
        <Link href="/">
          <div className="flex items-center">
            <Logo size={48} />
            <h1 className="text-3xl font-bold text-indigo-600">aringly</h1>
          </div>
        </Link>
        <div className="space-x-4">
          <Button variant="subtle" className="text-lg">
            Sign in
          </Button>
          <Button className="text-lg">Register</Button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
