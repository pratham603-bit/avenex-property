"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

export default function PrivateAccessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spotlight.style.background = `radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(200, 169, 106, 0.12) 0%,
        rgba(200, 169, 106, 0.04) 30%,
        transparent 70%
      )`;
    };

    section.addEventListener("mousemove", handleMouseMove);

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.9, filter: "blur(20px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 50%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#17130F] py-32 md:py-48 overflow-hidden"
    >
      {/* Spotlight effect */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-300"
      />

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Content */}
          <div ref={contentRef} className="w-full md:w-1/2">
            <SectionLabel number="06" className="mb-6">
              <span className="text-[var(--stone)]">PRIVATE ACCESS</span>
            </SectionLabel>

            <h2 className="text-section-title text-white mb-8">
              By Invitation<br />Only
            </h2>

            <p className="text-[var(--stone)] text-section-body leading-relaxed mb-8 max-w-md">
              Avenex Property does not advertise. We do not compete. Our clients find us through
              a network of trust built over decades — architects, collectors, heads of state,
              and those who shape the world quietly.
            </p>

            <p className="font-editorial italic text-[var(--champagne)] text-lg mb-12">
              &ldquo;If you have to explain luxury, you have already lost it.&rdquo;
            </p>

            <div className="flex gap-8">
              <div>
                <span className="text-[var(--champagne)] text-3xl font-display font-bold">47</span>
                <span className="text-[var(--stone)] text-xs block mt-1 tracking-wider uppercase">
                  Active Worlds
                </span>
              </div>
              <div>
                <span className="text-[var(--champagne)] text-3xl font-display font-bold">12</span>
                <span className="text-[var(--stone)] text-xs block mt-1 tracking-wider uppercase">
                  Countries
                </span>
              </div>
              <div>
                <span className="text-[var(--champagne)] text-3xl font-display font-bold">∞</span>
                <span className="text-[var(--stone)] text-xs block mt-1 tracking-wider uppercase">
                  Patience
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="w-full md:w-1/2">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/private-mansion.png"
                alt="Ultra-luxury private mansion at night"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] via-transparent to-[#17130F]/30" />

              {/* Floating label */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-warm rounded-xl px-6 py-4 bg-[rgba(23,19,15,0.7)] border-[rgba(200,169,106,0.15)]">
                  <p className="text-white text-xs tracking-[0.15em] uppercase">
                    Estate Lumière — Côte d&apos;Azur
                  </p>
                  <p className="text-[var(--stone)] text-[10px] mt-1">
                    Commission completed 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
