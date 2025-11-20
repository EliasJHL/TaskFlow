"use client";

import type * as React from "react";
import { Icon, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface UserProps {
  username: string;
  onRemove: () => void;
  picture: string;
}

export function User({ username, onRemove, picture }: UserProps) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 pr-1">
      <img src={picture} alt={username} className="h-2 w-2 rounded-full" />
      <span>{username}</span>
      <button
        type="button"
        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        aria-label={`Remove ${username}`}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );
}
