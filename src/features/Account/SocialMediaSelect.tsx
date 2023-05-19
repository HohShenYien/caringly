import { Avatar, Select } from "@mantine/core";
import Image from "next/image";
import { ComponentProps, forwardRef, useMemo } from "react";

interface SocialMediaItem extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  value: string;
}

const socialMedia: SocialMediaItem[] = [
  {
    image: "/icons/facebook.png",
    label: "Facebook",
    value: "facebook",
  },

  {
    image: "/icons/insta2.png",
    label: "Instagram",
    value: "instagram",
  },
  {
    image: "/icons/reddit.png",
    label: "Reddit",
    value: "reddit",
  },
  {
    image: "/icons/twitter.png",
    label: "Twitter",
    value: "twitter",
  },
];

const SelectItem = forwardRef<HTMLDivElement, SocialMediaItem>(
  ({ image, label, ...others }: SocialMediaItem, ref) => (
    <div ref={ref} {...others}>
      <div className="flex items-center space-x-2">
        <Image src={image} alt={label} width="20" height="20" />

        <div>{label}</div>
      </div>
    </div>
  )
);
SelectItem.displayName = "SocialMediaSelectItem";

type SocialMediaSelectProps = Omit<
  ComponentProps<typeof Select>,
  "data" | "defaultValue" | "itemComponent"
>;

const SocialMediaSelect = (props: SocialMediaSelectProps) => {
  const selectedIcon = useMemo(() => {
    const cur = props.value ?? "facebook";
    const selected = socialMedia.find((val) => val.value == cur)!;
    return (
      <Image src={selected.image} alt={selected.label} width="20" height="20" />
    );
  }, [props.value]);

  return (
    <Select
      itemComponent={SelectItem}
      data={socialMedia}
      defaultValue="facebook"
      icon={selectedIcon}
      variant="filled"
      {...props}
    />
  );
};

export default SocialMediaSelect;
