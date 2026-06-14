"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import SectionLabel from "@/components/ui/SectionLabel";

const PROJECTS = [
  {
    id: "villa-01",
    title: "Villa Solara",
    subtitle: "Santorini, Greece",
    description: "A cantilevered meditation on light and limestone, suspended above the Aegean.",
    image: "/images/projects/villa-01.webp",
    stats: { area: "2,400 m²", completion: "2024", material: "Limestone & Glass" },
  },
  {
    id: "tower-01",
    title: "The Monolith",
    subtitle: "Dubai, UAE",
    description: "A vertical garden city sheathed in reactive bronze, breathing with the desert wind.",
    image: "/images/projects/tower-01.webp",
    stats: { area: "18,000 m²", completion: "2025", material: "Bronze & Basalt" },
  },
  {
    id: "estate-01",
    title: "Estate Noire",
    subtitle: "Provence, France",
    description: "Three pavilions dissolving into lavender fields, connected by water and silence.",
    image: "/images/projects/estate-01.webp",
    stats: { area: "5,800 m²", completion: "2024", material: "Oak & Travertine" },
  },
];

export default function AnthologySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax on project images
      const cards = track.querySelectorAll(".project-card");
      cards.forEach((card) => {
        const img = card.querySelector(".project-image") as HTMLElement;
        if (!img) return;

        gsap.fromTo(
          img,
          { x: -60 },
          {
            x: 60,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.("anthology-scroll") || undefined,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="anthology"
      className="relative bg-[var(--ink)] overflow-hidden"
    >
      <div className="absolute top-12 left-12 z-20">
        <SectionLabel number="02" className="text-[var(--stone)]">
          <span className="text-[var(--stone)]">ANTHOLOGY</span>
        </SectionLabel>
      </div>

      <div
        ref={trackRef}
        className="flex items-stretch h-screen will-change-transform"
      >
        {/* Title Card */}
        <div className="flex-shrink-0 w-[45vw] flex flex-col justify-center px-16">
          <h2 className="text-section-title text-white mb-6">
            Private<br />Worlds
          </h2>
          <p className="font-editorial italic text-[clamp(1rem,1.5vw,1.25rem)] text-[var(--stone)] max-w-md">
            Each Avenex Property project is a singular universe — unrepeatable, site-specific, and emotionally calibrated to its inhabitant.
          </p>
        </div>

        {/* Project Cards */}
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card flex-shrink-0 w-[65vw] h-screen flex items-center px-8 group"
          >
            <div className="relative w-full h-[75vh] rounded-2xl overflow-hidden bg-[#1a1714]">
              {/* Image with parallax */}
              <div className="project-image absolute inset-[-60px] will-change-transform">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17130F] via-transparent to-transparent opacity-80" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <span className="text-[10px] font-mono text-[var(--champagne)] tracking-[0.3em] mb-4 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(2rem,4vw,4rem)] font-display font-bold text-white leading-none mb-2">
                  {project.title}
                </h3>
                <p className="font-editorial italic text-[var(--stone)] text-lg mb-6">
                  {project.subtitle}
                </p>
                <p className="text-white/60 text-sm max-w-md leading-relaxed mb-8">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex gap-12">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--stone)] block mb-1">
                        {key}
                      </span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border border-[var(--champagne)]/0 group-hover:border-[var(--champagne)]/20 rounded-2xl transition-all duration-700" />
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[20vw]" />
      </div>
    </section>
  );
}
