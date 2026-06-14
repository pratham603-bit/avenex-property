"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion, AnimatePresence } from "framer-motion";
import { cn, prefersReducedMotion } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Atmospheric particles
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    let animFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: 0,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    });

    for (let i = 0; i < 60; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        if (lifeRatio < 0.1) p.opacity = lifeRatio * 10;
        else if (lifeRatio > 0.8) p.opacity = (1 - lifeRatio) * 5;
        else p.opacity = 0.5;

        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx2d.fillStyle = `rgba(200, 169, 106, ${p.opacity * 0.4})`;
        ctx2d.fill();

        if (p.life >= p.maxLife) {
          particles[i] = createParticle();
        }
      });

      animFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Scroll entrance
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 80, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    setIsModalOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="cta"
        className="relative min-h-screen bg-[#17130F] flex items-center justify-center overflow-hidden"
      >
        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,169,106,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-8">
          <SectionLabel className="mb-8 justify-center">
            <span className="text-[var(--stone)]">BEGIN</span>
          </SectionLabel>

          <h2
            ref={headingRef}
            className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold text-white leading-[0.9] tracking-tight mb-8"
          >
            Your World<br />
            <span className="font-editorial italic font-normal text-[var(--champagne)]">
              Awaits
            </span>
          </h2>

          <p className="text-[var(--stone)] text-section-body max-w-lg mx-auto mb-12 leading-relaxed">
            Every Avenex Property world begins with a single conversation. No brochures,
            no presentations — just a meeting of minds between visionaries.
          </p>

          <MagneticButton
            className="group"
            onClick={() => setIsModalOpen(true)}
            ariaLabel="Request private consultation"
          >
            <span
              className={cn(
                "inline-flex items-center gap-3",
                "px-10 py-5 rounded-full",
                "bg-[var(--champagne)] text-[var(--ink)]",
                "text-[11px] font-medium uppercase tracking-[0.2em]",
                "transition-all duration-500",
                "group-hover:bg-[var(--bronze)] group-hover:text-white",
                "shadow-[0_0_60px_rgba(200,169,106,0.2)]",
                "group-hover:shadow-[0_0_80px_rgba(200,169,106,0.35)]"
              )}
            >
              Request Private Consultation
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path
                  d="M0 4h14m0 0l-3-3m3 3l-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </MagneticButton>

          {/* Footer */}
          <div className="mt-32 flex flex-col items-center gap-6">
            <div className="w-12 h-[1px] bg-[var(--stone)]/30" />
            <p className="text-[var(--stone)]/50 text-[10px] tracking-[0.3em] uppercase">
              AVENEX PROPERTY — Private Architectural Worlds
            </p>
            <p className="text-[var(--stone)]/30 text-[9px] tracking-wider">
              © {new Date().getFullYear()} Avenex Property. All rights reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-8"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#17130F]/80 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[var(--surface)] rounded-2xl p-10 shadow-[0_32px_120px_rgba(0,0,0,0.4)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--mist)] transition-colors"
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="var(--ink)" strokeWidth="1.5" />
                </svg>
              </button>

              <span className="text-section-label text-[var(--champagne)] block mb-6">
                PRIVATE CONSULTATION
              </span>
              <h3 className="text-2xl font-display font-bold text-[var(--ink)] mb-2">
                Begin Your World
              </h3>
              <p className="text-sm text-[var(--muted-ink)] mb-10">
                Share your vision. A senior architect will respond within 48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="cta-name"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="cta-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-[var(--stone)]/40 py-3 text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--champagne)] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cta-email"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-[var(--stone)]/40 py-3 text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--champagne)] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cta-message"
                    className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted-ink)] block mb-2"
                  >
                    Your Vision
                  </label>
                  <textarea
                    id="cta-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="w-full bg-transparent border-b border-[var(--stone)]/40 py-3 text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--champagne)] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[var(--ink)] text-white text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--bronze)] transition-colors duration-500"
                >
                  Submit Request
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
