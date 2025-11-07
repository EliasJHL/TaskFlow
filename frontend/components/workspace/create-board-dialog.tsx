"use client"

import type React from "react"
import { useState } from "react"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const boardColors = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#84cc16", // lime
  "#f97316", // orange
]

export function CreateBoardDialog() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedColor, setSelectedColor] = useState(boardColors[0])
  const workspace = useStore((state) => state.currentWorkspace)
  const [isLoading, setIsLoading] = useState(false)

  const { createBoard } = useStore()
  const { user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !user) return

    setIsLoading(true)

    try {
      createBoard({
        title: title.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
        workspaceId: workspace?.workspaceId || "",
      })

      toast({
        title: "Board created",
        description: `Board "${title}" has been created successfully`,
      })

      setTitle("")
      setDescription("")
      setSelectedColor(boardColors[0])
      setOpen(false)
      window.location.reload()
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Something went wrong while creating the board.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new board</DialogTitle>
            <DialogDescription>Organize your tasks</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Board's name</Label>
            <Input
              id="title"
              placeholder="My awesome project"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe your workspace..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Color of the Board</Label>
            <div className="flex gap-2 flex-wrap">
              {boardColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`h-8 w-8 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || isLoading}>
              {isLoading ? "Loading.." : "Create Board"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
