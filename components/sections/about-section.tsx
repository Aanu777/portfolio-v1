"use client";

import { useEffect, useRef } from "react";

import { CursorDrivenParticleTypography } from "@/components/ui/cursor-driven-particle-typography";
import {
  KineticTextReveal,
  type KineticTextRevealRef,
} from "@/components/ui/kinetic-text-reveal";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<KineticTextRevealRef>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headlineRef.current?.play();
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-[#050507]
        px-5
        py-24
        text-[#F2F0F3]

        sm:px-8
        md:px-12
        lg:px-16
        lg:py-32
      "
    >
      {/* Ambient background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.10),transparent_30%),radial-gradient(circle_at_12%_78%,rgba(168,23,50,0.07),transparent_28%)]
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
          via-white/15
          to-transparent
        "
      />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        {/* Section marker */}

        <div className="mb-10 flex items-center justify-between">
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/40
              sm:text-xs
            "
          >
            04 / ABOUT
          </p>

          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-white/30
              sm:text-xs
            "
          >
            
          </p>
        </div>

        {/* ==================================================
            COMPONENTRY — PARTICLE TYPOGRAPHY
        ================================================== */}

        <div
          className="
            relative
            border-y
            border-white/[0.07]
          "
        >
          <CursorDrivenParticleTypography
            text="ABOUT ME"
            fontSize={240}
            particleSize={1.25}
            particleDensity={5}
            dispersionStrength={18}
            returnSpeed={0.075}
            color="#C7C7D2"
            className="
              h-[30svh]
              min-h-[240px]
              max-h-[320px]

              sm:h-[34svh]
              sm:min-h-[280px]
              sm:max-h-[420px]

              lg:h-[38vh]
              lg:min-h-[320px]
              lg:max-h-[500px]
            "
          />
        </div>

        {/* ==================================================
            IDENTITY STATEMENT
        ================================================== */}

        <div
          className="
            grid
            gap-12
            pt-16

            lg:grid-cols-[1.45fr_0.55fr]
            lg:gap-20
            lg:pt-24
          "
        >
          <h2
            className="
              max-w-[15ch]

              text-[clamp(2.8rem,6vw,7rem)]
              font-semibold
              leading-[0.9]
              tracking-[-0.065em]
            "
          >
            <KineticTextReveal
              ref={headlineRef}
              text="I build at the intersection of AI, cybersecurity, software and systems."
              splitBy="words"
              direction="up"
              distance={38}
              stagger={0.055}
              staggerFrom="start"
              blur
              autoPlay={false}
              segmentClassName="text-[#F2F0F3]"
            />
          </h2>

          {/* Supporting copy */}

          <div className="flex flex-col justify-end">
            <div className="mb-7 h-px w-12 bg-[#A81732]" />

            <p
              className="
                max-w-[36rem]
                text-[15px]
                leading-[1.75]
                text-[#9E9AA5]

                sm:text-base
                lg:text-[17px]
              "
            >
              I like building across disciplines rather than staying inside
              one box — from intelligent systems and security tooling to
              interactive web experiences and lower-level software.
            </p>

            <p
              className="
                mt-5
                max-w-[36rem]
                text-[15px]
                leading-[1.75]
                text-[#696671]

                sm:text-base
              "
            >
              The common thread is simple: understand how something works,
              build it deliberately, and keep pushing it further.
            </p>
          </div>
        </div>

        {/* Bottom metadata */}

        <div
          className="
            mt-20
            flex
            flex-wrap
            gap-x-10
            gap-y-3
            border-t
            border-white/[0.07]
            pt-6

            font-mono
            text-[9px]
            uppercase
            tracking-[0.2em]
            text-white/30

            sm:text-[10px]
            lg:mt-28
          "
        >
          <span>AI SYSTEMS</span>
          <span>CYBERSECURITY</span>
          <span>SOFTWARE ENGINEERING</span>
          <span>SYSTEMS PROGRAMMING</span>
        </div>
      </div>
    </section>
  );
}