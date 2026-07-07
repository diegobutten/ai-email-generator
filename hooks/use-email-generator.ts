"use client";

import * as React from "react";

import type {
  EmailFormData,
  GeneratedEmail,
  GenerationStatus,
} from "@/types/email";
import {
  mockGenerateEmail,
  mockImproveEmail,
  mockTranslateEmail,
} from "@/lib/mock-generator";
import { emailLanguageOptions } from "@/lib/options";
import { useToast } from "@/hooks/use-toast";

const initialFormData: EmailFormData = {
  prompt: "",
  recipientName: "",
  recipientEmail: "",
  senderName: "",
  companyName: "",
  emailType: "professional",
  tone: "professional",
  language: "english",
  length: "medium",
  additionalInstructions: "",
};

export function useEmailGenerator() {
  const [formData, setFormData] = React.useState<EmailFormData>(initialFormData);
  const [status, setStatus] = React.useState<GenerationStatus>("idle");
  const [email, setEmail] = React.useState<GeneratedEmail | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const { toast } = useToast();

  const updateField = <K extends keyof EmailFormData>(field: K, value: EmailFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!formData.prompt.trim()) return "Describe what the email needs to say.";
    if (!formData.senderName.trim()) return "Add your name so the email can sign off.";
    return null;
  };

  const generate = React.useCallback(async () => {
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }
    setErrorMessage(null);
    setStatus("loading");
    try {
      const result = await mockGenerateEmail(formData);
      setEmail(result);
      setStatus("success");
    } catch {
      setErrorMessage("Something went wrong while generating your email. Please try again.");
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const regenerate = React.useCallback(async () => {
    if (status === "loading") return;
    setStatus("loading");
    try {
      const result = await mockGenerateEmail(formData);
      setEmail(result);
      setStatus("success");
      toast({ title: "New draft ready", description: "Regenerated your email.", variant: "success" });
    } catch {
      setErrorMessage("Couldn't regenerate the email. Please try again.");
      setStatus("error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, status]);

  const improve = React.useCallback(async () => {
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const result = await mockImproveEmail(email);
      setEmail(result);
      setStatus("success");
      toast({ title: "Draft improved", description: "Tightened up the wording.", variant: "success" });
    } catch {
      setErrorMessage("Couldn't improve the email. Please try again.");
      setStatus("error");
    }
  }, [email, status]);

  const translate = React.useCallback(async () => {
    if (!email || status === "loading") return;
    const languageLabel =
      emailLanguageOptions.find((l) => l.value === formData.language)?.label ?? "English";
    setStatus("loading");
    try {
      const result = await mockTranslateEmail(email, languageLabel);
      setEmail(result);
      setStatus("success");
      toast({
        title: "Translated",
        description: `Draft translated to ${languageLabel}.`,
        variant: "success",
      });
    } catch {
      setErrorMessage("Couldn't translate the email. Please try again.");
      setStatus("error");
    }
  }, [email, formData.language, status]);

  const reset = () => {
    setFormData(initialFormData);
    setEmail(null);
    setStatus("idle");
    setErrorMessage(null);
  };

  return {
    formData,
    updateField,
    setFormData,
    status,
    email,
    errorMessage,
    generate,
    regenerate,
    improve,
    translate,
    reset,
  };
}
