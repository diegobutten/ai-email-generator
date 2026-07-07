"use client";

import { quickActions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { EmailFormData } from "@/types/email";

interface QuickActionsProps {
  activeTone?: EmailFormData["tone"];
  activeType?: EmailFormData["emailType"];
  onSelect: (chip: (typeof quickActions)[number]) => void;
}

export function QuickActions({ activeTone, activeType, onSelect }: QuickActionsProps) {
  return (
    <div>
      <p className="mb-2.5 text-sm font-medium text-muted-foreground">Quick actions</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Quick email presets">
        {quickActions.map((chip) => {
          const isActive =
            (chip.tone && chip.tone === activeTone) || (chip.emailType && chip.emailType === activeType);
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => onSelect(chip)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-150 active:scale-95",
                isActive
                  ? "border-transparent bg-primary-600 text-white shadow-soft"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary-300 hover:text-foreground dark:hover:border-primary-700"
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
