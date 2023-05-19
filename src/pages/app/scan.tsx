import getAppLayout from "@/layouts/AppLayout";
import { NextPageWithLayout } from "../_app";
import Lottie from "react-lottie";
import { useEffect, useState } from "react";
import { Textarea } from "@mantine/core";
import Button from "@/components/buttons/Button";

const AppDashboard: NextPageWithLayout = () => {
  const [animating, setAnimating] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="flex h-full w-full flex-1 flex-col">
      <h1 className="mb-4 text-4xl">Scan</h1>
      <div className="pointer-events-none -mt-12 flex justify-center">
        <Lottie
          options={{
            loop: true,
            path: "/animations/scanning.json",
            autoplay: false,
          }}
          height="250"
          width="250"
          isPaused={!animating}
        />
      </div>
      <div className="-mt-16 text-center">
        We will scan the texts for any sign of depression or suicide
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
          autosize
        />
        <Button
          className="rounded-md py-[10px]"
          onClick={() => setAnimating(!animating)}
        >
          Check
        </Button>
      </div>
    </div>
  );
};

AppDashboard.getLayout = getAppLayout;

export default AppDashboard;
