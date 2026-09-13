"use client";

import { Skills } from "@/components/ui/skills-showcase";

export default function SkillsSection() {
  return (
    <section
      id="stack"
      className="
        relative
        overflow-hidden
        bg-[#050507]
        px-5
        py-28
        text-white

        sm:px-8
        md:px-12
        lg:px-16
        lg:py-40
      "
    >
      {/* Background atmosphere */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_85%_25%,rgba(124,58,237,0.08),transparent_28%),radial-gradient(circle_at_12%_75%,rgba(168,23,50,0.06),transparent_26%)]
        "
      />

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
          grid
          max-w-[1450px]
          gap-16

          lg:grid-cols-[0.8fr_1.2fr]
          lg:gap-24
        "
      >
        {/* Intro */}

        <div>
          <p
            className="
              mb-7
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/35

              sm:text-xs
            "
          >
            05 / STACK
          </p>

          <h2
            className="
              max-w-[8ch]

              text-[clamp(3.5rem,7vw,8rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
              text-[#F2F0F3]
            "
          >
            TOOLS I BUILD WITH.
          </h2>

          <p
            className="
              mt-8
              max-w-[32rem]
              text-[15px]
              leading-[1.7]
              text-[#77737F]

              sm:text-base
            "
          >
            A growing stack shaped by the systems,
            security tools, AI projects and web
            experiences I actually build.
          </p>
        </div>

        {/* Real 21st Skills Showcase interaction */}

        <div className="flex items-center">
          <Skills />
        </div>
      </div>
    </section>
  );
}