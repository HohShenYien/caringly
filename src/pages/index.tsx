import Footer from "@/components/footers/Footer";
import Hero from "@/features/Landing/Hero";
import HowItWorks from "@/features/Landing/HowItWorks";
import Stats from "@/features/Landing/Stats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <HowItWorks />
      <Footer />
    </div>
  );
}
