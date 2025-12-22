/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** CreateWorkspaceDialog
 */

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUserWorkspacesDocument } from "@/graphql/generated";
import { toast } from "sonner";

const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($input: CreateWorkspaceInput!) {
    createWorkspace(input: $input) {
      workspace_id
      name
      color
    }
  }
`;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateWorkspaceDialog({ open, onOpenChange }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");

  const [createWorkspace, { loading }] = useMutation(CREATE_WORKSPACE, {
    refetchQueries: [{ query: GetUserWorkspacesDocument }],
    onCompleted: () => {
      toast.success("Espace de travail créé");
      onOpenChange(false);
      setName("");
      setDescription("");
      setColor("#6366f1");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Le nom est requis");
      return;
    }

    await createWorkspace({
      variables: {
        input: {
          name,
          description,
          color,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un espace de travail</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Nom</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mon workspace"
            />
          </div>

          <div className="space-y-1">
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description optionnelle"
            />
          </div>

          <div className="space-y-1">
            <Label>Couleur</Label>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 p-1"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Création..." : "Créer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
