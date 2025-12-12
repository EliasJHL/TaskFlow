/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** InviteMemberDialog
*/

import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Mail, Loader2 } from 'lucide-react';

const INVITE_MEMBER_MUTATION = gql`
  mutation InviteMember($workspaceId: ID!, $email: String!) {
    addMemberToWorkspace(workspace_id: $workspaceId, email: $email) {
      user_id
    }
  }
`;

interface InviteMemberDialogProps {
  workspaceId: string;
}

export const InviteMemberDialog = ({ workspaceId }: InviteMemberDialogProps) => {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const [inviteMember, { loading }] = useMutation(INVITE_MEMBER_MUTATION, {
    onCompleted: () => {
      setIsOpen(false);
      setEmail('');
      alert("Invitation envoyée !"); 
    },
    onError: (error) => {
      alert(error.message);
    },
    refetchQueries: ['GetWorkspaceDetails'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    inviteMember({
      variables: {
        workspaceId,
        email,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* Le bouton style "Avatar pointillé" que tu avais déjà */}
        <button className="h-10 w-10 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-transparent hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-0 ml-2">
          <Plus className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inviter des membres</DialogTitle>
          <DialogDescription>
            Envoyez une invitation par email pour rejoindre ce workspace.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="collegue@exemple.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={loading || !email}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Envoyer l'invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};