"use client";

import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, use } from "react";
import { BoardHeader } from "@/components/board/board-header";
import { BoardView } from "@/components/board/board-view";
import { useTranslation } from "react-i18next";

interface BoardPageProps {
  params: Promise<{ workspace_id: string; board_id: string }>;
}

export default function BoardPage({ params }: BoardPageProps) {
  const { workspace_id: workspaceId, board_id: boardId } = use(params);
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;
  const { user } = useAuth();
  const router = useRouter();
  
  const board = useStore((state) => state.currentBoard);
  const workspace = useStore((state) => state.currentWorkspace);
  const getBoard = useStore((state) => state.getBoard);
  const getBoards = useStore((state) => state.getBoards);
  const getWorkspace = useStore((state) => state.getWorkspace);
  
  const [isInitializing, setIsInitializing] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  const hasLoadedRef = useRef<string | null>(null);
  const loadKey = `${workspaceId}-${boardId}`;

  useEffect(() => {
    if (!user) return;

    if (hasLoadedRef.current === loadKey) {
       setIsInitializing(false);
       return;
    }

    const loadData = async () => {
      hasLoadedRef.current = loadKey;
      setErrorState(null);
      
      try {
        await Promise.all([
          getWorkspace(workspaceId),
          getBoards(workspaceId),
        ]);

        await getBoard(boardId);

      } catch (error: any) {
        console.error("Erreur de chargement:", error);
        hasLoadedRef.current = null; 
        setErrorState(error.message || "Erreur inconnue");
      } finally {
        setIsInitializing(false);
      }
    };

    loadData();
  }, [user, workspaceId, boardId, loadKey, getWorkspace, getBoards, getBoard]);

  if (!user) {
     return null; 
  }

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
           <p className="text-muted-foreground mt-4">{t("board_loading")}</p>
        </div>
      </div>
    );
  }

  if (errorState) {
     return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Une erreur est survenue : {errorState}</p>
          <button onClick={() => window.location.reload()} className="mt-4 underline">Réessayer</button>
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
          <div className="flex gap-4 justify-center">
             <button
                onClick={() => router.push(`/${currentLang}/dashboard`)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded"
             >
                {t("back_to_dashboard")}
             </button>
          </div>
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