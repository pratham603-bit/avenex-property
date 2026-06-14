"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

interface SplitTextRevealProps {
  children: string;
  className?: string;
  splitBy?: "word" | "char";
  stagger?: number;
  trigger?: string;
  start?: string;
  end?: string;
}

export default function SplitTextReveal({
  children,
  className,
  splitBy = "word",
  stagger = 0.03,
  trigger,
  start = "top 85%",
  end = "top 20%",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".split-unit");
    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: 30, rotateX: 40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger ? document.querySelector(trigger) : container,
            start,
            end,
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [children, stagger, trigger, start, end]);

  const units =
    splitBy === "word"
      ? children.split(" ").map((word, i) => (
        <span key={i} className="split-unit inline-block" style={{ perspective: "600px" }}>
          {word}&nbsp;
        </span>
      ))
      : children.split("").map((char, i) => (
        <span key={i} className="split-unit inline-block" style={{ perspective: "600px" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ));

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {units}
    </div>
  );
}
