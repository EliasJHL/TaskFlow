import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateLabelDocument, GetBoardFullDocument } from "@/graphql/generated";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Filter } from "lucide-react";

const COLORS = [
  "#EF4444", "#F97316", "#F59E0B", "#10B981", "#06B6D4", 
  "#3B82F6", "#6366F1", "#8B5CF6", "#EC4899", "#64748B"
];

interface CreateLabelDialogProps {
  boardId: string;
}

export const CreateLabelDialog = ({ boardId }: CreateLabelDialogProps) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [open, setOpen] = useState(false);

  const [createLabel, { loading }] = useMutation(CreateLabelDocument, {
    refetchQueries: [{ query: GetBoardFullDocument, variables: { board_id: boardId } }],
    onCompleted: () => {
      setOpen(false);
      setName("");
    }
  });

  const handleSubmit = () => {
    createLabel({
      variables: {
        input: {
          board_id: boardId,
          name,
          color: selectedColor
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 text-xs gap-2 text-muted-foreground">
           <Filter className="h-3 w-3" /> Labels
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un label</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex justify-center mb-4">
             <div className="h-8 px-4 rounded-full flex items-center justify-center font-medium text-sm text-white shadow-sm transition-all" style={{ backgroundColor: selectedColor }}>
                {name || "Aperçu"}
             </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Urgent, Design..."
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Couleur</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
            <DialogClose asChild><Button variant="outline">Annuler</Button></DialogClose>
            <Button onClick={handleSubmit} disabled={loading || !name}>Créer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};