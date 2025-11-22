"use client";

import { Board, useStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Plus, MoreVertical, Star, Trash2 } from "lucide-react";
import { CreateBoardDialog } from "@/components/workspace/create-board-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface BoardsGridProps {
  boards: Board[];
}

export function BoardsGrid({ boards }: BoardsGridProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<Board | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { deleteBoard } = useStore();
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleDeleteClick = (board: Board) => {
    setBoardToDelete(board);
    setShowDeleteDialog(true);
    setMenuOpen(null);
  };

  const handleDeleteConfirm = async () => {
    if (boardToDelete) {
      try {
        await deleteBoard(boardToDelete.boardId);
        setShowDeleteDialog(false);
        setBoardToDelete(null);
      } catch (error) {
        console.error("Failed to delete board:", error);
      }
    }
  };

  return (
    <>
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("your_boards")}</h2>
          <CreateBoardDialog />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {boards.map((board) => (
            <div
              key={board.boardId}
              className="group bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ overflow: "visible" }}
            >
              <div
                className="h-24 p-4 cursor-pointer relative overflow-hidden rounded-t-xl"
                style={{
                  backgroundColor: board.color || "#667eea",
                  backgroundImage: `linear-gradient(135deg, ${
                    board.color || "#667eea"
                  } 0%, ${adjustColor(board.color || "#667eea", -30)} 100%)`,
                }}
                onClick={() =>
                  router.push(
                    `/${currentLang}/workspace/${board.workspaceId}/board/${board.boardId}`
                  )
                }
              >
                <div className="relative z-10">
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {board.title}
                  </h3>
                </div>

                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0z' fill='none'/%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {board.description || t("no_description_provided")}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>
                      {board.lists?.length || 0} {t("lists")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>
                      {board.labels?.length || 0} {t("labels")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <button
                    className="p-1.5 hover:bg-muted rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Star clicked");
                    }}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/${currentLang}/workspace/${board.workspaceId}/board/${board.boardId}`
                      );
                    }}
                    className="text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
                  >
                    {t("open_board")}
                  </button>

                  <div
                    className="relative"
                    ref={menuOpen === board.boardId ? menuRef : null}
                  >
                    <button
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMenuOpen(
                          menuOpen === board.boardId ? null : board.boardId
                        );
                      }}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Menu */}
                    {menuOpen === board.boardId && (
                      <div className="absolute right-0 top-full mt-1 z-50 min-w-[160px] overflow-hidden rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95">
                        <div className="p-1">
                          <button
                            className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-destructive"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(board);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t("delete_board")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button className="min-h-[240px] rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
            <div className="w-14 h-14 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors">
              <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground mb-1">
                {t("create_new_board")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("start_organizing_tasks")}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Dialog de confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete_board_question")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("delete_board_confirm", { title: boardToDelete?.title })}
              {boardToDelete &&
                boardToDelete.lists &&
                boardToDelete.lists.length > 0 && (
                  <span className="block mt-2 text-destructive font-medium">
                    {t("delete_board_warning", {
                      count: boardToDelete.lists.length,
                    })}
                  </span>
                )}
              <span className="block mt-2 text-sm">{t("cannot_undo")}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function adjustColor(color: string, amount: number): string {
  const clamp = (num: number) => Math.min(Math.max(num, 0), 255);
  const num = parseInt(color.replace("#", ""), 16);
  const r = clamp((num >> 16) + amount);
  const g = clamp(((num >> 8) & 0x00ff) + amount);
  const b = clamp((num & 0x0000ff) + amount);
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}
