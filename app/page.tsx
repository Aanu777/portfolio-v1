import HeroSection from "@/components/sections/hero-section";
import ProjectChoreography from "@/components/sections/project-choreography";
import CaseStudiesSection from "@/components/sections/case-studies-section";
import ProjectLabSection from "@/components/sections/project-lab-section";
import AboutSection from "@/components/sections/about-section";
import SkillsSection from "@/components/sections/skills-section";
import GithubSection from "@/components/sections/github-section";
import ExperienceSection from "@/components/sections/experience-section";
import ContactSection from "@/components/sections/contact-section";
import FooterSection from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="overflow-x-clip bg-[#050507]">
      <HeroSection />
      <ProjectChoreography />
      <CaseStudiesSection />
      <ProjectLabSection />
      <AboutSection />
      <SkillsSection />
      <GithubSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}