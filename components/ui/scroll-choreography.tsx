"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollChoreographyProps {
  className?: string;

  images: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export function ScrollChoreography({
  className,
  images,
}: ScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [compactViewport, setCompactViewport] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 767px), (max-height: 600px)"
    );

    const update = () => setCompactViewport(media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 1000 : 400,
    damping: reduceMotion ? 100 : 50,
    mass: 1.2,
    restDelta: 0.001,
  });

  const xLeft = compactViewport ? "-18vw" : "-20vw";
  const xRight = compactViewport ? "18vw" : "20vw";
  const yTop = compactViewport ? "-17svh" : "-18vh";
  const yBottom = compactViewport ? "17svh" : "18vh";

  const initialWidth = compactViewport ? "64vw" : "34vw";
  const initialHeight = compactViewport ? "36vw" : "19.125vw";
  const fullHeight = compactViewport ? "100svh" : "100vh";

  const tlX = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [xLeft, xLeft, xLeft, "0vw", "0vw"]
  );

  const tlY = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [yTop, yBottom, yBottom, "0vh", "0vh"]
  );

  const brX = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [xRight, xRight, xRight, "0vw", "0vw"]
  );

  const brY = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [yBottom, yTop, yTop, "0vh", "0vh"]
  );

  const blX = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [xLeft, xLeft, xLeft, "0vw", "0vw"]
  );

  const blY = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [yBottom, yBottom, yBottom, "0vh", "0vh"]
  );

  const trX = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [xRight, xRight, xRight, "0vw", "0vw"]
  );

  const trY = useTransform(
    smoothProgress,
    [0, 0.3, 0.35, 0.65, 1],
    [yTop, yTop, yTop, "0vh", "0vh"]
  );

  const heroWidth = useTransform(
    smoothProgress,
    [0.65, 0.7, 0.9, 1],
    [initialWidth, initialWidth, "100vw", "100vw"]
  );

  const heroHeight = useTransform(
    smoothProgress,
    [0.65, 0.7, 0.9, 1],
    [initialHeight, initialHeight, fullHeight, fullHeight]
  );

  const heroRadius = useTransform(
    smoothProgress,
    [0.7, 0.9],
    [compactViewport ? "14px" : "18px", "0px"]
  );

  const underImagesOpacity = useTransform(
    smoothProgress,
    [0.75, 0.85],
    [1, 0]
  );

  const baseImageClasses = cn(
    "absolute left-1/2 top-1/2",
    "-translate-x-1/2 -translate-y-1/2",
    "overflow-hidden",
    "border border-white/[0.10]",
    "bg-[#080808]",
    "shadow-[0_24px_80px_rgba(0,0,0,0.55)]",
    "will-change-transform"
  );

  const imageClasses =
    "h-full w-full select-none object-cover object-center";

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-[270svh] w-full bg-[#050507] md:h-[300vh]",
        className
      )}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden md:h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{
              x: tlX,
              y: tlY,
              width: initialWidth,
              height: initialHeight,
              opacity: underImagesOpacity,
              borderRadius: compactViewport ? 14 : 18,
            }}
            className={cn(baseImageClasses, "z-10")}
          >
            <img
              src={images.topLeft}
              alt="VELTRIXA"
              className={imageClasses}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>

          <motion.div
            style={{
              x: brX,
              y: brY,
              width: initialWidth,
              height: initialHeight,
              opacity: underImagesOpacity,
              borderRadius: compactViewport ? 14 : 18,
            }}
            className={cn(baseImageClasses, "z-20")}
          >
            <img
              src={images.bottomRight}
              alt="Web Vulnerability Scanner"
              className={imageClasses}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>

          <motion.div
            style={{
              x: blX,
              y: blY,
              width: initialWidth,
              height: initialHeight,
              opacity: underImagesOpacity,
              borderRadius: compactViewport ? 14 : 18,
            }}
            className={cn(baseImageClasses, "z-30")}
          >
            <img
              src={images.bottomLeft}
              alt="Imu's Music Room"
              className={imageClasses}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>

          <motion.div
            style={{
              x: trX,
              y: trY,
              width: heroWidth,
              height: heroHeight,
              borderRadius: heroRadius,
            }}
            className={cn(baseImageClasses, "z-40 origin-center bg-black")}
          >
            <img
              src={images.topRight}
              alt="Autonomous Research Agent"
              className={imageClasses}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
