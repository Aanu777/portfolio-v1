"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";

import { LetterCascade } from "@/components/ui/letter-cascade";
import { TextRepel } from "@/components/ui/text-repel";

const EMAIL = "Ayangoku753@gmail.com";
const GITHUB_USERNAME = "Aanu777";

const navLinks = [
  { label: "HOME", href: "#" },
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "STACK", href: "#stack" },
  { label: "GITHUB", href: "#github" },
  { label: "CONTACT", href: "#contact" },
];

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const emailLink =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      EMAIL
    )}&su=${encodeURIComponent("Portfolio Inquiry")}`;

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-[#050507]
        px-5
        pb-8
        pt-16
        text-[#F2F0F3]

        sm:px-8
        md:px-12
        lg:px-16
        lg:pb-10
        lg:pt-24
      "
    >
      {/* ==================================================
          BACKGROUND ATMOSPHERE
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_68%,rgba(124,58,237,0.08),transparent_30%),radial-gradient(circle_at_15%_20%,rgba(168,23,50,0.06),transparent_25%)]
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
        {/* ==================================================
            TOP META
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/[0.07]
            pb-5
          "
        >
          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.28em]
              text-white/30

              sm:text-[10px]
            "
          >
            09 / END
          </p>

          <p
            className="
              font-mono
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/20

              sm:text-[9px]
            "
          >
            ONE MORE INTERACTION
          </p>
        </div>

        {/* ==================================================
            LETTER CASCADE
        ================================================== */}

        <div
          className="
            flex
            min-h-[190px]
            items-center
            justify-center
            border-b
            border-white/[0.07]

            sm:min-h-[230px]
            lg:min-h-[280px]
          "
        >
          <LetterCascade
            text="BUILD / BREAK / LEARN / REPEAT"
            staggerDuration={0.025}
            staggerFrom="center"
            stiffness={220}
            damping={17}
            triggerOnClick={false}
            className="
              max-w-full
              max-w-full
              whitespace-nowrap
              text-center
            "
            letterClassName="
              text-[clamp(0.78rem,3.7vw,3rem)]
              font-medium
              tracking-[-0.045em]
              text-[#C7C7D2]
            "
          />
        </div>

        {/* ==================================================
            GIANT AYAN / TEXT REPEL
        ================================================== */}

        <div
          className="
            relative
            flex
            min-h-[360px]
            items-center
            justify-center
            overflow-hidden

            sm:min-h-[440px]
            lg:min-h-[560px]
          "
        >
          {/* Tiny label behind interaction */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-8

              font-mono
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/20

              sm:text-[9px]
            "
          >
            <span className="sm:hidden">TOUCH THE TYPE</span>
            <span className="hidden sm:inline">MOVE YOUR CURSOR</span>
          </div>

          <TextRepel
            text="AYAN"
            radius={190}
            strength={72}
            mode="repel"
            stiffness={165}
            damping={15}
            mass={0.42}
            className="
              w-full
              overflow-visible
            "
            letterClassName="
              text-[clamp(5.25rem,22vw,19rem)]
              font-semibold
              leading-[0.75]
              tracking-[-0.105em]
              text-[#F2F0F3]
            "
          />

          {/* Crimson underline accent */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-[18%]
              left-1/2

              h-px
              w-[18%]

              -translate-x-1/2

              bg-gradient-to-r
              from-transparent
              via-[#A81732]
              to-transparent

              opacity-70
            "
          />
        </div>

        {/* ==================================================
            NAVIGATION / LINKS
        ================================================== */}

        <div
          className="
            grid
            border-t
            border-white/[0.07]

            lg:grid-cols-[1.3fr_0.7fr]
          "
        >
          {/* Main navigation */}

          <div
            className="
              grid
              grid-cols-2

              border-b
              border-white/[0.07]

              py-10

              sm:grid-cols-3
              lg:border-b-0
              lg:border-r
              lg:pr-12
            "
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  group
                  flex
                  items-center
                  gap-2
                  py-3

                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-white/35

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                <span
                  className="
                    h-1
                    w-1
                    rounded-full
                    bg-white/15

                    transition-all
                    duration-300

                    group-hover:scale-150
                    group-hover:bg-[#A81732]
                  "
                />

                {link.label}
              </a>
            ))}
          </div>

          {/* External / contact */}

          <div
            className="
              flex
              flex-col
              justify-between
              gap-10
              py-10

              lg:pl-12
            "
          >
            <div className="grid gap-5">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/[0.07]
                  pb-4

                  text-sm
                  text-white/55

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                <span>GitHub</span>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-white/25

                    transition-all
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#A81732]
                  "
                />
              </a>

              <a
                href={emailLink}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between

                  border-b
                  border-white/[0.07]
                  pb-4

                  text-sm
                  text-white/55

                  transition-colors
                  duration-300

                  hover:text-white
                "
              >
                <span>Email</span>

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    text-white/25

                    transition-all
                    duration-300

                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-[#A81732]
                  "
                />
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="
                group
                flex
                w-fit
                items-center
                gap-3

                font-mono
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/30

                transition-colors
                duration-300

                hover:text-white
              "
            >
              BACK TO TOP

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/10

                  transition-all
                  duration-300

                  group-hover:-translate-y-1
                  group-hover:border-[#A81732]
                  group-hover:bg-[#A81732]
                "
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* ==================================================
            FINAL LINE
        ================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3

            border-t
            border-white/[0.07]

            pt-6

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
          <span>
            AI · CYBERSECURITY · SOFTWARE · SYSTEMS
          </span>

          <span>
            AYAN / PORTFOLIO / {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}