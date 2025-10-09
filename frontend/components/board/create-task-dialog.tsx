"use client"

import type React from "react"

import { useState } from "react"
import { useStore } from "@/lib/store"
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
import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  columnId: string
  boardId: string
}

export function CreateTaskDialog({ open, onOpenChange, columnId, boardId }: CreateTaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [dueDate, setDueDate] = useState("")
  const [labels, setLabels] = useState<string[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [assignedTo, setAssignedTo] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { createTask, tasks, boards } = useStore()
  const { users } = useAuth()
  const { toast } = useToast()

  const board = boards.find((b) => b.id === boardId)
  const boardMembers = users.filter((user) => board?.members.includes(user.id))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsLoading(true)

    try {
      const columnTasks = tasks.filter((task) => task.columnId === columnId)
      const maxOrder = Math.max(...columnTasks.map((task) => task.order), -1)

      createTask({
        title: title.trim(),
        description: description.trim() || undefined,
        status: "todo",
        priority,
        dueDate: dueDate || undefined,
        labels,
        assignedTo: assignedTo.length > 0 ? assignedTo : undefined,
        boardId,
        columnId,
        order: maxOrder + 1,
      })

      toast({
        title: "Tâche créée",
        description: `La tâche "${title}" a été ajoutée`,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setPriority("medium")
      setDueDate("")
      setLabels([])
      setNewLabel("")
      setAssignedTo([])
      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la tâche",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle tâche</DialogTitle>
          <DialogDescription>Ajoutez une tâche à votre projet</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre de la tâche</Label>
            <Input
              id="title"
              placeholder="Ma nouvelle tâche"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre tâche..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Date limite (optionnel)</Label>
              <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assigner à</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
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
            {assignedTo.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {assignedTo.map((userId) => {
                  const user = users.find((u) => u.id === userId)
                  if (!user) return null
                  return (
                    <Badge key={userId} variant="secondary" className="gap-1">
                      {user.name}
                      <button
                        type="button"
                        onClick={() => toggleUserAssignment(userId)}
                        className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Étiquettes</Label>
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
              <div className="flex flex-wrap gap-1 mt-2">
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

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={!title.trim() || isLoading}>
              {isLoading ? "Création..." : "Créer la tâche"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
