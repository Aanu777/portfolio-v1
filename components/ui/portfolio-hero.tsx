"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

// ------------------------------------------------------------
// BlurText
// Original animation behavior from the 21st.dev Portfolio Hero.
// ------------------------------------------------------------

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {segments.map((segment, i) => (
        <span
          key={`${segment}-${i}`}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1
            ? "\u00A0"
            : ""}
        </span>
      ))}
    </p>
  );
};

// ------------------------------------------------------------
// Portfolio Hero
// ------------------------------------------------------------

export default function PortfolioHero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close menu when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      label: "HOME",
      href: "#home",
      highlight: true,
    },
    {
      label: "WORK",
      href: "#work",
    },
    {
      label: "ABOUT",
      href: "#about",
    },
    {
      label: "STACK",
      href: "#stack",
    },
    {
      label: "GITHUB",
      href: "#github",
    },
    {
      label: "CONTACT",
      href: "#contact",
    },
  ];

  return (
    <div
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-transparent text-[#F2F0F3] pointer-events-none"
>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="pointer-events-auto fixed left-0 right-0 top-0 z-50 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-6">
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between">
          {/* MENU */}

          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-[#8D8993] transition-colors duration-300 hover:bg-white/[0.05] hover:text-white"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              {isMenuOpen ? (
                <X
                  className="h-7 w-7 md:h-8 md:w-8"
                  strokeWidth={1.7}
                />
              ) : (
                <Menu
                  className="h-7 w-7 md:h-8 md:w-8"
                  strokeWidth={1.7}
                />
              )}
            </button>

            {isMenuOpen && (
              <div
                ref={menuRef}
                className="
                  absolute
                  left-0
                  top-full
                  z-[100]
                  mt-2
                  w-[min(210px,calc(100vw-2rem))]
                  rounded-xl
                  border
                  border-white/10
                  bg-black/70
                  p-4
                  shadow-2xl
                  backdrop-blur-xl
                  md:w-[240px]
                "
              >
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      block
                      cursor-pointer
                      px-2
                      min-h-11
                      py-2
                      text-lg
                      font-bold
                      tracking-tight
                      transition-colors
                      duration-300
                      md:text-xl

                      ${
                        item.highlight
                          ? "text-[#A81732] hover:text-[#D32F4C]"
                          : "text-[#F2F0F3] hover:text-[#A81732]"
                      }
                    `}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* SIGNATURE */}

          <div
            className="select-none text-4xl text-[#F2F0F3]"
            style={{
              fontFamily:
                "'Brush Script MT', 'Lucida Handwriting', cursive",
            }}
          >
            A
          </div>

          {/* Spacer keeps signature perfectly centered */}

          <div className="h-10 w-10" aria-hidden="true" />
        </nav>
      </header>

      {/* ======================================================
          HERO
      ====================================================== */}

      <main className="relative flex min-h-[100svh] flex-col">
        {/* MAIN NAME */}

        <div className="absolute left-1/2 top-[46%] w-full -translate-x-1/2 -translate-y-1/2 px-3 sm:top-1/2 sm:px-4">
          <div className="relative text-center">
            {/* AYAN */}

            <div>
              <BlurText
                text="AYAN"
                delay={100}
                animateBy="letters"
                direction="top"
                className="
                  justify-center
                  whitespace-nowrap
                  text-[clamp(5rem,min(24vw,24svh),13.125rem)]
                  font-bold
                  uppercase
                  leading-[0.75]
                  tracking-tighter
                "
                style={{
                  color: "#F2F0F3",
                  fontFamily: "'Fira Code', monospace",
                }}
              />
            </div>

            {/* ENGINEER */}

            <div>
              <BlurText
                text="ENGINEER"
                delay={80}
                animateBy="letters"
                direction="top"
                className="
                  justify-center
                  whitespace-nowrap
                  text-[clamp(2.35rem,min(12vw,17svh),9.6875rem)]
                  font-bold
                  uppercase
                  leading-[0.8]
                  tracking-[-0.07em]
                "
                style={{
                  color: "#F2F0F3",
                  fontFamily: "'Fira Code', monospace",
                }}
              />
            </div>

            {/* PROFILE IMAGE */}

            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div
                className="
                  h-[96px]
                  w-[56px]
                  pointer-events-auto
                  cursor-pointer
                  overflow-hidden
                  rounded-full
                  border
                  border-white/10
                  shadow-2xl
                  transition-transform
                  duration-300
                  hover:scale-110
                  active:scale-105
                  sm:h-[152px]
                  sm:w-[90px]
                  md:h-[185px]
                  md:w-[110px]
                  lg:h-[218px]
                  lg:w-[129px]
                "
              >
                <img
                  src="/images/profile.png"
                  alt="Ayan"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            DISCIPLINES
        ==================================================== */}

        <div
          className="
            absolute
            bottom-16
            left-1/2
            w-full
            -translate-x-1/2
            px-4
            sm:bottom-20
            sm:px-6
            md:bottom-24
            lg:bottom-32
            xl:bottom-36
          "
        >
          <div className="flex justify-center">
            <BlurText
              text="AI · CYBERSECURITY · SOFTWARE · SYSTEMS"
              delay={150}
              animateBy="words"
              direction="top"
              className="
                justify-center
                text-center
                max-w-[94vw]
                text-[11px]
                leading-relaxed
                tracking-[0.06em]
                text-[#C7C7D2]
                transition-colors
                duration-300
                hover:text-white
                sm:text-[16px]
                md:text-[18px]
                lg:text-[20px]
              "
              style={{
                fontFamily: "'Antic', sans-serif",
              }}
            />
          </div>
        </div>

        {/* ====================================================
            SCROLL INDICATOR
        ==================================================== */}

        <button
          type="button"
          className="
            pointer-events-auto
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            text-[#8D8993]
            transition-colors
            duration-300
            hover:text-white
            md:bottom-9
          "
          aria-label="Scroll down"
          onClick={() => {
            document.querySelector("#work")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <ChevronDown
            className="h-5 w-5 md:h-8 md:w-8"
            strokeWidth={1.5}
          />
        </button>
      </main>
    </div>
  );
}