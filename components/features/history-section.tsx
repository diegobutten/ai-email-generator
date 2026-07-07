"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";

import { emailHistory as initialHistory } from "@/lib/mock-data";
import { HistoryCard } from "@/components/features/history-card";
import { useToast } from "@/hooks/use-toast";

export function HistorySection() {
  const [history, setHistory] = React.useState(initialHistory);
  const { toast } = useToast();

  const toggleFavorite = (id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isFavorite: !item.isFavorite } : item))
    );
  };

  const deleteItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast({ title: "Deleted", description: "Removed from your history." });
  };

  return (
    <section id="history" className="scroll-mt-20 border-t border-border py-16 sm:py-24">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Your recent emails
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you've generated, ready to revisit or favorite.
          </p>
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto flex max-w-sm flex-col items-center gap-2 py-12 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium">No history yet</p>
            <p className="text-sm text-muted-foreground">
              Emails you generate will show up here so you can find them again.
            </p>
          </motion.div>
        ) : (
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {history.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onToggleFavorite={toggleFavorite}
                  onDelete={deleteItem}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
