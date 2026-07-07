"use client";

import { Card } from "@/components/ui/card";
import { EmailGeneratorForm } from "@/components/features/email-generator-form";
import { EmailOutput } from "@/components/features/email-output";
import { useGeneratorContext } from "@/components/providers/email-generator-provider";

export function GeneratorSection() {
  const generator = useGeneratorContext();

  return (
    <section id="generator" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Generate your email
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in the details on the left. Your draft appears on the right in seconds.
          </p>
        </div>

        <Card className="glass-card mx-auto grid max-w-6xl grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-2">
          <div className="lg:border-r lg:border-border lg:pr-8">
            <EmailGeneratorForm generator={generator} />
          </div>
          <div>
            <EmailOutput generator={generator} />
          </div>
        </Card>
      </div>
    </section>
  );
}
