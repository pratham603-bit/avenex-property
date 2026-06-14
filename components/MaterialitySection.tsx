"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const MATERIALS = [
  { name: "Travertine", origin: "Tuscany, Italy", image: "/images/materials/travertine.png" },
  { name: "Patinated Bronze", origin: "Hand-finished", image: "/images/materials/bronze.png" },
  { name: "Aged Oak", origin: "French forests", image: "/images/materials/oak.png" },
];

export default function MaterialitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll(".material-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <SectionLabel className="mb-6">MATERIALITY</SectionLabel>
        <h2 className="text-section-title text-[var(--ink)] mb-20">Surfaces that Breathe</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MATERIALS.map((mat) => (
            <div key={mat.name} className="material-item group cursor-pointer">
              <div className="relative aspect-square overflow-hidden rounded-xl mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/30 to-transparent" />
              </div>
              <h3 className="text-xl font-display font-bold text-[var(--ink)] mb-1">{mat.name}</h3>
              <p className="font-editorial italic text-[var(--muted-ink)] text-sm">{mat.origin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
