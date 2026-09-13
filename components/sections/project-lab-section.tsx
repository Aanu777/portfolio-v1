"use client";

import {
  CollectionSurfer,
  type CollectionItem,
} from "@/components/ui/collection-surfer";

const projects: CollectionItem[] = [
  {
    id: 1,
    title: "VELTRIXA",
    eyebrow: "AI · CYBERSECURITY",
    image: "/projects/veltrixa/card.png",
  },

  {
    id: 2,
    title: "Autonomous Research Agent",
    eyebrow: "AI · AUTONOMOUS SYSTEMS",
    image: "/projects/research-agent/card.png",
  },

  {
    id: 3,
    title: "Imu's Music Room",
    eyebrow: "WEB · INTERACTIVE",
    image: "/projects/imus-music-room/card.png",
  },

  {
    id: 4,
    title: "Web-Vuln Scanner",
    eyebrow: "CYBERSECURITY · WEB SECURITY",
    image: "/projects/web-vuln-scanner/card.png",
  },
];

export default function ProjectLabSection() {
  return (
    <section id="lab">
      <CollectionSurfer
        items={projects}
        variant="uplift"
        eyebrow="EXPERIMENTS / BUILDS"
        heading="PROJECT LAB"
        scrollLabel="scroll down"
      />
    </section>
  );
}