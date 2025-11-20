"use client";

import type * as React from "react";
import { Icon, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface TagProps {
  label: string;
  onRemove: () => void;
  color: string;
}

export function Tag({ label, onRemove, color }: TagProps) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 pr-1">
      <div
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span>{label}</span>
      <button
        type="button"
        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );
}
