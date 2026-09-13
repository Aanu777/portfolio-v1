"use client";

import { ArrowUpRight } from "lucide-react";

import { GithubCalendar } from "@/components/ui/github-calendar";

const GITHUB_USERNAME = "Aanu777";

export default function GithubSection() {
  return (
    <section
      id="github"
      className="
        dark
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
      {/* ---------------------------------------------------
          BACKGROUND
      --------------------------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_76%_35%,rgba(124,58,237,0.09),transparent_30%),radial-gradient(circle_at_20%_82%,rgba(168,23,50,0.055),transparent_28%)]
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

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* -------------------------------------------------
            SECTION LABEL
        -------------------------------------------------- */}

        <div className="mb-16 flex items-center justify-between">
          <p
            className="
              font-mono
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-white/35

              sm:text-xs
            "
          >
            06 / GITHUB
          </p>

          <div
            className="
              flex
              items-center
              gap-2

              font-mono
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/30

              sm:text-[10px]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-[#A81732]
              "
            />

            LIVE ACTIVITY
          </div>
        </div>

        {/* -------------------------------------------------
            HEADING
        -------------------------------------------------- */}

        <div
          className="
            grid
            gap-12

            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
          "
        >
          <h2
            className="
              max-w-[8ch]

              text-[clamp(4rem,8vw,9rem)]
              font-semibold
              leading-[0.8]
              tracking-[-0.08em]
            "
          >
            CODE
            <br />
            LEAVES
            <br />

            <span className="text-[#A81732]">
              A TRAIL.
            </span>
          </h2>

          <div className="lg:pb-3">
            <p
              className="
                max-w-[32rem]

                text-[15px]
                leading-[1.75]
                text-[#85818C]

                sm:text-base
                lg:text-[17px]
              "
            >
              Experiments, systems, security tools and ideas that move beyond
              screenshots and actually become code.
            </p>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3

                border-b
                border-white/15
                pb-2

                font-mono
                text-[11px]
                uppercase
                tracking-[0.18em]
                text-[#C7C7D2]

                transition-colors
                duration-300

                hover:border-[#A81732]
                hover:text-white
              "
            >
              <svg
  viewBox="0 0 16 16"
  aria-hidden="true"
  className="h-4 w-4 fill-current"
>
  <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
</svg>

              VIEW GITHUB

              <ArrowUpRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300

                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>
        </div>

        {/* -------------------------------------------------
            CALENDAR
        -------------------------------------------------- */}

        <div
          className="
            mt-20
            overflow-hidden
            rounded-[24px]

            border
            border-white/[0.08]

            bg-white/[0.025]

            p-5

            shadow-[0_35px_120px_rgba(0,0,0,0.45)]

            backdrop-blur-sm

            sm:p-7
            lg:mt-28
            lg:p-10
          "
        >
          {/* Top metadata */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-3

              border-b
              border-white/[0.07]
              pb-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/30

                  sm:text-[10px]
                "
              >
                CONTRIBUTION HISTORY
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/60
                "
              >
                github.com/{GITHUB_USERNAME}
              </p>
            </div>

            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/25

                sm:text-[10px]
              "
            >
              LAST 12 MONTHS
            </span>
          </div>

          {/* Actual Componentry component */}

          <div className="overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin]">
            <GithubCalendar
              username={GITHUB_USERNAME}
              variant="city-lights"
              shape="rounded"
              glowIntensity={4}
              colorSchema="purple"
              showTotal
              className="min-w-max"
            />
          </div>
        </div>

        {/* -------------------------------------------------
            FOOTNOTE
        -------------------------------------------------- */}

        <div
          className="
            mt-8
            flex
            items-center
            gap-3

            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-white/25

            sm:text-[10px]
          "
        >
          <div className="h-px w-10 bg-white/10" />

          REAL CONTRIBUTION DATA
        </div>
      </div>
    </section>
  );
}