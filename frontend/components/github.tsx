"use client";

import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GithubButton() {
  const handleClick = () => {
    window.open(
      "https://github.com/EliasJHL/TaskFlow",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className="h-9 w-9"
      aria-label="Voir le code source sur GitHub"
    >
      <Github className="h-4 w-4 transition-transform hover:scale-110" />
      <span className="sr-only">GitHub Repository</span>
    </Button>
  );
}
