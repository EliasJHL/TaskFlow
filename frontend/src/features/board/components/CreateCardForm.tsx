/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** CreateCardForm
*/

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCard } from "../hooks/useBoardActions";
import { BoardRealtime } from "@/components/realtime/BoardRealtime";

interface CreateCardFormProps {
  listId: string;
  boardId: string;
  onCardCreated?: (cardId: string) => void;
}

export const CreateCardForm = ({ listId, boardId, onCardCreated }: CreateCardFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  
  const { createCard, isLoading } = useCreateCard(boardId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const { data } = await createCard({ 
      variables: { input: { title, list_id: listId, description: "" } } 
    });

    if (data?.createCard?.card_id) {
        setTitle("");
        setIsEditing(false);
        onCardCreated?.(data.createCard.card_id);
    }
  };

  if (!isEditing) {
    return (
      <Button onClick={() => setIsEditing(true)} variant="ghost" className="w-full justify-start text-muted-foreground h-9 text-sm px-2">
        <Plus className="mr-2 h-3 w-3" /> Ajouter une carte
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-2 pb-2">
      {<BoardRealtime boardId={boardId} />}
      <Textarea
        autoFocus
        placeholder="Titre..."
        className="min-h-[60px] resize-none bg-card mb-2 text-sm"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); }}}
      />
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" disabled={isLoading} className="h-8 px-3">Ajouter</Button>
        <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};