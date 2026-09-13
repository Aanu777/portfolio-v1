"use client";

import { cn } from "@/lib/utils";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { useRef } from "react";

export interface CaseStudyFlipItem {
  number?: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  background: string;
  foreground?: string;
}

interface CaseStudyFlipStackProps {
  items?: CaseStudyFlipItem[];
  className?: string;
  hint?: string;
  heading?: string;
  endLabel?: string;
}

const DEFAULT_ITEMS: CaseStudyFlipItem[] = [
  {
    eyebrow: "Fintech",
    title: "Boosted conversion by 42% with a product-led redesign",
    description:
      "We restructured the onboarding flow and clarified the value proposition, helping the platform turn more visitors into activated users.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Portrait framed by tropical greenery",
    background: "#a94808",
    foreground: "#fff7ed",
  },
  {
    eyebrow: "Hospitality",
    title: "A slower digital experience for a faster-growing retreat",
    description:
      "A cinematic booking journey brings the landscape forward, simplifies room selection, and gives every stay a stronger sense of place.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "A person overlooking a mountain landscape",
    background: "#067b8f",
    foreground: "#ecfeff",
  },
  {
    eyebrow: "Culture",
    title: "Turning a living archive into something you can wander through",
    description:
      "We paired bold editorial typography with an intuitive collection system, making decades of work feel immediate, playful, and alive.",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Colorful artwork in a contemporary gallery",
    background: "#ba075f",
    foreground: "#fff1f7",
  },
  {
    eyebrow: "Climate",
    title: "Making complex energy data feel clear enough to act on",
    description:
      "An approachable visual system turns live infrastructure data into useful decisions for operators, partners, and the communities they serve.",
    image:
      "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1400&q=90&auto=format&fit=crop",
    imageAlt: "Wind turbines across a green landscape",
    background: "#3322a8",
    foreground: "#f3f1ff",
  },
];

function FlipCard({
  item,
  index,
  total,
  progress,
  reduceMotion,
}: {
  item: CaseStudyFlipItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const segment = 1 / Math.max(total, 1);
  const start = index * segment;
  const end = Math.min(start + segment, 1);
  const entryStart = Math.max(0, start - segment);
  const entryEnd =
    index === 0
      ? 0.0001
      : Math.min(start, entryStart + segment * 0.7);

  const exitStart = start;
  const exitEnd = end;

  const stackedCardGap = Math.min(
    24,
    72 / Math.max(total - 1, 1)
  );

  const stackedOffset = index * stackedCardGap;
  const restingOffset = Math.min(index * 12, 34);
  const restingScale = 1 - Math.min(index * 0.012, 0.035);

  const exitYPercent = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, -118]
  );

  const exitStackOffset = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, stackedOffset]
  );

  const exitY =
    useMotionTemplate`calc(${exitYPercent}% + ${exitStackOffset}px)`;

  const rotateX = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [0, 0] : [0, 22]
  );

  const opacity = useTransform(
    progress,
    [exitStart, exitEnd],
    reduceMotion ? [1, 0] : [1, 1]
  );

  const entryScale = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [1, 1] : [restingScale, 1]
  );

  const entryY = useTransform(
    progress,
    [entryStart, entryEnd],
    index === 0 ? [0, 0] : [restingOffset, 0]
  );

  return (
    <motion.article
      className="absolute inset-x-0 top-0 h-full will-change-transform"
      style={{
        y: exitY,
        rotateX,
        opacity,
        zIndex: total - index,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      <motion.div
        className="
          grid h-full grid-rows-[1.08fr_0.92fr] overflow-hidden
          rounded-[clamp(18px,2vw,30px)]
          shadow-[0_16px_50px_rgba(0,0,0,0.28)]
          md:grid-cols-[1.15fr_0.85fr] md:grid-rows-1
        "
        style={{
          backgroundColor: item.background,
          color: item.foreground ?? "white",
          y: entryY,
          scale: entryScale,
          transformOrigin: "50% 100%",
        }}
      >
        <div className="flex min-h-0 min-w-0 flex-col p-5 sm:p-6 md:p-[clamp(24px,3vw,48px)] md:pr-[clamp(22px,3vw,48px)]">
          <div className="flex items-start">
            <span className="text-[clamp(20px,2.5vw,36px)] font-medium leading-none tracking-[-0.06em]">
              {item.number ?? String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-auto max-w-[46rem] pt-4 sm:pt-6 md:pt-8">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] opacity-70 sm:mb-3 sm:text-[10px] md:mb-[clamp(10px,1.5vw,22px)] md:text-xs">
              {item.eyebrow}
            </p>

            <h2 className="max-w-[17ch] text-balance text-[clamp(22px,6.2vw,48px)] font-semibold leading-[0.96] tracking-[-0.05em] md:max-w-[16ch] md:text-[clamp(28px,3.25vw,48px)]">
              {item.title}
            </h2>

            <p className="mt-3 max-w-[42rem] overflow-hidden text-[12px] leading-[1.45] opacity-82 sm:text-[13px] md:mt-[clamp(16px,1.8vw,24px)] md:text-[clamp(13px,1.1vw,16px)] md:leading-[1.5]">
              {item.description}
            </p>
          </div>
        </div>

        <div className="relative m-2.5 min-h-0 overflow-hidden rounded-[clamp(12px,1.4vw,22px)] sm:m-3 md:m-[clamp(10px,1.2vw,18px)] md:ml-0">
          <img
            src={item.image}
            alt={item.imageAlt}
            className="h-full w-full object-cover object-center"
            loading={index < 2 ? "eager" : "lazy"}
            draggable={false}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10" />
        </div>
      </motion.div>
    </motion.article>
  );
}

export function CaseStudyFlipStack({
  items = DEFAULT_ITEMS,
  className,
  hint = "Scroll Down",
  heading = "Design That Delivers.",
  endLabel = "The End",
}: CaseStudyFlipStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const safeItems = items.length > 0 ? items : DEFAULT_ITEMS;

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
    restDelta: 0.0005,
  });

  const cardProgress = reduceMotion ? scrollYProgress : smoothProgress;

  return (
    <main
      className={cn(
        "relative bg-[#050507] font-sans text-[#F2F0F3]",
        className
      )}
    >
      <section className="relative h-[72svh] min-h-[520px] overflow-hidden px-5 sm:h-[82vh] sm:min-h-[640px] sm:px-10">
        <div className="absolute inset-x-0 top-[clamp(90px,15svh,165px)] flex items-center justify-center gap-[clamp(12px,2.5vw,32px)] text-[clamp(22px,6vw,52px)] font-medium tracking-[-0.055em] sm:text-[clamp(26px,3.5vw,52px)]">
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>

          <span>{hint}</span>

          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { y: [0, 10, 0] }}
            transition={{
              duration: 1.4,
              delay: 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.span>
        </div>

        <div className="absolute inset-x-5 top-[clamp(270px,40svh,440px)] flex justify-center sm:inset-x-10 sm:top-[clamp(330px,43vh,440px)]">
          <h1 className="max-w-[18ch] text-center text-[clamp(38px,10vw,82px)] font-semibold leading-[0.92] tracking-[-0.06em] text-[#A81732] sm:text-[clamp(42px,5.5vw,82px)]">
            {heading}
          </h1>
        </div>
      </section>

      <div
        ref={stackRef}
        className="relative"
        style={{
          height: `${(Math.max(safeItems.length, 1) + 1) * 100}vh`,
        }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden px-[clamp(12px,4vw,64px)] py-5 sm:py-8">
          <div
            className="
              relative mx-auto h-[min(82svh,620px)] min-h-[470px] w-full max-w-[520px]
              [perspective:800px]
              md:h-[min(82svh,560px)] md:min-h-0 md:max-w-[860px]
              lg:h-auto lg:aspect-[1.76/1]
            "
          >
            {[...safeItems].reverse().map((item, reverseIndex) => {
              const index = safeItems.length - reverseIndex - 1;

              return (
                <FlipCard
                  key={`${item.title}-${index}`}
                  item={item}
                  index={index}
                  total={safeItems.length}
                  progress={cardProgress}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </div>
      </div>

      <section className="flex min-h-[100svh] items-center justify-center px-5 sm:min-h-[120vh] sm:px-10">
        <p className="text-center text-[clamp(48px,14vw,144px)] font-semibold leading-none tracking-[-0.07em] text-[#F2F0F3] sm:text-[clamp(54px,9vw,144px)]">
          {endLabel}
        </p>
      </section>
    </main>
  );
}
