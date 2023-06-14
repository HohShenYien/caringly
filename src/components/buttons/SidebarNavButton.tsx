import { Avatar, Tooltip, clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons/lib";

type LogoType = (isActive: boolean) => IconType;

type SidebarNavButtonProps = {
  href: string;
  text: string;
  logo?: LogoType;
  avatar?: string;
} & ({ logo: LogoType; avatar?: never } | { logo?: never; avatar: string });

const SidebarNavButton = ({
  href,
  text,
  logo,
  avatar,
}: SidebarNavButtonProps) => {
  const pathname = useRouter().asPath;
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
            {logo ? (
              CurrentLogo && (
                <CurrentLogo
                  size="26"
                  className={clsx({ "text-indigo-800": !isActive })}
                />
              )
            ) : (
              <Avatar
                size="sm"
                className="rounded-full shadow-sm shadow-indigo-800/50"
                classNames={{
                  placeholder: clsx("rounded-full", {
                    "bg-indigo-600 text-indigo-200": isActive,
                    "bg-indigo-200 text-indigo-600": !isActive,
                  }),
                }}
              >
                {avatar.charAt(0)}
              </Avatar>
            )}
            <span className="line-clamp-1 flex-1">{text}</span>
          </div>
        </Tooltip>
      </Link>
    </div>
  );
};

export default SidebarNavButton;
