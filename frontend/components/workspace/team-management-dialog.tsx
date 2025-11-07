"use client"

import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, UserMinus, Crown, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Workspace {
  workspaceId: string;
  name: string;
  ownerId: string;
  owner: {
    user_id: string;
    username: string;
    email: string;
    picture?: string;
  };
}

interface TeamManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspace: Workspace
}

export function TeamManagementDialog({ open, onOpenChange, workspace }: TeamManagementDialogProps) {
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<"Viewer" | "Member" | "Admin">("Member")
  const [isLoading, setIsLoading] = useState(false)
  const [isAddingMember, setIsAddingMember] = useState(false)

  const { fetchMembers, addMember, removeMember, updateMemberRole, user: currentUser, members } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (open && workspace.workspaceId) {
      setIsLoading(true)
      fetchMembers(workspace.workspaceId)
        .catch((error) => {
          console.error('Error loading members:', error)
          toast({
            title: "Erreur",
            description: "Impossible de charger les membres",
            variant: "destructive",
          })
        })
        .finally(() => setIsLoading(false))
    }
  }, [open, workspace.workspaceId])

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer un email valide",
        variant: "destructive",
      })
      return
    }

    if (newMemberEmail.trim() === workspace.owner.email) {
      toast({
        title: "Membre existant",
        description: "Le propriétaire est déjà membre du workspace",
        variant: "destructive",
      })
      return
    }

    const isAlreadyMember = members.some(m => m.user.email === newMemberEmail.trim())
    if (isAlreadyMember) {
      toast({
        title: "Membre existant",
        description: "Cet utilisateur est déjà membre du workspace",
        variant: "destructive",
      })
      return
    }

    setIsAddingMember(true)
    try {
      await addMember(workspace.workspaceId, newMemberEmail.trim(), newMemberRole)
      
      toast({
        title: "Invitation envoyée",
        description: `Une invitation a été envoyée à ${newMemberEmail}`,
      })

      setNewMemberEmail("")
      setNewMemberRole("Member")
    } catch (error: any) {
      console.error('Error adding member:', error)
      
      const errorMessage = error?.message?.includes('User not found') 
        ? "Aucun utilisateur trouvé avec cet email"
        : "Impossible d'ajouter le membre"
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsAddingMember(false)
    }
  }

  const handleRemoveMember = async (userId: string) => {
    if (userId === currentUser?.user_id) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas vous retirer vous-même du workspace",
        variant: "destructive",
      })
      return
    }

    if (userId === workspace.ownerId) {
      toast({
        title: "Action impossible",
        description: "Le propriétaire ne peut pas être retiré du workspace",
        variant: "destructive",
      })
      return
    }

    try {
      await removeMember(workspace.workspaceId, userId)
      
      const member = members.find((m) => m.user.user_id === userId)
      toast({
        title: "Membre retiré",
        description: `${member?.user.username} a été retiré du workspace`,
      })
    } catch (error) {
      console.error('Error removing member:', error)
      toast({
        title: "Erreur",
        description: "Impossible de retirer le membre",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (userId === workspace.ownerId) {
      toast({
        title: "Action impossible",
        description: "Le rôle du propriétaire ne peut pas être modifié",
        variant: "destructive",
      })
      return
    }

    try {
      await updateMemberRole(workspace.workspaceId, userId, newRole)
      
      const member = members.find((m) => m.user.user_id === userId)
      toast({
        title: "Rôle mis à jour",
        description: `${member?.user.username} est maintenant ${newRole.toLowerCase()}`,
      })
    } catch (error) {
      console.error('Error updating role:', error)
      toast({
        title: "Erreur",
        description: "Impossible de modifier le rôle",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Management</DialogTitle>
          <DialogDescription>Manage members of "{workspace.name}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Current Members ({members.length})
            </Label>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {members.map((member) => {
                  const isOwner = member.user.user_id === workspace.ownerId
                  const isCurrentUser = member.user.user_id === currentUser?.user_id

                  return (
                    <div key={`${member.workspace_id}-${member.user_id}`} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.user.picture} alt={member.user.username} />
                          <AvatarFallback className="text-xs">
                            {member.user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {member.user.username}
                            {isCurrentUser && " (vous)"}
                          </p>
                          <p className="text-xs text-muted-foreground">{member.user.email}</p>
                        </div>
                        
                        {isOwner ? (
                          <Badge variant="secondary" className="gap-1">
                            <Crown className="h-3 w-3" />
                            Owner
                          </Badge>
                        ) : (
                          <Select
                            value={member.role}
                            onValueChange={(value) => handleUpdateRole(member.user.user_id, value)}
                            disabled={isCurrentUser}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Member">Member</SelectItem>
                              <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      
                      {!isOwner && !isCurrentUser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMember(member.user.user_id)}
                          className="text-destructive hover:text-destructive ml-2"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Invite a new member</Label>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="memberEmail" className="text-sm">
                  Email
                </Label>
                <Input
                  id="memberEmail"
                  type="email"
                  placeholder="email@exemple.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddMember()
                    }
                  }}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="memberRole" className="text-sm">
                  Role
                </Label>
                <Select 
                  value={newMemberRole} 
                  onValueChange={(value: "Viewer" | "Member" | "Admin") => setNewMemberRole(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Administrator</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleAddMember}
                disabled={!newMemberEmail.trim() || isAddingMember}
                className="w-full"
              >
                {isAddingMember ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add into Workspace
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
