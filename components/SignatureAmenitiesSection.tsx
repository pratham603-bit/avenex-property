"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const AMENITIES = [
  {
    title: "Private Spa",
    subtitle: "Basalt & Steam",
    description:
      "A subterranean sanctuary carved from volcanic basalt, where geothermal pools meet cold-plunge chambers in perpetual mist.",
    image: "/images/amenities/spa.png",
  },
  {
    title: "Art Vault",
    subtitle: "Climate-Controlled Gallery",
    description:
      "A climate-controlled underground gallery engineered to museum-grade specifications, protecting your collection for generations.",
    image: "/images/amenities/vault.png",
  },
  {
    title: "Infinity Pool",
    subtitle: "Zero-Edge Horizon",
    description:
      "A zero-edge pool that dissolves into the horizon line, engineered to create the optical illusion of water meeting sky.",
    image: "/images/amenities/pool.png",
  },
];

export default function SignatureAmenitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item) => {
        if (!item) return;

        const image = item.querySelector(".amenity-image") as HTMLElement;
        const curtain = item.querySelector(".amenity-curtain") as HTMLElement;
        const text = item.querySelector(".amenity-text") as HTMLElement;

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.2, y: 40 },
            {
              scale: 1,
              y: -40,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        if (curtain) {
          gsap.fromTo(
            curtain,
            { scaleY: 1 },
            {
              scaleY: 0,
              transformOrigin: "top",
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item,
                start: "top 75%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 60%",
                end: "top 30%",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-48 bg-[var(--surface)]"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <SectionLabel number="04" className="mb-6">
          SIGNATURE AMENITIES
        </SectionLabel>
        <h2 className="text-section-title text-[var(--ink)] mb-24">
          Beyond<br />Luxury
        </h2>

        <div className="space-y-32 md:space-y-48">
          {AMENITIES.map((amenity, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 md:gap-20 items-center`}
            >
              {/* Image */}
              <div className="w-full md:w-3/5 relative overflow-hidden rounded-xl aspect-[4/3]">
                <div className="amenity-image absolute inset-[-40px] will-change-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Curtain reveal */}
                <div
                  className="amenity-curtain absolute inset-0 bg-[var(--surface)] z-10"
                  style={{ transformOrigin: "top" }}
                />
              </div>

              {/* Text */}
              <div className="amenity-text w-full md:w-2/5">
                <span className="text-[10px] font-mono text-[var(--champagne)] tracking-[0.3em] block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.8rem,3vw,3rem)] font-display font-bold text-[var(--ink)] leading-none mb-2">
                  {amenity.title}
                </h3>
                <p className="font-editorial italic text-[var(--champagne)] text-lg mb-6">
                  {amenity.subtitle}
                </p>
                <p className="text-section-body text-[var(--muted-ink)] leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
