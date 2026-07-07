import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow",
        secondary:
          "bg-secondary-500 text-white shadow-soft hover:bg-secondary-600",
        accent:
          "bg-accent-500 text-white shadow-soft hover:bg-accent-600",
        destructive:
          "bg-destructive text-white shadow-soft hover:bg-red-600",
        outline:
          "border border-border bg-transparent hover:bg-muted text-foreground",
        ghost: "bg-transparent hover:bg-muted text-foreground",
        link: "text-primary-600 underline-offset-4 hover:underline p-0 h-auto",
        glass: "glass text-foreground hover:bg-white/90 dark:hover:bg-zinc-900/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, children, disabled, ...props },
    ref
  ) => {
    // const Comp = asChild ? Slot : "button";
    // return (
    //   <Comp
    //     className={cn(buttonVariants({ variant, size, className }))}
    //     ref={ref}
    //     disabled={disabled || loading}
    //     aria-busy={loading || undefined}
    //     {...props}
    //   >
    //     {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
    //     {children}
    //   </Comp>
    // );
    const Comp = asChild ? Slot : "button";

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
