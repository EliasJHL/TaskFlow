"use client";

import React from "react";
import type { Card as CardTask, Label } from "@/lib/store";
import type { User as UserCard } from "@/lib/auth";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label as LabelUI } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Trash2, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MultiSelectLabels } from "@/components/multi-select-labels";
import { MultiSelectUsers } from "@/components/multi-select-users";
import { useTranslation } from "react-i18next";

interface CardDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  card: CardTask;
}

export function CardDetailDialog({
  open,
  onOpenChange,
  card,
}: CardDetailDialogProps) {
  const { t, i18n } = useTranslation("common");
  const currentLang = i18n.language;

  const { user } = useAuth();
  const currentBoard = useStore((state) => state.currentBoard);
  const workspace = useStore((state) => state.currentWorkspace);
  const { createCard, updateCard, deleteCard } = useStore();

  const usersOnWorkspace = workspace?.members || [];
  const workspaceLabels = currentBoard?.labels || [];

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");
  const [assignedMembers, setAssignedMembers] = useState<UserCard[]>(
    card.members || []
  );
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(
    card.labels || []
  );
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(card.comments || []);
  const [selectedLabelsMultiple, setSelectedLabelsMultiple] = React.useState<
    string[]
  >([]);
  const [selectedUsersMultiple, setSelectedUsersMultiple] = React.useState<
    string[]
  >([]);

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description || "");
    setDueDate(card.dueDate || "");
    setAssignedMembers(card.members || []);
    setSelectedLabels(card.labels || []);
    setComments(card.comments || []);
  }, [card]);

  const workspaceMembers: UserCard[] = workspace?.members || [];
  const isNewCard = !card.cardId || card.title === "";

  const handleSave = async () => {
    if (!title.trim()) {
      alert(t("title_required"));
      return;
    }

    const cardData = {
      ...card,
      listId: card.listId,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || undefined,
      members: assignedMembers,
      labels: selectedLabels,
      comments,
    };

    if (isNewCard) {
      await createCard(cardData);
    } else {
      await updateCard(card.cardId, cardData);
    }

    // Redirection dynamique
    if (currentBoard && workspace) {
      window.location.href = `/${currentLang}/workspace/${workspace.workspaceId}/board/${currentBoard.boardId}`;
    }

    onOpenChange(false);
  };

  const handleDelete = async () => {
    if (confirm(t("confirm_delete_task"))) {
      await deleteCard(card.cardId);
      onOpenChange(false);
    }
  };

  const handleAddMember = (memberId: string) => {
    const member = workspaceMembers.find((m) => m.user_id === memberId);
    if (member && !assignedMembers.find((m) => m.user_id === memberId)) {
      setAssignedMembers([...assignedMembers, member]);
    }
  };

  const handleRemoveMember = (memberId: string) => {
    setAssignedMembers(assignedMembers.filter((m) => m.user_id !== memberId));
  };

  const handleToggleLabel = (label: Label) => {
    const exists = selectedLabels.find((l) => l.labelId === label.labelId);
    if (exists) {
      setSelectedLabels(
        selectedLabels.filter((l) => l.labelId !== label.labelId)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      commentId: crypto.randomUUID(),
      content: newComment.trim(),
      cardId: card.cardId,
      userId: user?.user_id || "",
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleAddNewItem = () => {
    alert("Add new item action triggered!");
    // In a real app, you might open a form to add a new item
  };

  const customLabelsActions = [
    {
      label: "Add New Item",
      onSelect: handleAddNewItem,
      icon: PlusCircle,
    },
  ];

  const handleAddNewMember = () => {
    alert("Add new member action triggered!");
    // In a real app, you might open a form to add a new member
  };

  const customMembersActions = [
    {
      label: "Add New Member",
      onSelect: handleAddNewMember,
      icon: PlusCircle,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isNewCard ? t("create_task") : t("task_details")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Titre */}
          <div className="space-y-2">
            <LabelUI htmlFor="task-title">
              {t("title")}
              <p className="text-red-500">*</p>
            </LabelUI>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("task_title_placeholder")}
              className="text-lg font-semibold"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <LabelUI htmlFor="task-description">{t("description")}</LabelUI>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("description_placeholder")}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date limite */}
            <div className="space-y-2">
              <LabelUI
                htmlFor="task-due-date"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                {t("due_date")}
              </LabelUI>
              <Input
                id="task-due-date"
                type="datetime-local"
                value={
                  dueDate ? format(new Date(dueDate), "yyyy-MM-dd'T'HH:mm") : ""
                }
                onChange={(e) => setDueDate(e.target.value)}
              />
              {dueDate && (
                <p className="text-xs text-muted-foreground">
                  {format(new Date(dueDate), "PPP à HH:mm", { locale: fr })}
                </p>
              )}
            </div>

            {/* Priorité */}
            <div className="space-y-2">
              <LabelUI>{t("labels")}</LabelUI>
              <MultiSelectLabels
                labels={workspaceLabels}
                selected={selectedLabelsMultiple}
                onSelectedChange={setSelectedLabelsMultiple}
                placeholder="Select your labels..."
                emptyMessage="No label found."
                maxDisplayItems={2}
                customActions={customLabelsActions}
              />
            </div>
          </div>

          <Separator />

          {/* Membres assignés */}
          <div className="space-y-2">
            <LabelUI className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t("assigned_members")}
            </LabelUI>

            <MultiSelectUsers
              users={usersOnWorkspace}
              selected={assignedMembers.map((m) => m.user_id)}
              onSelectedChange={setSelectedUsersMultiple}
              placeholder="Assign members..."
              emptyMessage="No members found."
              maxDisplayItems={2}
              customActions={customMembersActions}
            />
          </div>

          <Separator />

          {/* Dialog Footer */}
          <DialogFooter className="flex justify-between sm:justify-between">
            <div>
              {!isNewCard && (
                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t("delete")}
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleSave}>
                {isNewCard ? t("create") : t("save")}
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
