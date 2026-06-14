"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const AWARDS = [
  { year: "2024", title: "Architectural Digest Top 50", category: "Global Excellence" },
  { year: "2024", title: "Dezeen Awards Finalist", category: "House of the Year" },
  { year: "2023", title: "RIBA International Prize", category: "Shortlisted" },
  { year: "2023", title: "Wallpaper* Design Awards", category: "Best Private Residence" },
  { year: "2022", title: "World Architecture Festival", category: "Completed Buildings" },
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const rows = section.querySelectorAll(".award-row");
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
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
      <div className="max-w-5xl mx-auto px-8 md:px-16">
        <SectionLabel className="mb-6">RECOGNITION</SectionLabel>
        <h2 className="text-section-title text-[var(--ink)] mb-16">Awards</h2>

        <div className="space-y-0">
          {AWARDS.map((award, i) => (
            <div
              key={i}
              className="award-row flex items-center justify-between py-6 border-b border-[var(--stone)]/20 group cursor-pointer hover:pl-4 transition-all duration-500"
            >
              <div className="flex items-center gap-8">
                <span className="text-xs font-mono text-[var(--stone)] w-12">{award.year}</span>
                <span className="text-lg font-display font-medium text-[var(--ink)] group-hover:text-[var(--champagne)] transition-colors duration-300">
                  {award.title}
                </span>
              </div>
              <span className="font-editorial italic text-sm text-[var(--muted-ink)]">
                {award.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
