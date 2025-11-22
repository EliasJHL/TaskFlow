"use client";

import { useAuth } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { WorkspaceHeader } from "@/components/workspace/workspace-header";
import { BoardsGrid } from "@/components/workspace/boards-grid";
import { useTranslation } from "react-i18next";

interface WorkspacePageProps {
  params: Promise<{ workspace_id: string }>;
}

export default function WorkspacePage({ params }: WorkspacePageProps) {
  const { workspace_id } = use(params);

  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;

  const { user } = useAuth();
  const router = useRouter();
  
  const boards = useStore((state) => state.boards);
  const getBoards = useStore((state) => state.getBoards);
  const getWorkspace = useStore((state) => state.getWorkspace);
  const workspace = useStore((state) => state.currentWorkspace);
  const isLoadingStore = useStore((state) => state.isLoading);

  const [isInitializing, setIsInitializing] = useState(true);
  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    console.log("DEBUG: Force refresh data for:", workspace_id);

    if (workspace_id) {
      const loadData = async () => {
        setIsInitializing(true);
        setErrorState(null);

        try {
          await Promise.all([
             getWorkspace(workspace_id),
             getBoards(workspace_id)
          ]);
        } catch (e: any) {
            console.error("Error loading workspace:", e);
            setErrorState(e.message || "Erreur de chargement");
        } finally {
            setIsInitializing(false);
        }
      };
      loadData();
    }
  }, [user, workspace_id, router, getBoards, getWorkspace, currentLang]);

  if (!user) return null;

  const isLoading = isLoadingStore || isInitializing;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse space-y-2 p-4 bg-gray-200 dark:bg-gray-800 rounded-md max-w-xl mx-auto">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
          <p className="text-muted-foreground mt-4">{t("workspace_loading")}</p>
        </div>
      </div>
    );
  }

  if (errorState) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="mb-4">Une erreur est survenue : {errorState}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="underline"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">
            {t("workspace_not_found")} (ID: {workspace_id})
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
      <WorkspaceHeader workspace={workspace} />
      <BoardsGrid boards={boards} />
    </div>
  );
}