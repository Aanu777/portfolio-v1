"use client";

import {
  Bot,
  Briefcase,
  Code,
  Cpu,
  Mic,
  Shield,
} from "lucide-react";

import RadialOrbitalTimeline, {
  type TimelineItem,
} from "@/components/ui/radial-orbital-timeline";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "KreativeKangaroo",
    date: "CURRENT",
    category: "PROFESSIONAL WORK",
    content:
      "Agency work focused on applied AI and client-facing automation, including intelligent call workflows, knowledge-driven responses, speech systems, and external API integrations.",
    icon: Briefcase,
    relatedIds: [2, 3],
    status: "active",
    energy: 100,
  },

  {
    id: 2,
    title: "AI Systems",
    date: "CURRENT",
    category: "ARTIFICIAL INTELLIGENCE",
    content:
      "Building AI workflows around language models, retrieval, vector search, knowledge bases, structured reasoning, and autonomous research systems.",
    icon: Bot,
    relatedIds: [1, 3, 4],
    status: "active",
    energy: 92,
  },

  {
    id: 3,
    title: "Voice AI",
    date: "BUILT",
    category: "CONVERSATIONAL SYSTEMS",
    content:
      "Built real-time conversational call systems combining speech recognition, text-to-speech, telephony, AI reasoning, and internal knowledge retrieval.",
    icon: Mic,
    relatedIds: [1, 2],
    status: "built",
    energy: 88,
  },

  {
    id: 4,
    title: "Cybersecurity",
    date: "CURRENT",
    category: "SECURITY ENGINEERING",
    content:
      "Building security-focused software including phishing and email analysis with VELTRIXA, alongside web vulnerability scanning and security-oriented interfaces.",
    icon: Shield,
    relatedIds: [2, 5],
    status: "active",
    energy: 90,
  },

  {
    id: 5,
    title: "Software",
    date: "CURRENT",
    category: "SOFTWARE ENGINEERING",
    content:
      "Creating interactive products and engineering tools across Next.js, TypeScript, Python, APIs, automation, and purpose-built application interfaces.",
    icon: Code,
    relatedIds: [4, 6],
    status: "active",
    energy: 84,
  },

  {
    id: 6,
    title: "Systems",
    date: "EXPLORING",
    category: "LOW-LEVEL ENGINEERING",
    content:
      "Going deeper into operating-system engineering, low-level architecture, QEMU, C, Rust, x86-64 concepts, memory, drivers, and kernel design.",
    icon: Cpu,
    relatedIds: [5],
    status: "exploring",
    energy: 74,
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="
        relative
        overflow-hidden
        bg-[#050507]
        px-5
        py-28
        text-[#F2F0F3]

        sm:px-8
        md:px-12
        lg:px-16
        lg:py-40
      "
    >
      {/* Top separator */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1450px]
        "
      >
        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------- */}

        <div
          className="
            grid
            gap-10

            lg:grid-cols-[1.2fr_0.8fr]
            lg:items-end
          "
        >
          <div>
            <p
              className="
                mb-8

                font-mono
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/35

                sm:text-xs
              "
            >
              07 / EXPERIENCE
            </p>

            <h2
              className="
                max-w-[8ch]

                text-[clamp(4rem,8vw,9rem)]
                font-semibold
                leading-[0.8]
                tracking-[-0.08em]
              "
            >
              THE PATH
              <br />

              <span
                className="
                  text-[#A81732]
                "
              >
                SO FAR.
              </span>
            </h2>
          </div>

          <div className="lg:pb-3">
            <div
              className="
                mb-6
                h-px
                w-12
                bg-[#A81732]
              "
            />

            <p
              className="
                max-w-[34rem]

                text-[15px]
                leading-[1.75]
                text-[#85818C]

                sm:text-base
                lg:text-[17px]
              "
            >
              Not a traditional résumé timeline.
              These are the areas that have shaped
              what I build — professional work,
              intelligent systems, security,
              software and the lower-level systems
              I am continuing to explore.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------
            ORBITAL EXPERIENCE MAP
        ------------------------------------------------- */}

        <div
          className="
            mt-16
            overflow-hidden

            rounded-[28px]

            border
            border-white/[0.07]

            bg-[#050507]

            shadow-[0_45px_140px_rgba(0,0,0,0.5)]

            lg:mt-24
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-white/[0.06]

              px-5
              py-4

              sm:px-7
            "
          >
            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/25

                sm:text-[9px]
              "
            >
              INTERACTIVE ENGINEERING MAP
            </span>

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/20

                sm:text-[9px]
              "
            >
              SELECT A NODE
            </span>
          </div>

          <RadialOrbitalTimeline
            timelineData={timelineData}
            centerLabel="AYAN"
            centerSubLabel="ENGINEERING PATH"
          />
        </div>
      </div>
    </section>
  );
}