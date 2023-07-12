import getAppLayout from "@/layouts/AppLayout";
import { NextPageWithLayout } from "../_app";
import Lottie from "react-lottie";
import { useMemo, useState } from "react";
import { Textarea } from "@mantine/core";
import Button from "@/components/buttons/Button";
import Head from "next/head";
import { useScanTextMutation } from "@/api/scan";
import openModal from "@/utils/modals/openModal";
import { scanResultModal } from "@/utils/modals/types";

const AppDashboard: NextPageWithLayout = () => {
  const [text, setText] = useState("");
  const scanMutation = useScanTextMutation();

  const scan = () => {
    scanMutation.mutateAsync({ text }).then((res) => {
      openModal({
        type: scanResultModal,
        innerProps: {
          status: res.prediction,
          text,
        },
      });
    });
  };

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <Head>
        <title>Scan | Caringly</title>
      </Head>
      <h1 className="mb-4 text-4xl">Scan</h1>
      <div className="pointer-events-none -mt-12 flex h-[500px] justify-center">
        <Lottie
          options={{
            loop: true,
            path: "/animations/scanning.json",
            autoplay: false,
          }}
          height="250"
          width="250"
          isPaused={!scanMutation.isLoading}
        />
      </div>
      <div className="-mt-16 text-center text-xl">
        {scanMutation.isLoading
          ? "Scanning..."
          : "We will scan the texts for any sign of depression or suicide"}
      </div>
      <div className="flex-1" />
      <div className="flex items-end space-x-2">
        <Textarea
          className="flex-1"
          variant="filled"
          minRows={1}
          maxRows={4}
          placeholder="Paste or type the texts that you suspect to be depressed or suicidal"
          value={text}
          onChange={(evt) => setText(evt.currentTarget.value)}
          onKeyDown={(evt) => {
            if (
              evt.key === "Enter" &&
              !evt.shiftKey &&
              !scanMutation.isLoading
            ) {
              evt.preventDefault();
              scan();
            }
          }}
          autosize
        />
        <Button
          className="rounded-md py-[10px]"
          onClick={scan}
          loading={scanMutation.isLoading}
          disabled={text.length == 0}
        >
          Check
        </Button>
      </div>
    </div>
  );
};

AppDashboard.getLayout = getAppLayout;

export default AppDashboard;
