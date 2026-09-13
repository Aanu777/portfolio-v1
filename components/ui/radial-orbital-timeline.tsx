"use client";

import {
  useEffect,
  useState,
  type ElementType,
} from "react";

import {
  ArrowRight,
  Link,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: ElementType;
  relatedIds: number[];
  status: "active" | "built" | "exploring";

  /**
   * Controls visual aura size only.
   * It is NOT displayed as a skill percentage.
   */
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  className?: string;
  centerLabel?: string;
  centerSubLabel?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  className,
  centerLabel = "AYAN",
  centerSubLabel = "ENGINEERING PATH",
}: RadialOrbitalTimelineProps) {
  /*
   * Nodes intentionally wait until after hydration.
   *
   * This removes SSR/browser style serialization
   * differences from calculated transforms.
   */
  const [mounted, setMounted] =
    useState(false);

  const [expandedItems, setExpandedItems] =
    useState<Record<number, boolean>>({});

  const [rotationAngle, setRotationAngle] =
    useState(0);

  const [autoRotate, setAutoRotate] =
    useState(true);

  const [pulseEffect, setPulseEffect] =
    useState<Record<number, boolean>>({});

  const [activeNodeId, setActiveNodeId] =
    useState<number | null>(null);

  const [orbitRadius, setOrbitRadius] =
    useState(270);

  /* ======================================================
     MOUNT
  ====================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* ======================================================
     RESPONSIVE ORBIT
  ====================================================== */

  useEffect(() => {
    const updateGeometry = () => {
      const width = window.innerWidth;

      if (width >= 1440) {
        setOrbitRadius(285);
        return;
      }

      if (width >= 1200) {
        setOrbitRadius(270);
        return;
      }

      if (width >= 1024) {
        setOrbitRadius(245);
        return;
      }

      if (width >= 768) {
        setOrbitRadius(215);
        return;
      }

      if (width >= 640) {
        setOrbitRadius(145);
        return;
      }

      if (width >= 480) {
        setOrbitRadius(138);
        return;
      }

      if (width >= 380) {
        setOrbitRadius(126);
        return;
      }

      setOrbitRadius(118);
    };

    updateGeometry();

    window.addEventListener(
      "resize",
      updateGeometry
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateGeometry
      );
    };
  }, []);

  /* ======================================================
     AUTO ROTATION
  ====================================================== */

  useEffect(() => {
    if (!mounted) {
      return;
    }

    let rotationTimer:
      | ReturnType<typeof setInterval>
      | undefined;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((previous) => {
          const next =
            (previous + 0.16) % 360;

          return Number(
            next.toFixed(3)
          );
        });
      }, 40);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, mounted]);

  /* ======================================================
     HELPERS
  ====================================================== */

  const getRelatedItems = (
    itemId: number
  ): number[] => {
    const currentItem =
      timelineData.find(
        (item) =>
          item.id === itemId
      );

    return currentItem
      ? currentItem.relatedIds
      : [];
  };

  const isRelatedToActive = (
    itemId: number
  ) => {
    if (!activeNodeId) {
      return false;
    }

    return getRelatedItems(
      activeNodeId
    ).includes(itemId);
  };

  const centerViewOnNode = (
    nodeId: number
  ) => {
    const nodeIndex =
      timelineData.findIndex(
        (item) =>
          item.id === nodeId
      );

    if (nodeIndex === -1) {
      return;
    }

    const totalNodes =
      timelineData.length;

    const targetAngle =
      (nodeIndex /
        totalNodes) *
      360;

    /*
     * Selected node sits at 12 o'clock.
     */
    setRotationAngle(
      270 - targetAngle
    );
  };

  const calculateNodePosition = (
    index: number,
    total: number
  ) => {
    const angle =
      ((index / total) * 360 +
        rotationAngle) %
      360;

    const radians =
      (angle * Math.PI) /
      180;

    /*
     * Rounded values prevent long floating point
     * differences from entering DOM styles.
     */
    const x = Number(
      (
        orbitRadius *
        Math.cos(radians)
      ).toFixed(3)
    );

    const y = Number(
      (
        orbitRadius *
        Math.sin(radians)
      ).toFixed(3)
    );

    const depth =
      (Math.sin(radians) + 1) /
      2;

    const opacity = Number(
      (
        0.58 +
        depth * 0.42
      ).toFixed(4)
    );

    const zIndex =
      Math.round(
        80 + depth * 40
      );

    return {
      x,
      y,
      opacity,
      zIndex,
    };
  };

  const getStatusStyles = (
    status: TimelineItem["status"]
  ) => {
    switch (status) {
      case "active":
        return `
          border-[#A81732]/55
          bg-[#A81732]/15
          text-[#F7BAC5]
        `;

      case "built":
        return `
          border-[#7C3AED]/50
          bg-[#7C3AED]/15
          text-[#D8C8FF]
        `;

      case "exploring":
        return `
          border-white/15
          bg-white/[0.05]
          text-[#C7C7D2]
        `;
    }
  };

  const getStatusLabel = (
    status: TimelineItem["status"]
  ) => {
    switch (status) {
      case "active":
        return "ACTIVE";

      case "built":
        return "BUILT";

      case "exploring":
        return "EXPLORING";
    }
  };

  /* ======================================================
     INTERACTION
  ====================================================== */

  const toggleItem = (
    id: number
  ) => {
    const currentlyOpen =
      Boolean(expandedItems[id]);

    if (currentlyOpen) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);

      return;
    }

    const relatedItems =
      getRelatedItems(id);

    const newPulseEffect:
      Record<number, boolean> =
      {};

    relatedItems.forEach(
      (relatedId) => {
        newPulseEffect[
          relatedId
        ] = true;
      }
    );

    setExpandedItems({
      [id]: true,
    });

    setActiveNodeId(id);

    setPulseEffect(
      newPulseEffect
    );

    setAutoRotate(false);

    centerViewOnNode(id);
  };

  const closeActiveNode = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  /* ======================================================
     ORBIT SIZES
  ====================================================== */

  const primaryOrbitSize =
    orbitRadius * 2;

  const secondaryOrbitSize =
    orbitRadius * 1.48;

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div
      onClick={closeActiveNode}
      className={cn(
        `
        relative
        flex
        h-[700px]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#050507]

        min-[420px]:h-[740px]
        sm:h-[800px]
        lg:h-[900px]
        `,
        className
      )}
    >
      {/* Background */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0

          bg-[radial-gradient(circle_at_50%_47%,rgba(124,58,237,0.10),transparent_26%),radial-gradient(circle_at_35%_64%,rgba(168,23,50,0.07),transparent_30%)]
        "
      />

      {/* Primary orbit */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-white/[0.065]
        "
        style={{
          width: primaryOrbitSize,
          height: primaryOrbitSize,
        }}
      />

      {/* Secondary orbit */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-white/[0.035]
        "
        style={{
          width: secondaryOrbitSize,
          height: secondaryOrbitSize,
        }}
      />

      {/* ==================================================
          CENTER CORE
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-20

          flex
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          items-center
        "
      >
        <div
          className="
            relative

            flex
            h-[78px]
            w-[78px]

            sm:h-[92px]
            sm:w-[92px]
            items-center
            justify-center

            rounded-full

            border
            border-white/[0.14]

            bg-[radial-gradient(circle_at_30%_25%,rgba(199,199,210,0.24),rgba(124,58,237,0.23)_38%,rgba(168,23,50,0.14)_70%,rgba(5,5,7,0.96))]

            shadow-[0_0_90px_rgba(124,58,237,0.16)]

            backdrop-blur-xl
          "
        >
          <div
            className="
              absolute
              -inset-5

              animate-pulse

              rounded-full

              border
              border-white/[0.05]
            "
          />

          <span
            className="
              font-mono
              text-[10px]
              font-semibold

              sm:text-[11px]
              tracking-[0.22em]
              text-[#F2F0F3]
            "
          >
            {centerLabel}
          </span>
        </div>

        <span
          className="
            mt-4
            max-w-[120px]
            text-center

            font-mono

            sm:mt-5
            text-[8px]
            uppercase
            tracking-[0.26em]
            text-white/25

            sm:text-[9px]
          "
        >
          {centerSubLabel}
        </span>
      </div>

      {/* ==================================================
          NODES

          Client-only on purpose.
      ================================================== */}

      {mounted &&
        timelineData.map(
          (item, index) => {
            const position =
              calculateNodePosition(
                index,
                timelineData.length
              );

            const isExpanded =
              Boolean(
                expandedItems[
                  item.id
                ]
              );

            const isRelated =
              isRelatedToActive(
                item.id
              );

            const isPulsing =
              Boolean(
                pulseEffect[
                  item.id
                ]
              );

            const Icon =
              item.icon;

            return (
              <div
                key={item.id}
                style={{
                  /*
                   * No calc(-50% + -123px).
                   *
                   * This avoids browser normalization
                   * creating hydration differences.
                   */
                  transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, 0)`,
                  zIndex:
                    isExpanded
                      ? 200
                      : position.zIndex,
                  opacity:
                    isExpanded
                      ? 1
                      : position.opacity,
                }}
                onClick={(
                  event
                ) => {
                  event.stopPropagation();

                  toggleItem(
                    item.id
                  );
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2

                  cursor-pointer

                  transition-[transform,opacity]
                  duration-700

                  ease-[cubic-bezier(0.16,1,0.3,1)]
                "
              >
                {/* Aura */}

                <div
                  className={cn(
                    `
                    pointer-events-none

                    absolute
                    left-1/2
                    top-1/2

                    -translate-x-1/2
                    -translate-y-1/2

                    rounded-full
                    `,
                    isPulsing &&
                      "animate-pulse"
                  )}
                  style={{
                    width: `${
                      42 +
                      item.energy *
                        0.48
                    }px`,

                    height: `${
                      42 +
                      item.energy *
                        0.48
                    }px`,

                    background:
                      "radial-gradient(circle, rgba(124,58,237,0.17) 0%, rgba(168,23,50,0.055) 45%, transparent 72%)",
                  }}
                />

                {/* Node */}

                <div
                  className={cn(
                    `
                    relative

                    flex
                    h-10
                    w-10

                    sm:h-11
                    sm:w-11

                    items-center
                    justify-center

                    rounded-full

                    border

                    transition-all
                    duration-500

                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    `,

                    isExpanded
                      ? `
                        scale-[1.35]

                        border-[#A81732]

                        bg-[#A81732]

                        text-white

                        shadow-[0_0_35px_rgba(168,23,50,0.4)]
                      `
                      : isRelated
                        ? `
                          scale-110

                          border-[#7C3AED]/80

                          bg-[#7C3AED]/25

                          text-white

                          shadow-[0_0_30px_rgba(124,58,237,0.28)]
                        `
                        : `
                          border-white/20

                          bg-[#0C0C10]

                          text-[#C7C7D2]

                          hover:scale-110
                          hover:border-white/45
                          hover:bg-white/[0.06]
                        `
                  )}
                >
                  <Icon size={16} />
                </div>

                {/* Label */}

                <div
                  className={cn(
                    `
                    absolute

                    left-1/2
                    top-[52px]

                    w-[76px]
                    -translate-x-1/2

                    text-center
                    font-mono

                    text-[7px]
                    font-semibold
                    leading-[1.25]

                    uppercase

                    tracking-[0.1em]

                    transition-all
                    duration-300

                    sm:top-[58px]
                    sm:w-auto
                    sm:whitespace-nowrap
                    sm:text-[10px]
                    sm:tracking-[0.18em]
                    `,
                    isExpanded
                      ? "text-white"
                      : "text-white/40"
                  )}
                >
                  {item.title}
                </div>

                {/* ==========================================
                    EXPANDED CARD
                ========================================== */}

                {isExpanded && (
                  <Card
                    onClick={(
                      event
                    ) => {
                      event.stopPropagation();
                    }}
                    className="
                      absolute

                      left-1/2
                      top-[76px]

                      w-[88vw]
                      max-w-[310px]

                      sm:top-[88px]

                      -translate-x-1/2

                      overflow-visible

                      rounded-[16px]

                      border-white/[0.18]

                      bg-[#09090C]/[0.97]

                      text-[#F2F0F3]

                      shadow-[0_32px_100px_rgba(0,0,0,0.72)]

                      backdrop-blur-xl
                    "
                  >
                    {/* Connector */}

                    <div
                      className="
                        absolute
                        -top-6
                        left-1/2

                        h-6
                        w-px

                        -translate-x-1/2

                        bg-gradient-to-b
                        from-[#A81732]/60
                        to-white/15
                      "
                    />

                    <CardHeader
                      className="
                        px-4
                        pb-3
                        pt-4

                        sm:px-5
                        sm:pb-4
                        sm:pt-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-5
                          pr-7
                        "
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            `
                            rounded-full

                            px-2.5
                            py-1

                            font-mono

                            text-[8px]

                            uppercase

                            tracking-[0.15em]
                            `,
                            getStatusStyles(
                              item.status
                            )
                          )}
                        >
                          {getStatusLabel(
                            item.status
                          )}
                        </Badge>

                        <span
                          className="
                            whitespace-nowrap

                            font-mono

                            text-[9px]

                            uppercase

                            tracking-[0.15em]

                            text-white/30
                          "
                        >
                          {item.date}
                        </span>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={(
                          event
                        ) => {
                          event.stopPropagation();

                          closeActiveNode();
                        }}
                        className="
                          absolute
                          right-2.5
                          top-2.5

                          h-7
                          w-7

                          rounded-full

                          text-white/30

                          hover:bg-white/[0.06]
                          hover:text-white
                        "
                      >
                        <X size={13} />
                      </Button>

                      <div className="pt-4">
                        <CardTitle
                          className="
                            text-[18px]
                            leading-none

                            sm:text-[21px]

                            tracking-[-0.045em]

                            text-[#F2F0F3]
                          "
                        >
                          {item.title}
                        </CardTitle>

                        <p
                          className="
                            mt-2.5

                            font-mono

                            text-[8px]

                            uppercase

                            tracking-[0.2em]

                            text-[#A81732]
                          "
                        >
                          {item.category}
                        </p>
                      </div>
                    </CardHeader>

                    <CardContent
                      className="
                        px-4
                        pb-4
                        pt-0

                        sm:px-5
                        sm:pb-5
                      "
                    >
                      <p
                        className="
                          text-[12px]

                          leading-[1.7]

                          sm:text-[13px]
                          sm:leading-[1.75]

                          text-[#A6A2AB]
                        "
                      >
                        {item.content}
                      </p>

                      {item.relatedIds
                        .length >
                        0 && (
                        <div
                          className="
                            mt-6

                            border-t

                            border-white/[0.075]

                            pt-4
                          "
                        >
                          <div
                            className="
                              mb-3.5

                              flex
                              items-center
                              gap-2

                              font-mono

                              text-[8px]

                              uppercase

                              tracking-[0.18em]

                              text-white/30
                            "
                          >
                            <Link
                              size={10}
                            />

                            CONNECTED NODES
                          </div>

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-2
                            "
                          >
                            {item.relatedIds.map(
                              (
                                relatedId
                              ) => {
                                const relatedItem =
                                  timelineData.find(
                                    (
                                      candidate
                                    ) =>
                                      candidate.id ===
                                      relatedId
                                  );

                                if (
                                  !relatedItem
                                ) {
                                  return null;
                                }

                                return (
                                  <Button
                                    key={
                                      relatedId
                                    }
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={(
                                      event
                                    ) => {
                                      event.stopPropagation();

                                      toggleItem(
                                        relatedId
                                      );
                                    }}
                                    className="
                                      h-7

                                      rounded-full

                                      border-white/[0.12]

                                      bg-transparent

                                      px-3

                                      font-mono

                                      text-[8px]

                                      uppercase

                                      tracking-[0.12em]

                                      text-white/45

                                      transition-all

                                      hover:border-[#7C3AED]/60
                                      hover:bg-[#7C3AED]/10
                                      hover:text-white
                                    "
                                  >
                                    {
                                      relatedItem.title
                                    }

                                    <ArrowRight
                                      size={
                                        9
                                      }
                                      className="ml-1.5"
                                    />
                                  </Button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          }
        )}

      {/* Hint */}

      <div
        className="
          pointer-events-none

          absolute
          bottom-4

          sm:bottom-8
          left-1/2

          -translate-x-1/2

          whitespace-nowrap

          font-mono

          text-[8px]

          uppercase

          tracking-[0.22em]

          text-white/20

          sm:text-[9px]
        "
      >
        CLICK A NODE · ORBIT AUTO-ROTATES
      </div>
    </div>
  );
}