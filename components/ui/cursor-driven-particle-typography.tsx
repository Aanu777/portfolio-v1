"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export interface CursorDrivenParticleTypographyProps {
  className?: string;
  text: string;
  fontSize?: number;
  fontFamily?: string;
  particleSize?: number;
  particleDensity?: number;
  dispersionStrength?: number;
  returnSpeed?: number;
  color?: string;
}

class Particle {
  x: number;
  y: number;

  originX: number;
  originY: number;

  vx: number;
  vy: number;

  size: number;
  color: string;

  dispersion: number;
  returnSpd: number;

  constructor(
    x: number,
    y: number,
    size: number,
    color: string,
    dispersion: number,
    returnSpd: number
  ) {
    this.x = x + (Math.random() - 0.5) * 10;
    this.y = y + (Math.random() - 0.5) * 10;

    this.originX = x;
    this.originY = y;

    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;

    this.size = size;
    this.color = color;

    this.dispersion = dispersion;
    this.returnSpd = returnSpd;
  }

  update(mouseX: number, mouseY: number) {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const interactionRadius = 120;

    if (
      distance > 0 &&
      distance < interactionRadius &&
      mouseX !== -1000 &&
      mouseY !== -1000
    ) {
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;

      const force =
        (interactionRadius - distance) /
        interactionRadius;

      this.vx -=
        forceDirectionX *
        force *
        this.dispersion;

      this.vy -=
        forceDirectionY *
        force *
        this.dispersion;
    }

    this.vx +=
      (this.originX - this.x) *
      this.returnSpd;

    this.vy +=
      (this.originY - this.y) *
      this.returnSpd;

    this.vx *= 0.85;
    this.vy *= 0.85;

    const distToOrigin = Math.sqrt(
      Math.pow(this.x - this.originX, 2) +
        Math.pow(this.y - this.originY, 2)
    );

    if (
      distToOrigin < 1 &&
      Math.random() > 0.95
    ) {
      this.vx +=
        (Math.random() - 0.5) * 0.2;

      this.vy +=
        (Math.random() - 0.5) * 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }
}

export function CursorDrivenParticleTypography({
  className,
  text,
  fontSize = 120,
  fontFamily = "Inter, sans-serif",
  particleSize = 1.5,
  particleDensity = 6,
  dispersionStrength = 15,
  returnSpeed = 0.08,
  color,
}: CursorDrivenParticleTypographyProps) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    if (!ctx) return;

    let animationFrameId = 0;
    let initFrameId = 0;
    let timeoutId = 0;

    let particles: Particle[] = [];

    let mouseX = -1000;
    let mouseY = -1000;

    let containerWidth = 0;
    let containerHeight = 0;

    const init = () => {
      /*
       * getBoundingClientRect is more reliable during
       * responsive/sticky layouts than clientWidth alone.
       */
      const rect =
        container.getBoundingClientRect();

      containerWidth = Math.floor(rect.width);
      containerHeight = Math.floor(rect.height);

      /*
       * ResizeObserver may run while this section is
       * temporarily 0×0.
       *
       * Never call getImageData in that state.
       */
      if (
        containerWidth < 2 ||
        containerHeight < 2
      ) {
        particles = [];
        return;
      }

      const compactViewport = window.matchMedia("(max-width: 767px)").matches;

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        compactViewport ? 1.35 : 2
      );

      const pixelWidth = Math.max(
        1,
        Math.floor(containerWidth * dpr)
      );

      const pixelHeight = Math.max(
        1,
        Math.floor(containerHeight * dpr)
      );

      canvas.width = pixelWidth;
      canvas.height = pixelHeight;

      canvas.style.width =
        `${containerWidth}px`;

      canvas.style.height =
        `${containerHeight}px`;

      /*
       * init() can execute repeatedly, so always reset
       * the canvas transformation before scaling again.
       */
      ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
      );

      ctx.scale(dpr, dpr);

      const computedStyle =
        window.getComputedStyle(container);

      const textColor =
        color ||
        computedStyle.color ||
        "#ffffff";

      ctx.clearRect(
        0,
        0,
        containerWidth,
        containerHeight
      );

      const effectiveFontSize = Math.max(
        22,
        Math.min(
          fontSize,
          containerWidth * (compactViewport ? 0.145 : 0.15)
        )
      );

      ctx.fillStyle = textColor;

      ctx.font =
        `bold ${effectiveFontSize}px ${fontFamily}`;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(
        text,
        containerWidth / 2,
        containerHeight / 2
      );

      /*
       * Critical safety check immediately before
       * getImageData().
       */
      if (
        canvas.width <= 0 ||
        canvas.height <= 0
      ) {
        particles = [];
        return;
      }

      let textCoordinates: ImageData;

      try {
        textCoordinates =
          ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
      } catch {
        particles = [];
        return;
      }

      particles = [];

      const effectiveDensity = compactViewport
        ? particleDensity * 1.55
        : particleDensity;

      const step = Math.max(
        1,
        Math.floor(
          effectiveDensity * dpr
        )
      );

      for (
        let y = 0;
        y < textCoordinates.height;
        y += step
      ) {
        for (
          let x = 0;
          x < textCoordinates.width;
          x += step
        ) {
          const index =
            (y *
              textCoordinates.width +
              x) *
            4;

          const alpha =
            textCoordinates.data[
              index + 3
            ] || 0;

          if (alpha > 128) {
            particles.push(
              new Particle(
                x / dpr,
                y / dpr,
                particleSize,
                textColor,
                dispersionStrength,
                returnSpeed
              )
            );
          }
        }
      }

      /*
       * Remove the temporary text rendering.
       * Only particles should remain visible.
       */
      ctx.clearRect(
        0,
        0,
        containerWidth,
        containerHeight
      );
    };

    const scheduleInit = () => {
      cancelAnimationFrame(initFrameId);

      initFrameId =
        requestAnimationFrame(() => {
          init();
        });
    };

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        Math.max(containerWidth, 1),
        Math.max(containerHeight, 1)
      );

      particles.forEach(
        (particle) => {
          particle.update(
            mouseX,
            mouseY
          );

          particle.draw(ctx);
        }
      );

      animationFrameId =
        requestAnimationFrame(
          animate
        );
    };

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      mouseX =
        event.clientX - rect.left;

      mouseY =
        event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleTouchMove = (
      event: TouchEvent
    ) => {
      const touch =
        event.touches[0];

      if (!touch) return;

      const rect =
        canvas.getBoundingClientRect();

      mouseX =
        touch.clientX - rect.left;

      mouseY =
        touch.clientY - rect.top;
    };

    const resizeObserver =
      new ResizeObserver(() => {
        scheduleInit();
      });

    resizeObserver.observe(container);

    const themeObserver =
      new MutationObserver(() => {
        scheduleInit();
      });

    themeObserver.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    canvas.addEventListener(
      "mousemove",
      handleMouseMove
    );

    canvas.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    canvas.addEventListener(
      "touchstart",
      handleTouchMove
    );

    canvas.addEventListener(
      "touchmove",
      handleTouchMove
    );

    canvas.addEventListener(
      "touchend",
      handleMouseLeave
    );

    timeoutId = window.setTimeout(
      async () => {
        try {
          await document.fonts?.ready;
        } catch {
          // Continue with fallback font.
        }

        scheduleInit();
        animate();
      },
      100
    );

    return () => {
      window.clearTimeout(timeoutId);

      cancelAnimationFrame(
        animationFrameId
      );

      cancelAnimationFrame(
        initFrameId
      );

      resizeObserver.disconnect();
      themeObserver.disconnect();

      canvas.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      canvas.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      canvas.removeEventListener(
        "touchstart",
        handleTouchMove
      );

      canvas.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      canvas.removeEventListener(
        "touchend",
        handleMouseLeave
      );
    };
  }, [
    text,
    fontSize,
    fontFamily,
    particleSize,
    particleDensity,
    dispersionStrength,
    returnSpeed,
    color,
  ]);

  return (
    <div
      ref={containerRef}
      className={cn(
        `
        relative
        flex
        h-full
        min-h-[240px]
        w-full
        items-center
        justify-center
        touch-pan-y

        sm:min-h-[320px]
        `,
        className
      )}
    >
      <canvas
        ref={canvasRef}
        className="
          block
          h-full
          w-full
        "
      />
    </div>
  );
}