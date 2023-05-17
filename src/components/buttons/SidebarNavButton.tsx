import { Tooltip, clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons/lib";

type LogoType = (isActive: boolean) => IconType;
type LeftSideType = (isActive: boolean) => JSX.Element;

type SidebarNavButtonProps = {
  href: string;
  text: string;
  logo?: LogoType;
  leftSide?: LeftSideType;
} & (
  | { logo: LogoType; leftSide?: never }
  | { logo?: never; leftSide: LeftSideType }
);

const SidebarNavButton = ({
  href,
  text,
  logo,
  leftSide,
}: SidebarNavButtonProps) => {
  const pathname = useRouter().pathname;
  const isActive = pathname == href;
  const CurrentLogo = logo?.(isActive);
  return (
    <div>
      <Link href={href}>
        <Tooltip
          label={text.length > 15 && text}
          position="bottom-end"
          disabled={text.length <= 15}
        >
          <div
            className={clsx("flex space-x-2 rounded-md px-2 py-3", {
              "bg-indigo-100 text-indigo-600": isActive,
              "hover:bg-indigo-50": !isActive,
            })}
          >
            {logo
              ? CurrentLogo && <CurrentLogo size="24" />
              : leftSide(isActive)}
            <span className="line-clamp-1 flex-1">{text}</span>
          </div>
        </Tooltip>
      </Link>
    </div>
  );
};

export default SidebarNavButton;
