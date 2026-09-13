"use client";

import PortfolioHero from "@/components/ui/portfolio-hero";
import { SilkAurora } from "@/components/ui/silk-aurora";

export default function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#050507]">
      {/* Componentry — Silk Aurora */}
      <div className="absolute inset-0 z-0">
        <SilkAurora
          className="h-full min-h-[100svh]"
          baseColor="#050507"
          midColor="#120B18"
          sheenColor="#C7C7D2"
          accentColor="#7C3AED"
          speed={0.65}
          intensity={0.85}
          grain={0.7}
          vignette={1.15}
          mouseInfluence={0.55}
          interactive
        />
      </div>

      {/* 21st.dev — Portfolio Hero */}
      <div className="relative z-10">
        <PortfolioHero />
      </div>
    </section>
  );
}