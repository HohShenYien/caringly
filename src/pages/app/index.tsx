import getAppLayout from "@/layouts/AppLayout";
import { NextPageWithLayout } from "../_app";
import WatchList from "@/features/HomeApp/WatchList";
import OverviewMetrics from "@/features/HomeApp/OverviewMetrics";
import Head from "next/head";
import { useEffect } from "react";

const AppDashboard: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Home | Caringly</title>
      </Head>
      <h1 className="mb-4 text-4xl">Home</h1>
      <div className="flex flex-col items-center space-y-12 pl-8">
        <WatchList />
        <OverviewMetrics />
      </div>
    </div>
  );
};

AppDashboard.getLayout = getAppLayout;

export default AppDashboard;
