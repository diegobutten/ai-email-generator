"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-primary-400/25 blur-3xl animate-blob dark:bg-primary-600/20" />
        <div className="absolute top-10 right-[10%] h-80 w-80 rounded-full bg-secondary-400/25 blur-3xl animate-blob dark:bg-secondary-500/20 [animation-delay:3s]" />
        <div className="absolute bottom-0 left-[35%] h-64 w-64 rounded-full bg-accent-500/20 blur-3xl animate-blob dark:bg-accent-500/15 [animation-delay:6s]" />
      </div>

      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-primary-700 dark:text-primary-300">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-drafted emails, in your tone
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
        >
          Write the email,
          <br className="hidden sm:block" />
          <span className="text-gradient"> skip the blank page.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Describe what you need to say. Pick a tone, a length, a language.
          Mailcraft drafts a ready-to-send email in seconds — you just review and hit copy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="xl" onClick={scrollToGenerator} className="group">
            Start Writing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Button>
          {/* <Button size="xl" variant="outline" asChild>
            <a href="#templates">Browse templates</a>
          </Button> */}
          <Button size="xl" variant="outline">Browse templates</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-14 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border pt-8 text-center"
        >
          <div>
            <p className="font-display text-2xl font-semibold">10+</p>
            <p className="text-xs text-muted-foreground">Email templates</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">7</p>
            <p className="text-xs text-muted-foreground">Languages</p>
          </div>
          <div>
            <p className="font-display text-2xl font-semibold">&lt;10s</p>
            <p className="text-xs text-muted-foreground">Average draft time</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
