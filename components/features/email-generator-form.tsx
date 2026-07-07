"use client";

import * as React from "react";
import { CornerDownLeft, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { QuickActions } from "@/components/features/quick-actions";
import {
  emailTypeOptions,
  emailToneOptions,
  emailLanguageOptions,
  emailLengthOptions,
} from "@/lib/options";
import { countWords } from "@/lib/utils";
import type { useEmailGenerator } from "@/hooks/use-email-generator";

const PROMPT_CHAR_LIMIT = 1000;

interface EmailGeneratorFormProps {
  generator: ReturnType<typeof useEmailGenerator>;
}

export function EmailGeneratorForm({ generator }: EmailGeneratorFormProps) {
  const { formData, updateField, status, errorMessage, generate } = generator;
  const promptRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        generate();
      }
    };
    const node = promptRef.current;
    node?.addEventListener("keydown", handler);
    return () => node?.removeEventListener("keydown", handler);
  }, [generate]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        generate();
      }}
      className="flex h-full flex-col gap-6"
      aria-label="Email generator inputs"
    >
      {/* Prompt */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label htmlFor="prompt" className="text-sm font-medium">
            What should this email say?
          </label>
          <span
            className={`text-xs tabular-nums ${
              formData.prompt.length > PROMPT_CHAR_LIMIT ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {formData.prompt.length}/{PROMPT_CHAR_LIMIT} · {countWords(formData.prompt)} words
          </span>
        </div>
        <Textarea
          id="prompt"
          ref={promptRef}
          value={formData.prompt}
          onChange={(e) => updateField("prompt", e.target.value.slice(0, PROMPT_CHAR_LIMIT))}
          placeholder="Example: Write a professional email requesting an interview schedule."
          className="min-h-[110px]"
          error={status === "error" && !formData.prompt.trim()}
          aria-describedby="prompt-hint"
        />
        <p id="prompt-hint" className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <CornerDownLeft className="h-3 w-3" aria-hidden="true" />
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
            Ctrl/Cmd + Enter
          </kbd>{" "}
          to generate
        </p>
      </div>

      {/* Recipient / sender fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="recipientName" className="mb-1.5 block text-sm font-medium">
            Recipient name
          </label>
          <Input
            id="recipientName"
            value={formData.recipientName}
            onChange={(e) => updateField("recipientName", e.target.value)}
            placeholder="Maria Santos"
          />
        </div>
        <div>
          <label htmlFor="recipientEmail" className="mb-1.5 block text-sm font-medium">
            Recipient email
          </label>
          <Input
            id="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={(e) => updateField("recipientEmail", e.target.value)}
            placeholder="maria@company.com"
          />
        </div>
        <div>
          <label htmlFor="senderName" className="mb-1.5 block text-sm font-medium">
            Your name <span className="text-destructive">*</span>
          </label>
          <Input
            id="senderName"
            value={formData.senderName}
            onChange={(e) => updateField("senderName", e.target.value)}
            placeholder="Jordan Cruz"
            error={status === "error" && !formData.senderName.trim()}
            required
          />
        </div>
        <div>
          <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium">
            Company <span className="text-muted-foreground">(optional)</span>
          </label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
      </div>

      {/* Dropdowns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email type</label>
          <Select value={formData.emailType} onValueChange={(v) => updateField("emailType", v as typeof formData.emailType)}>
            <SelectTrigger aria-label="Email type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {emailTypeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Tone</label>
          <Select value={formData.tone} onValueChange={(v) => updateField("tone", v as typeof formData.tone)}>
            <SelectTrigger aria-label="Tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {emailToneOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Language</label>
          <Select value={formData.language} onValueChange={(v) => updateField("language", v as typeof formData.language)}>
            <SelectTrigger aria-label="Language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {emailLanguageOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Length</label>
          <Select value={formData.length} onValueChange={(v) => updateField("length", v as typeof formData.length)}>
            <SelectTrigger aria-label="Length">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {emailLengthOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick action chips */}
      <QuickActions
        activeTone={formData.tone}
        activeType={formData.emailType}
        onSelect={(chip) => {
          if (chip.tone) updateField("tone", chip.tone);
          if (chip.emailType) updateField("emailType", chip.emailType);
        }}
      />

      {/* Additional instructions */}
      <div>
        <label htmlFor="additionalInstructions" className="mb-1.5 block text-sm font-medium">
          Additional instructions <span className="text-muted-foreground">(optional)</span>
        </label>
        <Textarea
          id="additionalInstructions"
          value={formData.additionalInstructions}
          onChange={(e) => updateField("additionalInstructions", e.target.value)}
          placeholder="Example: Mention I'm available Tuesday to Thursday only."
          className="min-h-[80px]"
          autoResize
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {/* <Button
              type="submit"
              size="xl"
              loading={status === "loading"}
              className="mt-auto w-full"
            >
              {status !== "loading" && <Sparkles className="h-4 w-4" aria-hidden="true" />}
              {status === "loading" ? "Generating…" : "Generate Email"}
            </Button> */}
          </TooltipTrigger>
          <TooltipContent>Ctrl/Cmd + Enter also works</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
