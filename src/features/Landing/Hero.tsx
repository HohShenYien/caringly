import Button from "@/components/buttons/Button";
import Section from "./Section";
import { Image } from "@mantine/core";
import openModal from "@/utils/modals/openModal";
import { registerModal } from "@/utils/modals/types";
import Link from "next/link";

const Hero = () => {
  return (
    <Section className="bg-rose-100/25 pt-16">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4 py-20">
          <div className="space-y-2">
            <p className="text-slate-400">
              Stay connected 24/7 with your loved ones
            </p>
            <div>
              <h2 className="text-6xl font-bold text-indigo-500">Be there</h2>
              <p className="text-4xl font-semibold">when they need you most</p>
            </div>
            <p className="text-slate-600">
              Be alerted immediately when signs of struggles or distress are
              identified.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              className="text-xl"
              onClick={() => {
                openModal({
                  type: registerModal,
                  innerProps: {},
                });
              }}
            >
              Get Started
            </Button>
            <Button
              className="text-xl"
              variant="outline"
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              How it Works
            </Button>
          </div>
        </div>
        <div>
          <Image src="/img/hero/hero.png" alt="Hero image" w="100%" />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
