"use client";

import dynamic from "next/dynamic";

import {
  CaseStudyFlipStack,
  type CaseStudyFlipItem,
} from "@/components/ui/case-study-flip-stack";

/*
 * Background Paths originally contains generated
 * client-side SVG values.
 *
 * Keeping SSR disabled prevents it from introducing
 * hydration mismatches.
 */
const BackgroundPaths =
  dynamic(
    () =>
      import(
        "@/components/kokonutui/background-paths"
      ),
    {
      ssr: false,
      loading: () => null,
    }
  );

const projects: CaseStudyFlipItem[] =
  [
    {
      number: "01",

      eyebrow:
        "AI · CYBERSECURITY",

      title:
        "Email forensics, built for machine speed.",

      description:
        "VELTRIXA is an AI-assisted phishing and email analysis platform designed to inspect suspicious messages, surface threat indicators, and present findings through a purpose-built security interface.",

      image:
        "/projects/veltrixa/preview5.png",

      imageAlt:
        "VELTRIXA phishing and email analysis interface",

      background:
        "#7A1226",

      foreground:
        "#FFF4F6",
    },

    {
      number: "02",

      eyebrow:
        "AUTONOMOUS SYSTEMS · AI",

      title:
        "Research that thinks in systems.",

      description:
        "An autonomous research workflow built around information retrieval, source analysis, structured reasoning, and clear report generation.",

      image:
        "/projects/research-agent/preview6.png",

      imageAlt:
        "Autonomous Research Agent interface",

      background:
        "#424952",

      foreground:
        "#F4F0F7",
    },

    {
      number: "03",

      eyebrow:
        "WEB · INTERACTIVE EXPERIENCE",

      title:
        "A personal music room built around Imu.",

      description:
        "A highly visual music experience built around a distinctive interface, playful interaction design, and a more personal approach to browsing and playing music.",

      image:
        "/projects/imus-music-room/preview7.png",

      imageAlt:
        "Imu's Music Room interface",

      background:
        "#D8C0E2",

      foreground:
        "#241B29",
    },

    {
      number: "04",

      eyebrow:
        "CYBERSECURITY · WEB SECURITY",

      title:
        "Turning web weaknesses into readable findings.",

      description:
        "A web vulnerability scanner designed to inspect targets, organize discovered issues by severity, and present the results through a clear security dashboard.",

      image:
        "/projects/web-vuln-scanner/preview8.png",

      imageAlt:
        "Web vulnerability scanner results dashboard",

      background:
        "#252731",

      foreground:
        "#F1F1F4",
    },
  ];

export default function CaseStudiesSection() {
  return (
    <section
      id="selected-work"
      className="
        relative
        bg-[#050507]
      "
    >
      {/*
        Background Paths stays sticky behind
        the section exactly as a background layer.

        We only force its own stock white root
        to transparent and hide its stock demo title.
      */}

      <div
        className="
          pointer-events-none

          sticky
          top-0

          z-0

          h-[100svh]
          sm:h-screen

          overflow-hidden

          opacity-[0.20]

          [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]

          [&>div]:!bg-transparent
          [&_h1]:hidden
        "
      >
        <BackgroundPaths />
      </div>

      {/*
        Negative one viewport removes the layout space
        occupied by the sticky background.

        The flip-stack's own scroll dimensions are
        untouched.
      */}

      <div
        className="
          relative
          z-10
          -mt-[100svh]
          sm:-mt-[100vh]
        "
      >
        <CaseStudyFlipStack
          items={projects}
          hint="Scroll Through"
          heading="Selected Work."
          endLabel="More Soon."
          className="
            !bg-transparent
          "
        />
      </div>
    </section>
  );
}