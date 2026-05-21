import Image from "next/image";
import Hero from "./Components/Hero";
import AvailableRooms from "./Components/AvailableRooms";
import WhyChoose from "./Components/WhyChoose";
import HowItWorks from "./Components/HowItWorks";
export const metadata = {
  title: "StudyNook – Home",
};


export default function Home() {
  return (
    <>
      <Hero />
      <AvailableRooms />
      <WhyChoose />
      <HowItWorks />

    </>
  );
}
