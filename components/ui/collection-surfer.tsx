"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import React from "react";

export interface CollectionItem {
  id: number;
  image: string;
  title: string;
  eyebrow?: string;
}

export type CollectionSurferVariant = "magnetic" | "uplift" | "simple";

interface CollectionSurferProps {
  items: CollectionItem[];
  variant?: CollectionSurferVariant;
  heading?: string;
  eyebrow?: string;
  scrollLabel?: string;
}

export function CollectionSurfer({
  items,
  variant = "uplift",
  heading = "PROJECT LAB",
  eyebrow = "SELECTED EXPERIMENTS",
  scrollLabel = "SCROLL TO SURF",
}: CollectionSurferProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [compactViewport, setCompactViewport] = React.useState(false);
  const [coarsePointer, setCoarsePointer] = React.useState(false);

  React.useEffect(() => {
    const compact = window.matchMedia(
      "(max-width: 900px), (max-height: 600px)"
    );
    const coarse = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setCompactViewport(compact.matches);
      setCoarsePointer(coarse.matches);
    };

    update();
    compact.addEventListener("change", update);
    coarse.addEventListener("change", update);

    return () => {
      compact.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  const duplicatedItems = [...items, ...items];
  const itemCount = Math.max(items.length, 1);
  const scrollPerItem = compactViewport ? 520 : 600;
  const loopDistance = itemCount * scrollPerItem;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.12,
    stiffness: reduceMotion ? 1000 : 100,
    damping: reduceMotion ? 100 : 22,
    restDelta: 0.0001,
  });

  const scrollDistance = useTransform(
    smoothProgress,
    [0, 1],
    [0, loopDistance * 2]
  );

  const loopedProgress = useTransform(
    scrollDistance,
    (value) => value % loopDistance
  );

  const stepX = compactViewport ? 220 : 340;
  const stepY = compactViewport ? -62 : -92;
  const stepZ = compactViewport ? -240 : -330;
  const rotationY = compactViewport ? -34 : -48;

  const x = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -itemCount * stepX]
  );

  const y = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -itemCount * stepY]
  );

  const z = useTransform(
    loopedProgress,
    [0, loopDistance],
    [0, -itemCount * stepZ]
  );

  const mouseX = useMotionValue(-10000);
  const mouseY = useMotionValue(-10000);

  const effectiveVariant: CollectionSurferVariant =
    coarsePointer || reduceMotion ? "simple" : variant;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (effectiveVariant === "simple") return;
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  const handlePointerLeave = () => {
    if (effectiveVariant === "simple") return;
    mouseX.set(-10000);
    mouseY.set(-10000);
  };

  const sectionHeight =
    Math.max(items.length, 4) * (compactViewport ? 72 : 85) +
    (compactViewport ? 100 : 120);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#050507] text-white"
      style={{ height: `${sectionHeight}${compactViewport ? "svh" : "vh"}` }}
    >
      <div
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#050507] md:h-screen"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(124,58,237,0.09),transparent_30%),radial-gradient(circle_at_78%_72%,rgba(168,23,50,0.07),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,7,0.05),rgba(5,5,7,0.48))]" />

        <div className="pointer-events-none absolute left-[5vw] top-[max(4svh,1rem)] z-50 mix-blend-difference sm:top-[6vh]">
          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.24em] text-white/55 sm:mb-3 sm:text-xs sm:tracking-[0.28em]">
            {eyebrow}
          </p>

          <h2 className="font-bold text-[clamp(2.35rem,11vw,7.5rem)] leading-[0.82] tracking-[-0.07em] text-white sm:text-[clamp(3rem,7vw,7.5rem)]">
            {heading}
            <span className="relative ml-2 top-[-0.15em] font-mono text-[0.2em] font-normal tracking-normal text-white/45 sm:ml-3 sm:text-[0.19em]">
              ({String(items.length).padStart(2, "0")})
            </span>
          </h2>
        </div>

        <div className="pointer-events-none absolute bottom-[max(3svh,env(safe-area-inset-bottom))] right-[5vw] z-50 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:bottom-[4vh] sm:right-[4vw] sm:text-xs sm:tracking-[0.25em]">
          {coarsePointer ? "SWIPE TO SURF" : scrollLabel}
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            perspective: compactViewport ? "1500px" : "2100px",
            perspectiveOrigin: compactViewport ? "12% 28%" : "13% 18%",
          }}
        >
          <motion.div
            className="relative h-0 w-0"
            style={{
              x,
              y,
              z,
              transformStyle: "preserve-3d",
            }}
          >
            {duplicatedItems.map((item, index) => (
              <Card
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                itemCount={itemCount}
                stepX={stepX}
                stepY={stepY}
                stepZ={stepZ}
                rotationY={rotationY}
                mouseX={mouseX}
                mouseY={mouseY}
                scrollSpring={scrollDistance}
                variant={effectiveVariant}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Card({
  item,
  index,
  itemCount,
  stepX,
  stepY,
  stepZ,
  rotationY,
  mouseX,
  mouseY,
  scrollSpring,
  variant,
}: {
  item: CollectionItem;
  index: number;
  itemCount: number;
  stepX: number;
  stepY: number;
  stepZ: number;
  rotationY: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  scrollSpring: MotionValue<number>;
  variant: CollectionSurferVariant;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  const distance = useTransform(
    [mouseX, mouseY, scrollSpring],
    (latest) => {
      const [mousePositionX, mousePositionY] = latest as number[];

      if (!ref.current || variant === "simple") {
        return 500;
      }

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = mousePositionX - centerX;
      const deltaY = mousePositionY - centerY;

      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
  );

  const targetScale = useTransform(distance, [0, 420], [1.16, 1]);
  const springScale = useSpring(targetScale, {
    mass: 0.5,
    stiffness: 300,
    damping: 24,
  });

  const targetUplift = useTransform(distance, [0, 420], [-70, 0]);
  const springUplift = useSpring(targetUplift, {
    mass: 0.5,
    stiffness: 300,
    damping: 24,
  });

  const transform = useTransform(
    [springScale, springUplift],
    (latest) => {
      const [scale, uplift] = latest as number[];

      let scaleValue = 1;
      let upliftValue = 0;

      if (variant === "magnetic") scaleValue = Number(scale);
      if (variant === "uplift") upliftValue = Number(uplift);

      const baseX = index * stepX;
      const baseY = index * stepY;
      const baseZ = index * stepZ;

      return `translate3d(${baseX}px, ${baseY + upliftValue}px, ${baseZ}px) rotateY(${rotationY}deg) scale(${scaleValue})`;
    }
  );

  const projectNumber = (index % itemCount) + 1;

  return (
    <motion.article
      ref={ref}
      className="group absolute aspect-[16/10] w-[82vw] max-w-[360px] overflow-hidden rounded-[16px] border border-white/10 bg-[#0B0B0E] shadow-[0_35px_100px_rgba(0,0,0,0.65)] will-change-transform sm:w-[min(78vw,440px)] sm:max-w-[440px] sm:rounded-[18px]"
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 overflow-hidden bg-[#0B0B0E]">
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="h-full w-full object-cover object-center brightness-[0.9] saturate-[0.95] transition-all duration-500 md:brightness-[0.72] md:saturate-[0.88] md:group-hover:scale-[1.025] md:group-hover:brightness-100 md:group-hover:saturate-100"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />

      <div className="absolute left-4 top-4 font-mono text-[9px] tracking-[0.2em] text-white/55 transition-colors duration-300 md:left-5 md:top-5 md:text-[10px] md:group-hover:text-white/80">
        {String(projectNumber).padStart(2, "0")}
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
        {item.eyebrow && (
          <p className="mb-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-white/55 sm:mb-2 sm:text-[10px] sm:tracking-[0.2em]">
            {item.eyebrow}
          </p>
        )}

        <h3 className="max-w-[20ch] text-lg font-semibold leading-none tracking-[-0.04em] text-white sm:text-2xl">
          {item.title}
        </h3>
      </div>
    </motion.article>
  );
}
