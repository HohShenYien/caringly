import { ReactNode } from "react";
import { clsx } from "@mantine/core";

interface ModalLayoutProps {
  title?: string;
  children: ReactNode;
  minHeight?: boolean;
  padding?: boolean;
}

const ModalLayout = ({
  title,
  children,
  minHeight = true,
  padding = true,
}: ModalLayoutProps) => {
  return (
    <div>
      {title && (
        <div className="border-b-solid border-b-[1px] border-b-gray-300 px-10 py-2 text-center">
          <div className="text-lg font-semibold">{title}</div>
        </div>
      )}
      <div
        className={clsx(
          "overflow-y-auto",
          {
            "px-4 py-4": padding,
            "max-h-[95vh]": !title,
            "max-h-[70vh]": title,
            "min-h-[40vh]": minHeight,
          },
          "flex flex-col"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
