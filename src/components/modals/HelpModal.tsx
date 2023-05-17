import { MantineModal } from "@/utils/modals/types";
import ModalLayout from "./ModalLayout";
import { Carousel, Embla, useAnimationOffsetEffect } from "@mantine/carousel";
import { useCallback, useState } from "react";
import Button from "../buttons/Button";

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
        height={400}
      >
        <Carousel.Slide>
          <div>
            <img
              src="https://design.mindsphere.io/patterns-chapters/guided-tour/images/guided-tour-usage-general-tour-success-02.png"
              alt="text"
            />
            <div className="px-4 py-2">Hello</div>
          </div>
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            src="https://design.mindsphere.io/patterns-chapters/guided-tour/images/guided-tour-usage-general-tour-success-02.png"
            alt="text"
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <img
            src="https://design.mindsphere.io/patterns-chapters/guided-tour/images/guided-tour-usage-general-tour-success-02.png"
            alt="text"
          />
        </Carousel.Slide>
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
