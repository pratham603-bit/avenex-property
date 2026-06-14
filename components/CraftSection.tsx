"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import dynamic from "next/dynamic";

const ThreeArchitecturalFragment = dynamic(
  () => import("@/components/ThreeArchitecturalFragment"),
  { ssr: false }
);

const CRAFT_SEQUENCE = [
  {
    label: "PHILOSOPHY",
    title: "Architecture\nis Emotion",
    body: "We reject the idea that structure is merely functional. Every Avenex Property creation begins with a feeling — a quality of light, a memory of stone, a silence that needs to be housed.",
  },
  {
    label: "PROCESS",
    title: "From Earth\nto Ether",
    body: "Our architects spend months on site before a single line is drawn. We study the wind, the soil, the arc of the sun. The land speaks first — we translate.",
  },
  {
    label: "MATERIAL",
    title: "Surfaces\nthat Breathe",
    body: "Travertine quarried by hand. Bronze patinated by saltwater and time. Oak aged for decades. Every material carries a biography that becomes part of your world.",
  },
];

export default function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sequenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
      });

      // Animate each text sequence
      sequenceRefs.current.forEach((el, i) => {
        if (!el) return;

        const startPct = (i / CRAFT_SEQUENCE.length) * 100;
        const endPct = ((i + 1) / CRAFT_SEQUENCE.length) * 100;

        // Fade in
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: `${startPct}% top`,
              end: `${startPct + 10}% top`,
              scrub: true,
            },
          }
        );

        // Fade out (except last)
        if (i < CRAFT_SEQUENCE.length - 1) {
          gsap.to(el, {
            opacity: 0,
            y: -40,
            ease: "power2.in",
            scrollTrigger: {
              trigger: section,
              start: `${endPct - 10}% top`,
              end: `${endPct}% top`,
              scrub: true,
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="craft"
      className="relative min-h-screen bg-[var(--background)] overflow-hidden"
    >
      {/* 3D Model Background */}
      <div className="absolute inset-0 z-0">
        <ThreeArchitecturalFragment />
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-xl">
            <SectionLabel number="03" className="mb-12">
              THE CRAFT
            </SectionLabel>

            <div className="relative min-h-[300px]">
              {CRAFT_SEQUENCE.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => { sequenceRefs.current[i] = el; }}
                  className="absolute top-0 left-0 will-change-transform"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <span className="text-section-label text-[var(--champagne)] block mb-6">
                    {item.label}
                  </span>
                  <h2 className="text-section-title text-[var(--ink)] whitespace-pre-line mb-8">
                    {item.title}
                  </h2>
                  <p className="text-section-body text-[var(--muted-ink)] max-w-md leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
