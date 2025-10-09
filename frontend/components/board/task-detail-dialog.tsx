"use client"

import { useState } from "react"
import { useStore, type Task } from "@/lib/store"
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
  task: Task
}

export function TaskDetailDialog({ open, onOpenChange, task }: TaskDetailDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || "")
  const [priority, setPriority] = useState(task.priority)
  const [dueDate, setDueDate] = useState(task.dueDate || "")
  const [labels, setLabels] = useState(task.labels)
  const [newLabel, setNewLabel] = useState("")
  const [assignedTo, setAssignedTo] = useState(task.assignedTo || [])

  const { updateTask, deleteTask, boards } = useStore()
  const { users } = useAuth()
  const { toast } = useToast()

  const board = boards.find((b) => b.id === task.boardId)
  const boardMembers = users.filter((user) => board?.members.includes(user.id))
  const assignedUsers = users.filter((user) => assignedTo.includes(user.id))

  const handleSave = () => {
    updateTask(task.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      dueDate: dueDate || undefined,
      labels,
      assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
    })

    toast({
      title: "Tâche mise à jour",
      description: "Les modifications ont été sauvegardées",
    })

    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      deleteTask(task.id)
      toast({
        title: "Tâche supprimée",
        description: "La tâche a été supprimée avec succès",
      })
      onOpenChange(false)
    }
  }

  const addLabel = () => {
    if (newLabel.trim() && !labels.includes(newLabel.trim())) {
      setLabels([...labels, newLabel.trim()])
      setNewLabel("")
    }
  }

  const removeLabel = (labelToRemove: string) => {
    setLabels(labels.filter((label) => label !== labelToRemove))
  }

  const toggleUserAssignment = (userId: string) => {
    setAssignedTo((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const getPriorityLabel = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "Haute"
      case "medium":
        return "Moyenne"
      case "low":
        return "Basse"
      default:
        return "Non définie"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-lg font-semibold" />
              ) : (
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
              )}
              <DialogDescription className="mt-1">
                Créée le {format(new Date(task.createdAt), "d MMMM yyyy", { locale: fr })}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
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
          {/* Description */}
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
                {task.description || "Aucune description"}
              </p>
            )}
          </div>

          <Separator />

          {/* Task Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority & Due Date */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Priorité</Label>
                {isEditing ? (
                  <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Basse</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="high">Haute</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                    <span className="text-sm">{getPriorityLabel(task.priority)}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date limite
                </Label>
                {isEditing ? (
                  <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                ) : (
                  <p className="text-sm">
                    {task.dueDate
                      ? format(new Date(task.dueDate), "d MMMM yyyy", { locale: fr })
                      : "Aucune date limite"}
                  </p>
                )}
              </div>
            </div>

            {/* Assigned Users */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Assigné à
              </Label>
              {isEditing ? (
                <div className="space-y-2 max-h-32 overflow-y-auto border rounded-md p-2">
                  {boardMembers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`user-${user.id}`}
                        checked={assignedTo.includes(user.id)}
                        onCheckedChange={() => toggleUserAssignment(user.id)}
                      />
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="text-xs">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Label htmlFor={`user-${user.id}`} className="text-sm font-normal cursor-pointer">
                        {user.name}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {assignedUsers.length > 0 ? (
                    assignedUsers.map((user) => (
                      <div key={user.id} className="flex items-center gap-2 bg-muted rounded-md px-2 py-1">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback className="text-xs">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
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

          {/* Labels */}
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
                      <Badge key={label} variant="secondary" className="gap-1">
                        {label}
                        <button
                          type="button"
                          onClick={() => removeLabel(label)}
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
                {task.labels.length > 0 ? (
                  task.labels.map((label) => (
                    <Badge key={label} variant="secondary">
                      {label}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Aucune étiquette</p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
