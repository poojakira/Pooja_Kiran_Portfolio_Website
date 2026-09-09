import Hero from "@/components/sections/Hero";
import Systems from "@/components/sections/Systems";
import Flagships from "@/components/sections/Flagships";
import Lab from "@/components/sections/Lab";
import Research from "@/components/sections/Research";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Systems />
      <Flagships />
      <Lab />
      <Research />
      <About />
      <Contact />
    </>
  );
}
