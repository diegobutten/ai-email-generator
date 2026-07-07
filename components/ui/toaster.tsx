"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => (
        <Toast key={id} variant={variant} {...props}>
          <div className="flex flex-1 items-start gap-2.5">
            {variant === "success" && (
              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent-500" aria-hidden="true" />
            )}
            {variant === "destructive" && (
              <AlertCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-destructive" aria-hidden="true" />
            )}
            <div className="grid gap-0.5">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
