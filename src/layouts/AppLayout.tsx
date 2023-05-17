import Sidebar from "@/components/nav/Sidebar";
import { ReactElement, ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="bg-gray-50/50">
      <div
        id="background-image"
        className="absolute bottom-0 left-0 right-0 top-0 opacity-5"
        style={{ backgroundImage: "url(/img/background.png)" }}
      ></div>
      <Sidebar />
      <main className="relative ml-72 flex h-screen justify-center px-12 py-4">
        {children}
      </main>
    </div>
  );
};

export default function getAppLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
}
