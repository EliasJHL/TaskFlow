"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, UserMinus, Crown, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

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
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace: Workspace;
}

export function TeamManagementDialog({
  open,
  onOpenChange,
  workspace,
}: TeamManagementDialogProps) {
  const { t } = useTranslation("common");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<
    "Viewer" | "Member" | "Admin"
  >("Member");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingMember, setIsAddingMember] = useState(false);

  const {
    fetchMembers,
    addMember,
    removeMember,
    updateMemberRole,
    user: currentUser,
    members,
  } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open && workspace.workspaceId) {
      setIsLoading(true);
      fetchMembers(workspace.workspaceId)
        .catch(() => {
          toast({
            title: t("error"),
            description: t("cannot_load_members"),
            variant: "destructive",
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [open, workspace.workspaceId, fetchMembers, toast, t]);

  const handleAddMember = async () => {
    if (!newMemberEmail.trim()) {
      toast({
        title: t("email_required"),
        description: t("enter_valid_email"),
        variant: "destructive",
      });
      return;
    }

    if (newMemberEmail.trim() === workspace.owner.email) {
      toast({
        title: t("existing_member"),
        description: t("owner_already_member"),
        variant: "destructive",
      });
      return;
    }

    const isAlreadyMember = members.some(
      (m) => m.user.email === newMemberEmail.trim()
    );
    if (isAlreadyMember) {
      toast({
        title: t("existing_member"),
        description: t("user_already_member"),
        variant: "destructive",
      });
      return;
    }

    setIsAddingMember(true);
    try {
      await addMember(
        workspace.workspaceId,
        newMemberEmail.trim(),
        newMemberRole
      );
      toast({
        title: t("invitation_sent"),
        description: t("invitation_sent_to", { email: newMemberEmail }),
      });
      setNewMemberEmail("");
      setNewMemberRole("Member");
    } catch (error: any) {
      toast({
        title: t("error"),
        description: error?.message?.includes("User not found")
          ? t("user_not_found")
          : t("cannot_add_member"),
        variant: "destructive",
      });
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (userId === currentUser?.user_id) {
      toast({
        title: t("action_not_allowed"),
        description: t("cannot_remove_self"),
        variant: "destructive",
      });
      return;
    }
    if (userId === workspace.ownerId) {
      toast({
        title: t("action_not_allowed"),
        description: t("cannot_remove_owner"),
        variant: "destructive",
      });
      return;
    }
    try {
      await removeMember(workspace.workspaceId, userId);
      const member = members.find((m) => m.user.user_id === userId);
      toast({
        title: t("member_removed"),
        description: t("member_removed_name", { name: member?.user.username }),
      });
    } catch {
      toast({
        title: t("error"),
        description: t("cannot_remove_member"),
        variant: "destructive",
      });
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (userId === workspace.ownerId) {
      toast({
        title: t("action_not_allowed"),
        description: t("cannot_change_owner_role"),
        variant: "destructive",
      });
      return;
    }
    try {
      await updateMemberRole(workspace.workspaceId, userId, newRole);
      const member = members.find((m) => m.user.user_id === userId);
      toast({
        title: t("role_updated"),
        description: t("role_updated_name", {
          name: member?.user.username,
          role: newRole.toLowerCase(),
        }),
      });
    } catch {
      toast({
        title: t("error"),
        description: t("cannot_update_role"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("team_management")}</DialogTitle>
          <DialogDescription>
            {t("manage_members_workspace", { workspace: workspace.name })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t("current_members", { count: members.length })}
            </Label>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {members.map((member) => {
                  const isOwner = member.user.user_id === workspace.ownerId;
                  const isCurrentUser =
                    member.user.user_id === currentUser?.user_id;

                  return (
                    <div
                      key={`${member.workspace_id}-${member.user_id}`}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={member.user.picture}
                            alt={member.user.username}
                          />
                          <AvatarFallback className="text-xs">
                            {member.user.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {member.user.username}{" "}
                            {isCurrentUser && `(${t("you")})`}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {member.user.email}
                          </p>
                        </div>

                        {isOwner ? (
                          <Badge variant="secondary" className="gap-1">
                            <Crown className="h-3 w-3" />
                            {t("owner")}
                          </Badge>
                        ) : (
                          <Select
                            value={member.role}
                            onValueChange={(value) =>
                              handleUpdateRole(member.user.user_id, value)
                            }
                            disabled={isCurrentUser}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">
                                {t("admin")}
                              </SelectItem>
                              <SelectItem value="Member">
                                {t("member")}
                              </SelectItem>
                              <SelectItem value="Viewer">
                                {t("viewer")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      {!isOwner && !isCurrentUser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleRemoveMember(member.user.user_id)
                          }
                          className="text-destructive hover:text-destructive ml-2"
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">
              {t("invite_new_member")}
            </Label>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="memberEmail" className="text-sm">
                  {t("email")}
                </Label>
                <Input
                  id="memberEmail"
                  type="email"
                  placeholder={t("email_placeholder")}
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddMember();
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberRole" className="text-sm">
                  {t("role")}
                </Label>
                <Select
                  value={newMemberRole}
                  onValueChange={(value: "Viewer" | "Member" | "Admin") =>
                    setNewMemberRole(value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">{t("admin")}</SelectItem>
                    <SelectItem value="Member">{t("member")}</SelectItem>
                    <SelectItem value="Viewer">{t("viewer")}</SelectItem>
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
                    {t("adding")}
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    {t("add_to_workspace")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
