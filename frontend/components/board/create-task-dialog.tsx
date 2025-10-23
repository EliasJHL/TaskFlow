"use client"

import type { Card as CardTask} from "@/lib/store"
import type { User as UserCard } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, Tag, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface CardDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: CardTask
}

export function CardDetailDialog({ open, onOpenChange, card }: CardDetailDialogProps) {
  const user = useAuth()
  const workspace = useStore((state) => state.currentWorkspace)
  const updateCard = useStore((state) => state.updateCard)
  const deleteCard = useStore((state) => state.deleteCard)

  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [dueDate, setDueDate] = useState(card.dueDate || "")
  const [assignedTo, setAssignedTo] = useState<UserCard[]>(card.members || [])

  useEffect(() => {
    setTitle(card.title)
    setDescription(card.description || "")
    setDueDate(card.dueDate || "")
    setAssignedTo(card.members || [])
  }, [card])

  const workspaceMembers: UserCard[] = workspace?.members || []

  const addCard = useStore((state) => state.createCard)

  const handleSave = () => {
    //   addCard(card.listId, {
    //     ...card,
    //     title,
    //     description,
    //     dueDate: dueDate || undefined,
    //     members: assignedTo
    //   })
    // }
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      deleteCard(card.cardId)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="task-title">Title</Label>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">Description</Label>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description de la tâche..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-due-date">Deadline</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="task-due-date"
                type="date"
                value={dueDate ? format(new Date(dueDate), "yyyy-MM-dd") : ""}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          {card.labels && card.labels.length > 0 && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Labels
              </Label>
              <div className="flex flex-wrap gap-2">
                {card.labels.map((label) => (
                  <Badge key={label.labelId} variant="secondary">
                    {label.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Assigned Members
            </Label>
            {assignedTo.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {assignedTo.map((member) => (
                  <Badge key={member.user_id} variant="outline" className="gap-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs">
                        {member.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {member.user_id.substring(0, 8)}
                    <button
                      onClick={() => setAssignedTo(assignedTo.filter((u) => u.user_id !== member.user_id))}
                      className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucun membre assigné</p>
            )}
          </div>

          {card.comments && card.comments.length > 0 && (
            <div className="space-y-2">
              <Label>Comments ({card.comments.length})</Label>
              <div className="space-y-2">
                {card.comments.map((comment) => (
                  <div key={comment.commentId} className="p-3 bg-muted rounded-lg">
                    <p className="text-sm">Comment ID: {comment.commentId}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
