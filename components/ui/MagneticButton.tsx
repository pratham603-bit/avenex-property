"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn, lerp } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  ariaLabel,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.1);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.1);

    if (buttonRef.current) {
      buttonRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRef.current.x = (e.clientX - cx) * strength;
      targetRef.current.y = (e.clientY - cy) * strength;
    };

    const onMouseLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate, strength]);

  return (
    <button
      ref={buttonRef}
      className={cn("magnetic-area will-change-transform", className)}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
