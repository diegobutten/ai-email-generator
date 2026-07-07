"use client";

import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, cn } from "@/lib/utils";
import type { EmailHistoryItem } from "@/types/email";

interface HistoryCardProps {
  item: EmailHistoryItem;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HistoryCard({ item, onToggleFavorite, onDelete }: HistoryCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Card className="transition-shadow hover:shadow-soft-lg">
        <CardContent className="flex flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium leading-snug">{item.subject}</p>
            <span className="shrink-0 whitespace-nowrap text-xs text-muted-foreground">
              {formatDate(item.date)}
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{item.preview}</p>
          <div className="mt-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={item.isFavorite}
              aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
              onClick={() => onToggleFavorite(item.id)}
            >
              <Heart
                className={cn(
                  "h-3.5 w-3.5 transition-colors",
                  item.isFavorite && "fill-destructive text-destructive"
                )}
              />
              {item.isFavorite ? "Favorited" : "Favorite"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Delete email from history"
              onClick={() => onDelete(item.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
