import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { useCallback, useState } from "react";
import Button from "../buttons/Button";
import Image from "next/image";

const howItWorks = [
  {
    image: "/guides/step-1.jpg",
    description:
      "Create a new monitoring user for your loved one using the button on bottom left.",
    title: "Create",
  },
  {
    image: "/guides/step-2.png",
    description:
      "Copy the profile URL of the social media account of your loved one",
    title: "Copy",
  },
  {
    image: "/guides/step-3.png",
    description:
      "We will send an alert email if any of the posts is found to be depressive or suicidal.",
    title: "Alert",
  },
];

const HelpModal: MantineModal = () => {
  const TRANSITION_DURATION = 200;
  const [embla, setEmbla] = useState<Embla | undefined>(undefined);
  const [cur, setCur] = useState(0);

  const scrollPrev = () => {
    if (embla) {
      embla.scrollPrev();
      setCur(cur - 1);
    }
  };
  const scrollNext = () => {
    if (embla) {
      embla.scrollNext();
      setCur(cur + 1);
    }
  };

  // TODO: Update guides here
  useAnimationOffsetEffect(embla, TRANSITION_DURATION);
  return (
    <ModalLayout padding={false}>
      <Carousel
        maw={440}
        mx="auto"
        withIndicators
        getEmblaApi={setEmbla}
        withControls={false}
        draggable={false}
        height={440}
      >
        {howItWorks.map((data, idx) => (
          <Carousel.Slide key={idx}>
            <div>
              <Image
                src={data.image}
                alt="text"
                height="400"
                width="400"
                className="h-[340px] w-full object-cover"
              />
              <div className="px-4 pt-1">
                <h3 className="text-xl font-semibold">{data.title}</h3>
                <div className="text-zinc-500">{data.description}</div>
              </div>
            </div>
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="flex items-center space-x-4 px-4 py-2">
        <div className="flex-1">
          {cur > 0 && (
            <Button
              variant="outline"
              onClick={scrollPrev}
              fullWidth
              className="rounded-md py-1"
            >
              Previous
            </Button>
          )}
        </div>
        <div>{cur + 1} of 3</div>
        <div className="flex-1">
          {cur < 2 && (
            <Button onClick={scrollNext} className="rounded-md py-1" fullWidth>
              Next
            </Button>
          )}
        </div>
      </div>
    </ModalLayout>
  );
};

export default HelpModal;
