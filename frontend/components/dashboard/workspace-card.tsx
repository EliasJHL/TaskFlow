"use client";

import { useState } from "react";
import { type Workspace } from "@/lib/store";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Users, Archive, Trash2, Pin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const { deleteWorkspace, pinWorkspace, unpinWorkspace } = useStore();
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;

  const handleOpenWorkspace = () => {
    if (!showMenu) {
      router.push(`/${currentLang}/workspace/${workspace.workspaceId}`);
    }
  };

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleArchiveWorkspace = () => {
    console.log(`Archiving workspace ${workspace.workspaceId}`);
    setShowMenu(false);
  };

  const handlePinWorkspace = async () => {
    console.log(`Pinning workspace ${workspace.workspaceId}`);
    if (workspace.isPinned) {
      await unpinWorkspace(workspace.workspaceId);
    } else {
      await pinWorkspace(workspace.workspaceId);
    }
    setShowMenu(false);
  };

  const handleDeleteWorkspace = async () => {
    console.log(`Deleting workspace ${workspace.workspaceId}`);
    if (!confirm(t("confirm_delete_workspace", { name: workspace.name }))) {
      return;
    }
    await deleteWorkspace(workspace.workspaceId);
    setShowMenu(false);
  };

  return (
    <>
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}

      <Card
        className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4 relative"
        style={{ borderLeftColor: workspace.color }}
        onClick={handleOpenWorkspace}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-lg leading-tight text-balance">
                {workspace.name}
              </h3>
              {workspace.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {workspace.description}
                </p>
              )}
            </div>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-100 transition-opacity"
                onClick={handleMenuToggle}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

              {showMenu && (
                <div
                  className="absolute right-0 top-full mt-1 z-50 min-w-[160px] overflow-hidden rounded-md border bg-popover shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-1">
                    <button
                      onClick={handlePinWorkspace}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
                    >
                      <Pin className="mr-2 h-4 w-4" />
                      {workspace.isPinned ? t("unpin") : t("pin")}
                    </button>
                    <button
                      onClick={handleArchiveWorkspace}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground active:scale-95"
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      {t("archive")}
                    </button>
                    <button
                      onClick={handleDeleteWorkspace}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-destructive hover:text-destructive-foreground text-destructive active:scale-95"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t("delete")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <Badge variant="secondary" className="text-xs">
              {workspace.boards.length}{" "}
              {workspace.boards.length === 1 ? t("board") : t("boards")}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {workspace.members.slice(0, 3).map((member) => (
                  <Avatar
                    key={member.user_id}
                    className="h-6 w-6 border-2 border-background"
                  >
                    <AvatarImage
                      src={member.picture || "/placeholder.svg"}
                      alt={member.username}
                    />
                    <AvatarFallback className="text-xs">
                      {member.username
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {workspace.members.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      +{workspace.members.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: workspace.color }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
