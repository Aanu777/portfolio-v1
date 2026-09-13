"use client";

import { ScrollChoreography } from "@/components/ui/scroll-choreography";

export default function ProjectChoreography() {
  return (
    <section
      id="work"
      className="relative bg-[#050507]"
    >
      <ScrollChoreography
        images={{
          topLeft: "/projects/veltrixa/preview3.png",
          topRight: "/projects/research-agent/preview2.png",
          bottomLeft: "/projects/imus-music-room/preview1.png",
          bottomRight: "/projects/web-vuln-scanner/preview4.png",
        }}
      />
    </section>
  );
}
