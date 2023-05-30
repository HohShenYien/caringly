import { NextPageWithLayout } from "@/pages/_app";
import getDefaultLayout from "@/layouts/BaseLayout";
import { useEffect, useState } from "react";
import useSession from "@/features/Auth/useSession";
import { useRouter } from "next/router";
import { useUserQuery } from "@/api/auth";
import SplashScreen from "./SplashScreen";
import { getCookie } from "cookies-next";
// import SplashScreen from "../screens/SplashScreen";

interface AuthGuardProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

const AuthGuard = ({ Component, pageProps }: AuthGuardProps) => {
  const session = useSession();
  const query = useUserQuery();
  const router = useRouter();

  const getLayout = Component.getLayout || getDefaultLayout;
  const isAuthenticated =
    session.status == "authenticated" || session.user != undefined;
  const canBrowse = Component.isPublic || isAuthenticated;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (!showSplash && !canBrowse && !getCookie("authToken")) {
      router.push("/");
    }
  }, [canBrowse, showSplash, router]);

  // This is so that splash screen is only show once
  useEffect(() => {
    if (session.status != "loading") {
      setShowSplash(false);
    }
  }, [session, showSplash]);

  if (showSplash) {
    return <SplashScreen />;
  }
  if (!canBrowse) {
    return <></>;
  }

  return <>{getLayout(<Component {...pageProps} />)}</>;
};

export default AuthGuard;
