"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

interface CreateColumnButtonProps {
  boardId: string;
}

const columnColors = [
  "#ef4444", // red
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#10b981", // emerald
  "#3b82f6", // blue
  "#06b6d4", // cyan
];

export function CreateColumnButton({ boardId }: CreateColumnButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(columnColors[0]);
  const { createList, lists, currentBoard } = useStore();
  const { toast } = useToast();
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) return;

    const boardColumns = lists.filter((col) => col.board.boardId === boardId);
    const maxOrder = Math.max(...boardColumns.map((col) => col.position), -1);

    await createList({
      title: title.trim(),
      color: selectedColor,
      position: maxOrder + 1,
      board: currentBoard!,
      cards: [],
    });

    toast({
      title: t("column_created"),
      description: t("column_created_desc", { name: title }),
    });

    setTitle("");
    setSelectedColor(columnColors[0]);
    setIsCreating(false);

    // Redirection dynamique
    router.push(
      `/${currentLang}/workspace/${currentBoard?.workspaceId}/board/${boardId}`
    );
  };

  const handleCancel = () => {
    setTitle("");
    setSelectedColor(columnColors[0]);
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <Card className="w-80 flex-shrink-0">
        <CardContent className="p-4 space-y-3">
          <Input
            placeholder={t("column_name")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />

          <div className="flex gap-1">
            {columnColors.map((color) => (
              <button
                key={color}
                type="button"
                className={`h-6 w-6 rounded border-2 transition-all ${
                  selectedColor === color
                    ? "border-foreground scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreate} disabled={!title.trim()}>
              <Check className="h-4 w-4 mr-1" />
              {t("create")}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              {t("cancel")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      variant="ghost"
      className="w-80 h-fit flex-shrink-0 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 p-4"
      onClick={() => setIsCreating(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      {t("create_new_column")}
    </Button>
  );
}
