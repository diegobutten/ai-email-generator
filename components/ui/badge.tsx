import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200",
        secondary: "border-transparent bg-secondary-50 text-secondary-700 dark:bg-secondary-900/40 dark:text-secondary-200",
        accent: "border-transparent bg-accent-50 text-accent-600 dark:bg-accent-500/10 dark:text-accent-500",
        outline: "border-border bg-transparent text-foreground",
        destructive: "border-transparent bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
