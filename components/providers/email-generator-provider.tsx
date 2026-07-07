"use client";

import * as React from "react";

import { useEmailGenerator } from "@/hooks/use-email-generator";

type GeneratorContextValue = ReturnType<typeof useEmailGenerator>;

const GeneratorContext = React.createContext<GeneratorContextValue | null>(null);

export function EmailGeneratorProvider({ children }: { children: React.ReactNode }) {
  const generator = useEmailGenerator();
  return <GeneratorContext.Provider value={generator}>{children}</GeneratorContext.Provider>;
}

export function useGeneratorContext(): GeneratorContextValue {
  const ctx = React.useContext(GeneratorContext);
  if (!ctx) {
    throw new Error("useGeneratorContext must be used within an EmailGeneratorProvider");
  }
  return ctx;
}
