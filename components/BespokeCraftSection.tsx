"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const CRAFT_IMAGES = [
  { src: "/images/craft/stone-closeup.webp", alt: "Stone texture close-up" },
  { src: "/images/craft/glass-reflection.webp", alt: "Glass reflection detail" },
  { src: "/images/craft/water-detail.webp", alt: "Water surface detail" },
  { src: "/images/craft/blueprint-detail.webp", alt: "Architectural blueprint" },
];

export default function BespokeCraftSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const images = section.querySelectorAll(".craft-image");
      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <SectionLabel className="mb-6">BESPOKE CRAFT</SectionLabel>
        <h2 className="text-section-title text-[var(--ink)] mb-16">Details that Define</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CRAFT_IMAGES.map((img, i) => (
            <div
              key={i}
              className="craft-image relative aspect-[3/4] overflow-hidden rounded-lg group cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[var(--ink)]/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
