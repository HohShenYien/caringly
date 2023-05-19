import { MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "light",
  components: {
    Tooltip: {
      classNames: { tooltip: "text-xs bg-indigo-400" },
    },
    Tabs: {
      classNames: {
        tab: "data-[active=true]:!border-indigo-600 hover:border-indigo-400 data-[active=true]:!text-indigo-600 data-[active=true]:font-semibold hover:text-indigo-500",
      },
    },
    Select: {
      classNames: {
        item: "data-[selected=true]:!bg-indigo-400",
        input: "!pr-0",
        wrapper: "max-w-[130px]"
      }
    }
  },
};

export default mantineTheme;
