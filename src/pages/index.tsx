import Footer from "@/components/footers/Footer";
import Hero from "@/features/Landing/Hero";
import HowItWorks from "@/features/Landing/HowItWorks";
import Stats from "@/features/Landing/Stats";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <Head>
        <title>Caringly</title>
      </Head>
      <Hero />
      <Stats />
      <HowItWorks />
      <Footer />
    </div>
  );
};

Home.isPublic = true;

export default Home;
