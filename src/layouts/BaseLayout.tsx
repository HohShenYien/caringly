import Navbar from "@/components/navbars/Navbar";
import { ReactElement, ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default function getDefaultLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}
