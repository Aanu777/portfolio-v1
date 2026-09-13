"use client";

import { ArrowUpRight, Mail } from "lucide-react";

import { ClosingPlasma } from "@/components/ui/closing-plasma";

const EMAIL = "Ayangoku753@gmail.com";
const GITHUB_USERNAME = "Aanu777";

const EMAIL_LINK =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    EMAIL
  )}&su=${encodeURIComponent("Portfolio Inquiry")}`;

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#050507] text-[#F2F0F3]"
    >
      <ClosingPlasma
        className="min-h-[100svh]"
        themeMode="dark"
        darkColorA="#050507"
        darkColorB="#120B18"
        darkColorC="#7C3AED"
        speed={0.72}
        turbulence={1.18}
        mouseInfluence={0.8}
        grain={0.7}
        sparkle={0.45}
        vignette={1.15}
        opacity={1}
        interactive
      >
        {/* Readability overlays */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/45" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_72%,rgba(168,23,50,0.17),transparent_30%)]" />

        <div
          className="
            relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px]
            flex-col px-5 py-8
            sm:px-8
            md:px-12
            lg:px-16 lg:py-12
          "
        >
          {/* ==================================================
              TOP BAR
          ================================================== */}

          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <p
              className="
                font-mono text-[10px] uppercase tracking-[0.3em]
                text-white/40 sm:text-xs
              "
            >
              08 / CONTACT
            </p>

            <div
              className="
                hidden items-center gap-2
                sm:flex
                font-mono text-[9px] uppercase tracking-[0.2em]
                text-white/30 sm:text-[10px]
              "
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#A81732]" />

              OPEN TO BUILDING
            </div>
          </div>

          {/* ==================================================
              MAIN
          ================================================== */}

          <div
            className="
              grid flex-1 items-center gap-14 py-16
              sm:py-20
              lg:grid-cols-[1.35fr_0.65fr]
              lg:gap-24 lg:py-24
            "
          >
            {/* LEFT */}

            <div>
              <p
                className="
                  mb-8 font-mono text-[10px] uppercase
                  tracking-[0.25em] text-white/35
                  sm:text-xs
                "
              >
                GOT SOMETHING WORTH BUILDING?
              </p>

              <h2
                className="
                  max-w-[9ch]
                  text-[clamp(3.45rem,15vw,10rem)]
                  font-semibold
                  leading-[0.78]
                  tracking-[-0.085em]
                  text-[#F2F0F3]
                "
              >
                LET&apos;S
                <br />
                MAKE
                <br />

                <span className="text-[#A81732]">
                  IT REAL.
                </span>
              </h2>

              <p
                className="
                  mt-10 max-w-[34rem]
                  text-[15px] leading-[1.75]
                  text-white/45
                  sm:text-base
                  lg:text-[17px]
                "
              >
                AI systems, security tooling, software products,
                experimental interfaces, or something that does not fit neatly
                into one category.
              </p>
            </div>

            {/* ==================================================
                CONTACT PORTAL
            ================================================== */}

            <div className="flex items-center justify-center lg:justify-end">
              <a
                 href={EMAIL_LINK}
                 target="_blank"
                 rel="noreferrer"
                 aria-label="Send me an email"
                className="
                  group relative
                  flex aspect-square w-[min(76vw,280px)] shrink-0
                  items-center justify-center
                  rounded-full

                  sm:w-[340px]
                  lg:w-[370px]
                "
              >
                {/* Outer ring */}

                <div
                  className="
                    pointer-events-none
                    absolute -inset-3
                    sm:-inset-5
                    rounded-full
                    border border-white/[0.09]

                    transition-all duration-700
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    group-hover:-inset-5
                    sm:group-hover:-inset-8
                    group-hover:border-white/[0.18]
                  "
                />

                {/* Secondary ring */}

                <div
                  className="
                    pointer-events-none
                    absolute -inset-1.5
                    rounded-full
                    border border-[#7C3AED]/25

                    transition-all duration-700

                    group-hover:border-[#A81732]/50
                  "
                />

                {/* Portal body */}

                <div
                  className="
                    absolute inset-0
                    overflow-hidden rounded-full

                    border border-white/[0.14]
                    bg-black/25

                    shadow-[0_30px_100px_rgba(0,0,0,0.45),inset_0_0_70px_rgba(124,58,237,0.08)]

                    backdrop-blur-md

                    transition-all duration-700
                    ease-[cubic-bezier(0.16,1,0.3,1)]

                    group-hover:scale-[1.025]
                    group-hover:border-white/[0.28]
                    group-hover:bg-black/15
                  "
                />

                {/* Portal atmosphere */}

                <div
                  className="
                    pointer-events-none
                    absolute inset-[2px]
                    rounded-full

                    bg-[radial-gradient(circle_at_36%_25%,rgba(199,199,210,0.10),transparent_28%),radial-gradient(circle_at_65%_70%,rgba(168,23,50,0.22),transparent_42%),radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.10),transparent_60%)]

                    transition-transform duration-1000

                    group-hover:scale-110
                  "
                />

                {/* Crosshair */}

                <div
                  className="
                    pointer-events-none
                    absolute left-1/2 top-0
                    h-5 w-px
                    -translate-x-1/2
                    bg-gradient-to-b from-white/40 to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute bottom-0 left-1/2
                    h-5 w-px
                    -translate-x-1/2
                    bg-gradient-to-t from-white/40 to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute left-0 top-1/2
                    h-px w-5
                    -translate-y-1/2
                    bg-gradient-to-r from-white/40 to-transparent
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute right-0 top-1/2
                    h-px w-5
                    -translate-y-1/2
                    bg-gradient-to-l from-white/40 to-transparent
                  "
                />

                {/* Portal content */}

                <div
                  className="
                    relative z-10
                    flex max-w-[220px]
                    sm:max-w-[250px]
                    flex-col items-center
                    text-center
                  "
                >
                  <span
                    className="
                      mb-6
                      font-mono text-[9px]
                      uppercase tracking-[0.28em]
                      text-white/45
                    "
                  >
                    START A CONVERSATION
                  </span>

                  <span
                    className="
                      text-[36px]
                      font-medium
                      leading-[0.92]
                      tracking-[-0.06em]
                      text-[#F2F0F3]

                      transition-transform duration-500

                      group-hover:-translate-y-1

                      sm:text-[48px]
                    "
                  >
                    Say
                    <br />
                    hello.
                  </span>

                  <span
                    className="
                      mt-5 max-w-[175px]
                      text-[11px]

                      sm:mt-6 sm:max-w-[190px] sm:text-[12px]
                      leading-[1.6]
                      text-white/40

                      transition-colors duration-500

                      group-hover:text-white/60
                    "
                  >
                    Have an idea, project or experiment worth building?
                  </span>

                  <div
                    className="
                      mt-5
                      flex h-10 w-10

                      sm:mt-7 sm:h-11 sm:w-11
                      items-center justify-center
                      rounded-full

                      border border-white/15
                      bg-white/[0.05]
                      text-white/60

                      transition-all duration-500

                      group-hover:scale-110
                      group-hover:border-[#A81732]
                      group-hover:bg-[#A81732]
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4 w-4
                        transition-transform duration-500

                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>
                </div>

                <div
                  className="
                    pointer-events-none
                    absolute bottom-4 left-1/2
                    sm:-bottom-10
                    -translate-x-1/2
                    whitespace-nowrap

                    font-mono text-[8px]
                    uppercase tracking-[0.24em]
                    text-white/20

                    transition-colors duration-500

                    group-hover:text-white/40
                  "
                >
                  CLICK TO EMAIL ↗
                </div>
              </a>
            </div>
          </div>

          {/* ==================================================
              INFO STRIP
          ================================================== */}

          <div className="grid border-t border-white/[0.08] md:grid-cols-3">
            {/* Email */}

            <a
              href={EMAIL_LINK}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex min-h-[130px]
                flex-col justify-between
                border-b border-white/[0.08]
                py-6

                md:border-b-0
                md:border-r
                md:pr-8
              "
            >
              <div className="flex items-center justify-between">
                <span
                  className="
                    font-mono text-[9px]
                    uppercase tracking-[0.22em]
                    text-white/25
                  "
                >
                  EMAIL
                </span>

                <ArrowUpRight
                  className="
                    h-4 w-4
                    text-white/20
                    transition-all duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white
                  "
                />
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white/35" />

                <span
                  className="
                    break-all
                    text-sm text-white/65
                    transition-colors duration-300
                    group-hover:text-white
                    sm:text-base
                  "
                >
                  {EMAIL}
                </span>
              </div>
            </a>

            {/* GitHub */}

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="
                group
                flex min-h-[130px]
                flex-col justify-between
                border-b border-white/[0.08]
                py-6

                md:border-b-0
                md:border-r
                md:px-8
              "
            >
              <div className="flex items-center justify-between">
                <span
                  className="
                    font-mono text-[9px]
                    uppercase tracking-[0.22em]
                    text-white/25
                  "
                >
                  GITHUB
                </span>

                <ArrowUpRight
                  className="
                    h-4 w-4
                    text-white/20
                    transition-all duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white
                  "
                />
              </div>

              <span
                className="
                  text-sm text-white/65
                  transition-colors duration-300
                  group-hover:text-white
                  sm:text-base
                "
              >
                @{GITHUB_USERNAME}
              </span>
            </a>

            {/* Current focus */}

            <div
              className="
                flex min-h-[130px]
                flex-col justify-between
                py-6
                md:pl-8
              "
            >
              <span
                className="
                  font-mono text-[9px]
                  uppercase tracking-[0.22em]
                  text-white/25
                "
              >
                CURRENT FOCUS
              </span>

              <p
                className="
                  max-w-[22rem]
                  text-sm leading-relaxed
                  text-white/60
                  sm:text-base
                "
              >
                AI · CYBERSECURITY · SOFTWARE · SYSTEMS
              </p>
            </div>
          </div>

          {/* ==================================================
              MICRO FOOTER
          ================================================== */}

          <div
            className="
              mt-8
              flex flex-col gap-3
              border-t border-white/[0.05]
              pt-5

              font-mono
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/20

              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:text-[9px]
            "
          >
            <span>BUILT WITH INTENT, NOT TEMPLATE FILLER.</span>

            <span>
              © {new Date().getFullYear()} AYAN
            </span>
          </div>
        </div>
      </ClosingPlasma>
    </section>
  );
}