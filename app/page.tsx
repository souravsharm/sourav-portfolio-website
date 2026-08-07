import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Snapshot } from "@/components/sections/Snapshot";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd(), websiteJsonLd()]) }}
      />
      <Hero />
      <Snapshot />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </>
  );
}
