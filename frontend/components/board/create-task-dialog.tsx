"use client"

import type { Card as CardTask, Label } from "@/lib/store"
import type { User as UserCard } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label as LabelUI } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Tag, X, Paperclip, MessageSquare, Trash2, Plus } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface CardDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: CardTask
}

export function CardDetailDialog({ open, onOpenChange, card }: CardDetailDialogProps) {
  const { user } = useAuth()
  const currentBoard = useStore((state) => state.currentBoard)
  const workspace = useStore((state) => state.currentWorkspace)
  const { createCard, updateCard, deleteCard } = useStore()

  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [dueDate, setDueDate] = useState(card.dueDate || "")
  const [assignedMembers, setAssignedMembers] = useState<UserCard[]>(card.members || [])
  const [selectedLabels, setSelectedLabels] = useState<Label[]>(card.labels || [])
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(card.comments || [])

  useEffect(() => {
    setTitle(card.title)
    setDescription(card.description || "")
    setDueDate(card.dueDate || "")
    setAssignedMembers(card.members || [])
    setSelectedLabels(card.labels || [])
    setComments(card.comments || [])
  }, [card])

  const workspaceMembers: UserCard[] = workspace?.members || []
  const boardLabels: Label[] = currentBoard?.labels || []
  const isNewCard = !card.cardId || card.title === ""

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Le titre est requis")
      return
    }

    const cardData = {
      ...card,
      listId: card.listId,
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate || undefined,
      members: assignedMembers,
      labels: selectedLabels,
      comments
    }

    if (isNewCard) {
      await createCard(cardData)
    } else {
      await updateCard(card.cardId, cardData)
    }
    
    onOpenChange(false)
  }

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      await deleteCard(card.cardId)
      onOpenChange(false)
    }
  }

  const handleAddMember = (memberId: string) => {
    const member = workspaceMembers.find(m => m.user_id === memberId)
    if (member && !assignedMembers.find(m => m.user_id === memberId)) {
      setAssignedMembers([...assignedMembers, member])
    }
  }

  const handleRemoveMember = (memberId: string) => {
    setAssignedMembers(assignedMembers.filter(m => m.user_id !== memberId))
  }

  const handleToggleLabel = (label: Label) => {
    const exists = selectedLabels.find(l => l.labelId === label.labelId)
    if (exists) {
      setSelectedLabels(selectedLabels.filter(l => l.labelId !== label.labelId))
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      commentId: crypto.randomUUID(),
      content: newComment.trim(),
      cardId: card.cardId,
      userId: user?.user_id || "",
      createdAt: new Date().toISOString()
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNewCard ? "Créer une nouvelle tâche" : "Détails de la tâche"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Titre */}
          <div className="space-y-2">
            <LabelUI htmlFor="task-title">Titre *</LabelUI>
            <Input
              id="task-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de la tâche"
              className="text-lg font-semibold"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <LabelUI htmlFor="task-description">Description</LabelUI>
            <Textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez une description détaillée..."
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date limite */}
            <div className="space-y-2">
              <LabelUI htmlFor="task-due-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date limite
              </LabelUI>
              <Input
                id="task-due-date"
                type="datetime-local"
                value={dueDate ? format(new Date(dueDate), "yyyy-MM-dd'T'HH:mm") : ""}
                onChange={(e) => setDueDate(e.target.value)}
              />
              {dueDate && (
                <p className="text-xs text-muted-foreground">
                  {format(new Date(dueDate), "PPP à HH:mm", { locale: fr })}
                </p>
              )}
            </div>

            {/* Priorité ou statut (optionnel) */}
            <div className="space-y-2">
              <LabelUI>Priorité</LabelUI>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Basse</SelectItem>
                  <SelectItem value="medium">🟡 Moyenne</SelectItem>
                  <SelectItem value="high">🟠 Haute</SelectItem>
                  <SelectItem value="urgent">🔴 Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Labels */}
          <div className="space-y-2">
            <LabelUI className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Labels
            </LabelUI>
            <div className="flex flex-wrap gap-2">
              {boardLabels.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun label disponible</p>
              ) : (
                boardLabels.map((label) => {
                  const isSelected = selectedLabels.find(l => l.labelId === label.labelId)
                  return (
                    <Badge
                      key={label.labelId}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        backgroundColor: isSelected ? label.color : 'transparent',
                        borderColor: label.color,
                        color: isSelected ? '#fff' : label.color
                      }}
                      onClick={() => handleToggleLabel(label)}
                    >
                      {label.name}
                      {isSelected && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  )
                })
              )}
            </div>
          </div>

          <Separator />

          {/* Membres assignés */}
          <div className="space-y-2">
            <LabelUI className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Membres assignés
            </LabelUI>
            
            {/* Liste des membres assignés */}
            {assignedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {assignedMembers.map((member) => (
                  <Badge key={member.user_id} variant="secondary" className="gap-2 pr-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={member.picture} alt={member.username} />
                      <AvatarFallback className="text-xs">
                        {member.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member.username}</span>
                    <button
                      onClick={() => handleRemoveMember(member.user_id)}
                      className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Sélecteur pour ajouter des membres */}
            {workspaceMembers.length > 0 && (
              <Select onValueChange={handleAddMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Ajouter un membre..." />
                </SelectTrigger>
                <SelectContent>
                  {workspaceMembers
                    .filter(m => !assignedMembers.find(am => am.user_id === m.user_id))
                    .map((member) => (
                      <SelectItem key={member.user_id} value={member.user_id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.picture} alt={member.username} />
                            <AvatarFallback className="text-xs">
                              {member.username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.username}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}

            {assignedMembers.length === 0 && workspaceMembers.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun membre disponible</p>
            )}
          </div>

          <Separator />

          {/* Pièces jointes */}
          {card.attachments && card.attachments.length > 0 && (
            <>
              <div className="space-y-2">
                <LabelUI className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  Pièces jointes ({card.attachments.length})
                </LabelUI>
                <div className="space-y-2">
                  {card.attachments.map((attachment) => (
                    <div
                      key={attachment.attachmentId}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{attachment.filename}</p>
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Ouvrir
                          </a>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Commentaires */}
          {!isNewCard && (
            <div className="space-y-3">
              <LabelUI className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Commentaires ({comments.length})
              </LabelUI>

              {/* Liste des commentaires */}
              {comments.length > 0 && (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.commentId} className="flex gap-3 p-3 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {user?.username?.substring(0, 2).toUpperCase() || "??"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{user?.username || "Utilisateur"}</span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(comment.createdAt), "dd MMM à HH:mm", { locale: fr })}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Ajouter un commentaire */}
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ajouter un commentaire..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleAddComment()
                    }
                  }}
                />
                <Button onClick={handleAddComment} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <div>
            {!isNewCard && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {isNewCard ? "Créer" : "Enregistrer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
