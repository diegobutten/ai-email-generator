"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  RotateCw,
  Wand2,
  Languages,
  Download,
  Mail,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadAsTxt, countWords } from "@/lib/utils";
import type { useEmailGenerator } from "@/hooks/use-email-generator";

interface EmailOutputProps {
  generator: ReturnType<typeof useEmailGenerator>;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500"
            style={{ animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </span>
      Drafting your email…
    </div>
  );
}

export function EmailOutput({ generator }: EmailOutputProps) {
  const { email, status, regenerate, improve, translate } = generator;
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!email) return;
    const success = await copyToClipboard(`Subject: ${email.subject}\n\n${email.body}`);
    if (success) {
      setCopied(true);
      toast({ title: "Copied", description: "Email copied to your clipboard.", variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({ title: "Copy failed", description: "Please copy manually.", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!email) return;
    downloadAsTxt(`${email.subject.slice(0, 40).replace(/[^\w\- ]/g, "")}.txt`, `Subject: ${email.subject}\n\n${email.body}`);
    toast({ title: "Downloaded", description: "Saved as a .txt file.", variant: "success" });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">AI Output</h3>
        {email && status !== "loading" && (
          <span className="text-xs text-muted-foreground">
            {countWords(email.body)} words
          </span>
        )}
      </div>

      <div className="flex-1 rounded-xl border border-border bg-muted/40 p-5">
        <AnimatePresence mode="wait">
          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full flex-col gap-4"
            >
              <TypingIndicator />
              <Skeleton className="h-4 w-2/3" />
              <div className="space-y-2.5 pt-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/6" />
              </div>
            </motion.div>
          )}

          {status === "error" && !email && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-center"
            >
              <AlertCircle className="h-8 w-8 text-destructive" aria-hidden="true" />
              <p className="text-sm font-medium">Couldn't generate that email</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                {generator.errorMessage ?? "Please check the form and try again."}
              </p>
            </motion.div>
          )}

          {status === "idle" && !email && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[240px] flex-col items-center justify-center gap-2 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30">
                <Mail className="h-5 w-5 text-primary-600 dark:text-primary-300" aria-hidden="true" />
              </div>
              <p className="text-sm font-medium">Your draft will appear here</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                Fill in the form and generate — subject line and body will show up on this side.
              </p>
            </motion.div>
          )}

          {email && status === "success" && (
            <motion.div
              key={email.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Subject
                </p>
                <p className="font-medium">{email.subject}</p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Body
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                  {email.body}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          disabled={!email || status === "loading"}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-accent-500" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={regenerate}
          disabled={!email || status === "loading"}
        >
          <RotateCw className="h-3.5 w-3.5" />
          Regenerate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={improve}
          disabled={!email || status === "loading"}
        >
          <Wand2 className="h-3.5 w-3.5" />
          Improve
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={translate}
          disabled={!email || status === "loading"}
        >
          <Languages className="h-3.5 w-3.5" />
          Translate
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={!email || status === "loading"}
        >
          <Download className="h-3.5 w-3.5" />
          Download TXT
        </Button>
      </div>
    </div>
  );
}
