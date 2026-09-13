"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface SkillGroup {
  name: string;
  skills: string[];
}

interface SkillsProps {
  groups?: SkillGroup[];
  label?: string;
}

const defaultGroups: SkillGroup[] = [
  {
    name: "AI / INTELLIGENT SYSTEMS",
    skills: ["Python", "LLMs", "RAG", "Vector Databases", "Speech AI"],
  },
  {
    name: "CYBERSECURITY",
    skills: ["Phishing Analysis", "Email Forensics", "Web Security", "Threat Analysis"],
  },
  {
    name: "FRONTEND",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "SYSTEMS",
    skills: ["C", "Operating Systems", "QEMU", "Low-Level Programming"],
  },
  {
    name: "TOOLS",
    skills: ["Git", "GitHub", "VS Code", "Windows", "Linux"],
  },
];

export function Skills({
  groups = defaultGroups,
  label = "CURRENT STACK",
}: SkillsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openIndex = useMemo(
    () => hoveredIndex ?? activeIndex,
    [hoveredIndex, activeIndex]
  );

  const toggle = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-8 flex items-center gap-4 sm:mb-10">
        <div className="h-px w-10 bg-white/15 sm:w-12" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/40 sm:text-[10px] sm:tracking-[0.25em]">
          {label}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        {groups.map((group, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={group.name}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => toggle(index)}
                className={cn(
                  "relative -mx-2 flex w-[calc(100%+1rem)] items-start justify-between rounded-lg px-2 py-5 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:-mx-4 sm:w-[calc(100%+2rem)] sm:px-4 sm:py-6",
                  isOpen ? "bg-white/[0.035]" : "bg-transparent"
                )}
              >
                <div className="relative flex min-w-0 items-start gap-3 sm:gap-4">
                  <div
                    className={cn(
                      "mt-0.5 h-6 w-0.5 shrink-0 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen
                        ? "scale-y-100 bg-[#A81732] opacity-100"
                        : "scale-y-50 bg-white/10 opacity-0"
                    )}
                  />

                  <div
                    className={cn(
                      "min-w-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "translate-x-0" : "-translate-x-3 sm:-translate-x-5"
                    )}
                  >
                    <p
                      className={cn(
                        "break-words text-sm font-medium tracking-[-0.02em] transition-colors duration-500 sm:text-lg",
                        isOpen ? "text-white" : "text-white/45"
                      )}
                    >
                      {group.name}
                    </p>

                    <div
                      className={cn(
                        "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-3 sm:gap-x-4 sm:gap-y-1">
                          {group.skills.map((skill) => (
                            <span
                              key={skill}
                              className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#9E9AA5] sm:text-[11px] sm:tracking-[0.14em]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <span
                  className={cn(
                    "ml-3 shrink-0 font-mono text-[10px] tabular-nums transition-all duration-500 sm:text-xs",
                    isOpen
                      ? "translate-y-0 text-[#C7C7D2] opacity-100"
                      : "translate-y-1 text-white/20 opacity-50 sm:translate-y-2"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>

              {index < groups.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px transition-all duration-500 sm:mx-4",
                    openIndex === index || openIndex === index + 1
                      ? "bg-transparent"
                      : "bg-white/[0.06]"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-white/[0.07] pt-5 sm:mt-10 sm:pt-6">
        <div className="h-1.5 w-1.5 rounded-full bg-[#A81732] motion-safe:animate-pulse" />
        <p className="text-[10px] tracking-wide text-white/35 sm:text-[11px]">
          <span className="sm:hidden">Tap to explore</span>
          <span className="hidden sm:inline">Hover or tap to explore</span>
        </p>
      </div>
    </div>
  );
}
