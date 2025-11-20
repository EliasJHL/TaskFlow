"use client";

import type { Workspace, Board } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { useTranslation } from "react-i18next";

interface BoardHeaderProps {
  workspace: Workspace;
  board: Board;
}

export function BoardHeader({ workspace, board }: BoardHeaderProps) {
  const router = useRouter();
  const { i18n, t } = useTranslation("common");
  const currentLang = i18n.language;

  return (
    <>
      <Navigation
        variant="board"
        boardTitle={`${workspace.name}/${board.title}`}
        boardColor={board.color}
        onBack={() =>
          router.push(`/${currentLang}/workspace/${workspace.workspaceId}`)
        }
      />

      <div className="border-b bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {board.description && <p>{board.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
