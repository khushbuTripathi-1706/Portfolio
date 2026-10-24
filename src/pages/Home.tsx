import { Hero } from "../components/Hero";
import { FeaturedProjects, Skills, Achievements, Qualities } from "../components/Sections";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Achievements />
      <Qualities />
    </main>
  );
}
