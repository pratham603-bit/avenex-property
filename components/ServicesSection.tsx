"use client";

import { useState, useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn, prefersReducedMotion, getAssetPath } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const SERVICES = [
  {
    id: "rent",
    title: "Rent",
    tagline: "Inhabit the Impossible",
    description:
      "Access Avenex Property residences on a seasonal basis. Each rental period includes a dedicated concierge, private chef consultation, and landscape recalibration to your preferences.",
    image: "/images/services/rent.png",
    stats: ["From €45,000/month", "Seasonal & Annual", "Full Concierge"],
  },
  {
    id: "sell",
    title: "Sell",
    tagline: "Legacy Transfer",
    description:
      "Avenex Property manages the discreet transfer of extraordinary properties between extraordinary people. Our white-glove brokerage ensures your legacy finds its rightful successor.",
    image: "/images/services/sell.png",
    stats: ["Discreet Transactions", "Global Network", "Valuation Experts"],
  },
  {
    id: "buy",
    title: "Buy",
    tagline: "Commission a World",
    description:
      "Begin with a conversation. Our architects will spend months understanding your vision before a single line is drawn. The result: a world that could only belong to you.",
    image: "/images/services/buy.png",
    stats: ["Bespoke Design", "12-36 Month Build", "Lifetime Warranty"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".service-column"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--background)] py-32"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <SectionLabel number="05" className="mb-6">
          SERVICES
        </SectionLabel>
        <h2 className="text-section-title text-[var(--ink)] mb-20">
          Three<br />Paths
        </h2>

        {/* Service Columns */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[var(--stone)]/30">
          {SERVICES.map((service, i) => (
            <div
              key={service.id}
              className={cn(
                "service-column border-b md:border-b-0 md:border-r border-[var(--stone)]/30 last:border-r-0",
                "py-12 px-8 md:px-10 cursor-pointer group",
                "transition-colors duration-500 hover:bg-[var(--champagne)]/5"
              )}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
            >
              <span className="text-[10px] font-mono text-[var(--stone)] tracking-[0.3em] block mb-6">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Service block-confined image */}
              <div className="w-full aspect-[16/10] relative overflow-hidden rounded-xl mb-8 bg-[var(--mist)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getAssetPath(service.image)}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-aureon-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/15 via-transparent to-transparent pointer-events-none" />
              </div>

              <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold text-[var(--ink)] leading-none mb-3 group-hover:text-[var(--champagne)] transition-colors duration-500">
                {service.title}
              </h3>

              <p className="font-editorial italic text-[var(--champagne)] text-base mb-8">
                {service.tagline}
              </p>

              <p className="text-sm text-[var(--muted-ink)] leading-relaxed mb-10 max-w-sm">
                {service.description}
              </p>

              {/* Stats */}
              <div className="space-y-3">
                {service.stats.map((stat, j) => (
                  <div
                    key={j}
                    className="flex items-center gap-3 text-xs text-[var(--muted-ink)]"
                  >
                    <div className="w-1 h-1 rounded-full bg-[var(--champagne)]" />
                    {stat}
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="mt-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--champagne)] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span>Explore</span>
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
                  <path d="M0 4h18m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
