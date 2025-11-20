"use client";

import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { BoardHeader } from "@/components/board/board-header";
import { BoardView } from "@/components/board/board-view";
import { useTranslation } from "react-i18next";

interface BoardPageProps {
  params: { workspace_id: string; board_id: string };
}

export default function BoardPage({ params }: BoardPageProps) {
  const { workspace_id: workspaceId, board_id: boardId } = params;
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;

  const { user } = useAuth();
  const router = useRouter();
  const board = useStore((state) => state.currentBoard);
  const getBoard = useStore((state) => state.getBoard);
  const getBoards = useStore((state) => state.getBoards);
  const getWorkspace = useStore((state) => state.getWorkspace);
  const workspace = useStore((state) => state.currentWorkspace);
  const isLoading = useStore((state) => state.isLoading);

  const hasLoadedRef = useRef<string | null>(null);
  const loadKey = `${workspaceId}-${boardId}`;

  useEffect(() => {
    if (!user) {
      router.push(`/${currentLang}/login`);
      return;
    }

    if (hasLoadedRef.current === loadKey) return;
    hasLoadedRef.current = loadKey;

    const loadData = async () => {
      try {
        await getWorkspace(workspaceId);
        await getBoards(workspaceId);
        await getBoard(boardId);
      } catch (error) {
        console.error("Error loading board page:", error);
      }
    };
    loadData();
  }, [
    user,
    workspaceId,
    boardId,
    getWorkspace,
    getBoards,
    getBoard,
    router,
    currentLang,
  ]);

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-2 p-4 bg-gray-200 dark:bg-gray-800 rounded-md max-w-xl mx-auto">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <p className="text-muted-foreground mt-4">{t("board_loading")}</p>
        </div>
      </div>
    );
  }

  if (!workspace || !board) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">
            {!workspace ? t("workspace_not_found") : t("board_not_found")}
          </p>
          <button
            onClick={() => router.push(`/${currentLang}/dashboard`)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            {t("back_to_dashboard")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BoardHeader workspace={workspace} board={board} />
      <BoardView boardId={board.boardId} />
    </div>
  );
}
