"use client"

import { useState } from "react"
import { useStore, type Board } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, UserMinus, Crown } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  board: Board
}

export function TeamManagementDialog({ open, onOpenChange, board }: TeamManagementDialogProps) {
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberName, setNewMemberName] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<"member" | "admin">("member")

  const { updateBoard } = useStore()
  const { users, addUser, user: currentUser } = useAuth()
  const { toast } = useToast()

  const boardMembers = users.filter((user) => board.members.includes(user.id))
  const availableUsers = users.filter((user) => !board.members.includes(user.id))

  const handleAddExistingMember = (userId: string) => {
    const updatedMembers = [...board.members, userId]
    updateBoard(board.id, { members: updatedMembers })

    const user = users.find((u) => u.id === userId)
    toast({
      title: "Membre ajouté",
      description: `${user?.name} a été ajouté au projet`,
    })
  }

  const handleRemoveMember = (userId: string) => {
    if (userId === currentUser?.id) {
      toast({
        title: "Action impossible",
        description: "Vous ne pouvez pas vous retirer vous-même du projet",
        variant: "destructive",
      })
      return
    }

    const updatedMembers = board.members.filter((id) => id !== userId)
    updateBoard(board.id, { members: updatedMembers })

    const user = users.find((u) => u.id === userId)
    toast({
      title: "Membre retiré",
      description: `${user?.name} a été retiré du projet`,
    })
  }

  const handleCreateAndAddMember = () => {
    if (!newMemberEmail.trim() || !newMemberName.trim()) return

    // Check if user already exists
    const existingUser = users.find((u) => u.email === newMemberEmail.trim())
    if (existingUser) {
      toast({
        title: "Utilisateur existant",
        description: "Cet utilisateur existe déjà. Utilisez la liste ci-dessous pour l'ajouter.",
        variant: "destructive",
      })
      return
    }

    // Create new user
    addUser({
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      role: newMemberRole,
    })

    // Add to board (the new user will have the latest ID)
    setTimeout(() => {
      const newUser = users.find((u) => u.email === newMemberEmail.trim())
      if (newUser) {
        const updatedMembers = [...board.members, newUser.id]
        updateBoard(board.id, { members: updatedMembers })
      }
    }, 100)

    toast({
      title: "Membre créé et ajouté",
      description: `${newMemberName} a été invité au projet`,
    })

    setNewMemberEmail("")
    setNewMemberName("")
    setNewMemberRole("member")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Team Management</DialogTitle>
          <DialogDescription>Manage members of "{board.title}"</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">Current Members ({boardMembers.length})</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {boardMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    {member.role === "admin" && (
                      <Badge variant="secondary" className="gap-1">
                        <Crown className="h-3 w-3" />
                        Admin
                      </Badge>
                    )}
                  </div>
                  {member.id !== currentUser?.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {availableUsers.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Add Existing Users</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {availableUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-3">
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
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleAddExistingMember(user.id)}>
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label className="text-base font-semibold">Invite New Member</Label>
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="memberEmail" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="memberEmail"
                    type="email"
                    placeholder="email@exemple.com"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="memberRole" className="text-sm">
                  Rôle
                </Label>
                <Select value={newMemberRole} onValueChange={(value: "member" | "admin") => setNewMemberRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrator</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleCreateAndAddMember}
                disabled={!newMemberEmail.trim() || !newMemberName.trim()}
                className="w-full"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
