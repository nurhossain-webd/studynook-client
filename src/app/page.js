import Image from "next/image";
import Hero from "./Components/Hero";
import AvailableRooms from "./Components/AvailableRooms";


export default function Home() {
  return (
    <>
      <Hero />
      <AvailableRooms />
    </>
  );
}
