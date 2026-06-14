"use client";

import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  number?: string;
}

export default function SectionLabel({ children, className, number }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {number && (
        <span className="text-[10px] font-mono text-[var(--stone)] tracking-wider">
          {number}
        </span>
      )}
      <div className="w-8 h-[1px] bg-[var(--stone)]" />
      <span className="text-section-label">{children}</span>
    </div>
  );
}
