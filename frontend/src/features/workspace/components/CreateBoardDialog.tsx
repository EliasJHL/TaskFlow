import { useState } from "react";
import { useMutation } from "@apollo/client";
import { BoardType, CreateBoardDocument, GetWorkspaceDetailsDocument } from "@/graphql/generated";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const BOARD_COLORS = [
  "#7B61FF", // Purple
  "#3ECF8E", // Green
  "#FF5733", // Orange
  "#00C2E0", // Blue
  "#F5A623", // Yellow
  "#FF6F91", // Pink
  "#8E44AD", // Dark Purple
  "#27AE60", // Dark Green
  "#3498DB", // Dark Blue
  "#E11D48", // Red
  "#64748B", // Gray
];

interface CreateBoardDialogProps {
  workspaceId: string;
}

export const CreateBoardDialog = ({ workspaceId }: CreateBoardDialogProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(BOARD_COLORS[0]);
  const [boardType, setBoardType] = useState<BoardType>(BoardType.Kanban);

  const [createBoard, { loading }] = useMutation(CreateBoardDocument, {
    refetchQueries: [{ 
        query: GetWorkspaceDetailsDocument, 
        variables: { workspace_id: workspaceId } 
    }],
    onCompleted: () => {
      toast.success("Tableau créé avec succès !");
      setOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Erreur lors de la création", { description: error.message });
    }
  });

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSelectedColor(BOARD_COLORS[0]);
    setBoardType(BoardType.Kanban);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    createBoard({
      variables: {
        input: {
          title,
          description,
          color: selectedColor,
          workspace_id: workspaceId,
          type: boardType
        }
      }
    });
  };

  const isWhiteboard = boardType === BoardType.Whiteboard;
  const boardTypeLabel = isWhiteboard ? "whiteboard" : "tableau";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 gap-2">
            <Plus className="w-4 h-4" /> Nouveau
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer un nouveau {boardTypeLabel}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Type</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBoardType(BoardType.Kanban)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all",
                  boardType === BoardType.Kanban
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="text-sm font-semibold">Tableau Kanban</div>
                <div className="text-xs text-muted-foreground">Listes et cartes</div>
              </button>
              <button
                type="button"
                onClick={() => setBoardType(BoardType.Whiteboard)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all",
                  boardType === BoardType.Whiteboard
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="text-sm font-semibold">Whiteboard</div>
                <div className="text-xs text-muted-foreground">Canvas libre</div>
              </button>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              placeholder="Ex: Roadmap 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optionnel)</Label>
            <Textarea
              id="description"
              placeholder="À quoi va servir ce tableau ?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="grid gap-3">
            <Label>Couleur de couverture</Label>
            <div className="flex flex-wrap gap-3">
              {BOARD_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full transition-all flex items-center justify-center ring-offset-background",
                    selectedColor === color 
                        ? "ring-2 ring-offset-2 ring-primary scale-110" 
                        : "hover:scale-105 hover:opacity-80"
                  )}
                  style={{ backgroundColor: color }}
                >
                    {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

        </div>

        <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button onClick={handleSubmit} disabled={loading || !title} className="bg-primary">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Créer le {boardTypeLabel}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
