"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

interface AtmosphereLayerProps {
  particleCount?: number;
  color?: string;
  className?: string;
}

export default function AtmosphereLayer({
  particleCount = 40,
  color = "var(--champagne)",
  className = "",
}: AtmosphereLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement("div");
      p.className = "atmosphere-particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.background = color;
      p.style.width = `${Math.random() * 3 + 1}px`;
      p.style.height = p.style.width;
      container.appendChild(p);
      particles.push(p);

      gsap.to(p, {
        y: -(Math.random() * 200 + 100),
        x: (Math.random() - 0.5) * 100,
        opacity: Math.random() * 0.4 + 0.1,
        duration: Math.random() * 10 + 8,
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5,
        ease: "sine.inOut",
      });
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [particleCount, color]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
