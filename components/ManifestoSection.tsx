"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const MANIFESTO_WORDS = [
  "We", "do", "not", "build", "homes.",
  "We", "summon", "worlds—",
  "suspended", "between", "earth", "and", "sky,",
  "between", "memory", "and", "impossibility.",
  "Every", "surface", "is", "a", "decision.",
  "Every", "silence,", "an", "architecture.",
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const container = wordsContainerRef.current;
    if (!section || !container) return;

    const words = container.querySelectorAll(".manifesto-word");

    const ctx = gsap.context(() => {
      // Pin the section and animate everything in a single scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        words,
        {
          opacity: 0.08,
          scale: 0.96,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          ease: "power1.out",
        }
      );

      // Animate the blockquote fade-in at the end
      const quote = section.querySelector(".manifesto-quote");
      if (quote) {
        tl.fromTo(
          quote,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out" },
          "-=0.4"
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative min-h-screen bg-[var(--background)] flex items-center justify-center overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 gradient-radial-warm pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-24">
        <SectionLabel number="01" className="mb-16 justify-center">
          MANIFESTO
        </SectionLabel>

        <div
          ref={wordsContainerRef}
          className="text-manifesto text-center leading-[1.1]"
        >
          {MANIFESTO_WORDS.map((word, i) => (
            <span
              key={i}
              className="manifesto-word inline-block mr-[0.35em] will-change-transform"
              style={{ opacity: 0.08 }}
            >
              {word}
            </span>
          ))}
        </div>

        <div className="manifesto-quote mt-20 text-center" style={{ opacity: 0 }}>
          <p className="font-editorial italic text-[clamp(1rem,2vw,1.5rem)] text-[var(--muted-ink)] max-w-xl mx-auto">
            &ldquo;Luxury is not decoration — it is precision made emotional.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
