import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NextPage } from "next";
import { ReactElement } from "react";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import AuthGuard from "@/components/auth/AuthGuard";
import { modals } from "@/utils/modals/modals";
import mantineTheme from "@/styles/theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => JSX.Element;
} & {
  isPublic?: boolean;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <ModalsProvider modals={modals}>
          <AuthGuard Component={Component} pageProps={pageProps} />
        </ModalsProvider>
        <Notifications />
      </MantineProvider>
    </>
  );
}
