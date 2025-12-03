import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateListDocument, GetBoardFullDocument } from "@/graphql/generated";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CreateListFormProps {
  boardId: string;
}

export const CreateListForm = ({ boardId }: CreateListFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");

  const [createList, { loading }] = useMutation(CreateListDocument, {
    refetchQueries: [{ query: GetBoardFullDocument, variables: { board_id: boardId } }],
    onCompleted: () => {
      toast.success("Liste créée !");
      setTitle("");
      setIsEditing(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createList({ variables: { input: { title, board_id: boardId } } });
  };

  if (!isEditing) {
    return (
      <div className="w-72 shrink-0">
        <Button 
          onClick={() => setIsEditing(true)}
          variant="outline" 
          className="w-full justify-start gap-2 border-dashed border-border/60 bg-transparent text-muted-foreground hover:bg-background hover:text-foreground h-12"
        >
          <Plus className="h-4 w-4" /> Ajouter une liste
        </Button>
      </div>
    );
  }

  return (
    <div className="w-72 shrink-0 rounded-xl bg-muted/40 border border-border/40 p-3 space-y-3">
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          placeholder="Titre de la liste..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-background"
        />
        <div className="flex items-center gap-2 mt-3">
          <Button type="submit" size="sm" disabled={loading}>
            Ajouter
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};