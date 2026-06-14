"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ConciergeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".concierge-reveal"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
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
    <section ref={sectionRef} className="relative py-32 bg-[var(--ink)]">
      <div className="max-w-4xl mx-auto px-8 md:px-16 text-center">
        <SectionLabel className="mb-8 justify-center concierge-reveal">
          <span className="text-[var(--stone)]">CONCIERGE</span>
        </SectionLabel>

        <h2 className="concierge-reveal text-section-title text-white mb-8">
          White Glove<br />Service
        </h2>

        <p className="concierge-reveal text-[var(--stone)] text-section-body max-w-lg mx-auto mb-12">
          Every Avenex Property residence comes with a dedicated concierge team — from landscape architects
          to private chefs, curated to your exact specifications.
        </p>

        <div className="concierge-reveal">
          <MagneticButton ariaLabel="Learn more about concierge services">
            <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--champagne)]/30 text-[var(--champagne)] text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--champagne)]/10 transition-colors duration-500">
              Discover More
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
