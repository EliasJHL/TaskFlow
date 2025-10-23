"use client"

import { useEffect, useState } from "react"
import { useStore, type Card as CardTask } from "@/lib/store"
import { type User as UserCard } from "@/lib/auth"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Tag, Trash2, X } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

interface TaskDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  card: CardTask
}

export function TaskDetailDialog({ open, onOpenChange, card }: TaskDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [dueDate, setDueDate] = useState(card.dueDate || "")
  const [labels, setLabels] = useState(card.labels || [])
  const [newLabel, setNewLabel] = useState("")
  const [assignedTo, setAssignedTo] = useState(card.members || [])

  // const { updateTask, deleteTask, boards } = useStore()
  const user = useAuth((state) => state.user)
  const { toast } = useToast()

  const workspace = useStore((state) => state.currentWorkspace)
  const workspaceMembers: UserCard[] = workspace?.members || []
  const assignedUsers: UserCard[] = assignedTo

  const handleSave = () => {
  //   updateTask(card.cardId, {
  //     title: title.trim(),
  //     description: description.trim() || undefined,
  //     dueDate: dueDate || undefined,
  //     labels,
  //     assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
  //   })

  //   toast({
  //     title: "Tâche mise à jour",
  //     description: "Les modifications ont été sauvegardées",
  //   })

  //   setIsEditing(false)
  }

  const handleDelete = () => {
  //   if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
  //     deleteTask(task.id)
  //     toast({
  //       title: "Tâche supprimée",
  //       description: "La tâche a été supprimée avec succès",
  //     })
  //     onOpenChange(false)
  //   }
  }

  const addLabel = () => {
  //   if (newLabel.trim() && !labels.includes(newLabel.trim())) {
  //     setLabels([...labels, newLabel.trim()])
  //     setNewLabel("")
  //   }
  }

  const removeLabel = (labelToRemove: string) => {
  //   setLabels(labels.filter((label) => label !== labelToRemove))
  }

  const toggleUserAssignment = (user: UserCard) => {
    // setAssignedTo((prev) => {
    //   const isAssigned = prev.some((u) => u.user_id === user.user_id)
    //   if (isAssigned) {
    //     return prev.filter((u) => u.user_id !== user.user_id)
    //   }
    //   return [...prev, user]
    // })
  }

  useEffect(() => {
    setTitle(card.title)
    setDescription(card.description || "")
    setDueDate(card.dueDate || "")
    setLabels(card.labels || [])
    setAssignedTo(card.members || [])
  }, [card])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-semibold" />
              ) : (
                <DialogTitle className="text-xl">{card.title}</DialogTitle>
              )}
              {/* <DialogDescription className="mt-1">
                Créée le {format(new Date(card.), "d MMMM yyyy", { locale: fr })}
              </DialogDescription> */}
            </div>
            <div className="flex items-center gap-2">
              {/* <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} /> */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Description
            </Label>
            {isEditing ? (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ajoutez une description..."
                rows={4}
              />
            ) : (
              <p className="text-sm text-muted-foreground min-h-[60px] p-3 border rounded-md">
                {card.description || "Aucune description"}
              </p>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date limite
                </Label>
                {isEditing ? (
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                ) : (
                  <p className="text-sm">
                    {card.dueDate
                      ? format(new Date(card.dueDate), "d MMMM yyyy", { locale: fr })
                      : "Aucune date limite"}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Assigné à
              </Label>
              {isEditing ? (
                <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                  {workspaceMembers.map((user) => (
                    <div key={user.user_id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.user_id}`}
                        checked={assignedTo.includes(user)}
                        onCheckedChange={() => toggleUserAssignment(user)}
                      />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.username} />
                        <AvatarFallback className="text-xs">
                          {user.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Label htmlFor={`user-${user.user_id}`} className="text-sm font-normal cursor-pointer">
                        {user.username}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {assignedUsers.length > 0 ? (
                    assignedUsers.map((user) => (
                      <div key={user.user_id} className="flex items-center gap-2 bg-muted rounded-md px-2 py-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.picture || "/placeholder.svg"} alt={user.username} />
                          <AvatarFallback className="text-xs">
                            {user.username
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.username}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Non assignée</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Étiquettes</Label>
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ajouter une étiquette"
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addLabel()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addLabel}>
                    Ajouter
                  </Button>
                </div>
                {labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {labels.map((label) => (
                      <Badge key={label.labelId} variant="secondary" className="gap-1">
                        {label.name}
                        <button
                          type="button"
                          onClick={() => removeLabel(label.labelId)}
                          className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {card.labels.length > 0 ? (
                  card.labels.map((label) => (
                    <Badge key={label.labelId} variant="secondary">
                      {label.name}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune étiquette</p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSave}>Sauvegarder</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Modifier</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
