import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HeroBackground } from "@/components/hero-background";
import { Experience } from "@/components/experience";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Honors } from "@/components/honors";
import { Recommendations } from "@/components/recommendations";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent overflow-x-hidden text-foreground selection:bg-primary/30 relative">
      <HeroBackground />
      {/* Global Ambient Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Honors />
        <Publications />
        <Recommendations />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
