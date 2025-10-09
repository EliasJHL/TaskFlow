"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CreateColumnButtonProps {
  boardId: string
}

const columnColors = [
  "#ef4444", // red
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#10b981", // emerald
  "#3b82f6", // blue
  "#06b6d4", // cyan
]

export function CreateColumnButton({ boardId }: CreateColumnButtonProps) {
  const [isCreating, setIsCreating] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedColor, setSelectedColor] = useState(columnColors[0])
  const { createColumn, columns } = useStore()
  const { toast } = useToast()

  const handleCreate = () => {
    if (!title.trim()) return

    const boardColumns = columns.filter((col) => col.boardId === boardId)
    const maxOrder = Math.max(...boardColumns.map((col) => col.order), -1)

    createColumn({
      title: title.trim(),
      color: selectedColor,
      order: maxOrder + 1,
      boardId,
    })

    toast({
      title: "Colonne créée",
      description: `La colonne "${title}" a été ajoutée`,
    })

    setTitle("")
    setSelectedColor(columnColors[0])
    setIsCreating(false)
  }

  const handleCancel = () => {
    setTitle("")
    setSelectedColor(columnColors[0])
    setIsCreating(false)
  }

  if (isCreating) {
    return (
      <Card className="w-80 flex-shrink-0">
        <CardContent className="p-4 space-y-3">
          <Input
            placeholder="Nom de la colonne"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCreate()
              if (e.key === "Escape") handleCancel()
            }}
            autoFocus
          />

          <div className="flex gap-1">
            {columnColors.map((color) => (
              <button
                key={color}
                type="button"
                className={`h-6 w-6 rounded border-2 transition-all ${
                  selectedColor === color ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreate} disabled={!title.trim()}>
              <Check className="h-4 w-4 mr-1" />
              Créer
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              Annuler
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button
      variant="ghost"
      className="w-80 h-fit flex-shrink-0 border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 p-4"
      onClick={() => setIsCreating(true)}
    >
      <Plus className="h-4 w-4 mr-2" />
      Ajouter une colonne
    </Button>
  )
}
