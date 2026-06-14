"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export default function CloudTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cloudLayers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cloudLayers.current.forEach((layer, i) => {
        if (!layer) return;
        const speed = 1 + i * 0.5;
        gsap.fromTo(
          layer,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: -100 * speed,
            opacity: i === 0 ? 0.6 : 0.8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-[50vh] overflow-hidden pointer-events-none z-20"
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { cloudLayers.current[i] = el; }}
          className="absolute inset-0"
          style={{
            mixBlendMode: "screen",
            filter: `blur(${(2 - i) * 4}px)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cloud-overlay.png"
            alt=""
            className="w-full h-full object-cover"
            style={{
              transform: i % 2 === 0 ? "scaleX(-1)" : "none",
            }}
          />
        </div>
      ))}
    </div>
  );
}
