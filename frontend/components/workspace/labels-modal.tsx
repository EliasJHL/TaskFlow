"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useTranslation } from "react-i18next"

const COLORS = [
  { name: "Gray", value: "#6B7280" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Amber", value: "#F59E0B" },
  { name: "Yellow", value: "#EAB308" },
  { name: "Lime", value: "#84CC16" },
  { name: "Green", value: "#10B981" },
  { name: "Emerald", value: "#059669" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Fuchsia", value: "#D946EF" },
  { name: "Pink", value: "#EC4899" },   
  { name: "Rose", value: "#F43F5E" },
]

interface Label {
  name: string
  color: string
}

interface LabelsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LabelsModal({ open, onOpenChange }: LabelsModalProps) {
  const { t } = useTranslation("common")
  const [labels, setLabels] = useState<Label[]>([])
  const [newLabel, setNewLabel] = useState("")
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value)

  const addLabel = () => {
    if (newLabel.trim() && !labels.find((l) => l.name === newLabel.trim())) {
      setLabels([...labels, { name: newLabel.trim(), color: selectedColor }])
      setNewLabel("")
      setSelectedColor(COLORS[0].value)
    }
  }

  const removeLabel = (labelToRemove: string) => {
    setLabels(labels.filter((label) => label.name !== labelToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addLabel()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <DialogTitle className="text-2xl">{t("manage_labels")}</DialogTitle>
          </div>
          <DialogDescription>{t("labels_modal_description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="p-6 rounded-2xl bg-background border border-border shadow-lg space-y-4">
            <h3 className="text-lg font-semibold">{t("new_label")}</h3>

            <div className="flex gap-2">
              <Input
                placeholder={t("label_name_placeholder")}
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={addLabel}
                size="icon"
                className="bg-gradient-to-r from-[#007757FF] to-[#00D4C3FF] hover:brightness-110 transition-all"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t("color")}</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                      selectedColor === color.value ? "border-foreground scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{t("labels")}</h3>
              <span className="text-sm text-muted-foreground">
                {labels.length} {labels.length > 1 ? t("labels_plural") : t("labels_singular")}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              {labels.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t("no_labels_yet")}</p>
              ) : (
                labels.map((label) => (
                  <div
                    key={label.name}
                    className="group flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:shadow-md transition-all"
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: label.color }} />
                    <span className="text-sm font-medium">{label.name}</span>
                    <button
                      onClick={() => removeLabel(label.name)}
                      className="opacity-0 group-hover:opacity-100 hover:text-destructive transition-all ml-1"
                      aria-label={t("remove_label", { label: label.name })}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
