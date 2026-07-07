"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useGeneratorContext } from "@/components/providers/email-generator-provider";
import { getIcon } from "@/lib/icon-map";
import type { EmailTemplate } from "@/types/email";

interface TemplateCardProps {
  template: EmailTemplate;
  index: number;
}

export function TemplateCard({ template, index }: TemplateCardProps) {
  const { updateField } = useGeneratorContext();
  const { toast } = useToast();
  const Icon = getIcon(template.icon);

  const handleUse = () => {
    updateField("emailType", template.emailType);
    toast({
      title: "Template applied",
      description: `"${template.title}" is set as the email type.`,
      variant: "success",
    });
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
    // Give the scroll a moment, then focus the prompt field for immediate typing
    setTimeout(() => document.getElementById("prompt")?.focus(), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="group flex h-full flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
        <CardHeader>
          <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/30 dark:text-primary-300">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <CardTitle>{template.title}</CardTitle>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1" />
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full" onClick={handleUse}>
            Use Template
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
