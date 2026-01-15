import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GetWorkspaceDetailsDocument } from '@/graphql/generated';
import {
  Settings,
  Plus,
  Users,
  KanbanSquare,
  LayoutDashboard,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
} from 'lucide-react';

import { Particles } from "@/components/ui/particles"
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BoardCard } from '@/features/workspace/components/BoardCard';
import { CreateBoardDialog } from '@/features/workspace/components/CreateBoardDialog';
import { getAvatarUrl } from '@/components/shared/getAvatarUrl';
import { InviteMemberDialog } from '@/features/workspace/components/InviteMemberDialog';

export const WorkspacePage = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const { data, loading, error } = useQuery(GetWorkspaceDetailsDocument, {
    variables: { workspace_id: workspaceId! },
    skip: !workspaceId,
  });

  if (loading) return <WorkspaceSkeleton />;
  if (error || !data?.workspace)
    return (
      <div className="p-10 text-red-500">
        Impossible de charger le workspace. Erreur : {error?.message}
      </div>
    );

  const workspace = data.workspace;

  const workspaceColor = workspace?.color || '#64748b';

  return (
    <div className="min-h-screen bg-background">
      <div
        className="h-48 w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${workspaceColor}20, transparent)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <Particles />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 -mt-20 relative z-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link
              to="/app"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-foreground font-medium flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: workspaceColor }}
              />
              {workspace.name}
            </span>
          </div>
          

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex gap-6">
              <div
                className="h-24 w-24 rounded-2xl shadow-2xl flex items-center justify-center text-4xl font-bold text-white shrink-0 ring-4 ring-background"
                style={{ backgroundColor: workspaceColor }}
              >
                {workspace.name.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col justify-end pb-1">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">
                  {workspace.name}
                </h1>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <p className="text-sm max-w-md line-clamp-1">
                    {workspace.description || 'Aucune description configurée.'}
                  </p>
                  <span className="h-1 w-1 rounded-full bg-zinc-600" />
                  <Badge
                    variant="secondary"
                    className="text-xs font-normal bg-secondary/50"
                  >
                    {workspace.members[0]?.role || 'Membre'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center -space-x-3 hover:space-x-1 transition-all duration-300 px-2">
                {workspace.members.slice(0, 5).map((m) => (
                  <div key={m.user.user_id} className="relative group">
                    <Avatar className="border-4 border-background w-10 h-10 shadow-sm cursor-pointer transition-transform hover:scale-110 hover:z-10">
                      <AvatarImage
                        src={m.user.picture || getAvatarUrl(m.user.username)}
                        alt={m.user.username}
                      />
                    </Avatar>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {m.user.username}
                    </div>
                  </div>
                ))}

                <InviteMemberDialog workspaceId={workspace.workspace_id} />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <CreateBoardDialog workspaceId={workspace.workspace_id} />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="boards" className="w-full mt-12">
          <div className="border-b border-border mb-8">
            <TabsList className="h-auto p-0 bg-transparent space-x-6">
              <CustomTabTrigger
                value="boards"
                icon={KanbanSquare}
                label="Tableaux"
                count={workspace.boards?.length}
              />
              <CustomTabTrigger
                value="views"
                icon={CalendarIcon}
                label="Vues"
              />
              <CustomTabTrigger
                value="members"
                icon={Users}
                label="Membres"
                count={workspace.members.length}
              />
              <CustomTabTrigger
                value="settings"
                icon={Filter}
                label="Filtres"
              />
            </TabsList>
          </div>

          <TabsContent
            value="boards"
            className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in"
          >
            {workspace.boards && workspace.boards.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <button className="group relative flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2 group-hover:scale-110 transition-transform text-muted-foreground group-hover:text-primary">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
                    Créer un tableau
                  </span>
                </button>

                {workspace.boards.map((board) => (
                  <BoardCard
                    key={board.board_id}
                    board_id={board.board_id}
                    title={board.title}
                    color={board.color}
                    description={board.description}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  Aucun tableau pour l'instant.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="views">
            <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
              Fonctionnalité Vue Calendrier / Liste bientôt disponible.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const CustomTabTrigger = ({ value, icon: Icon, label, count }: any) => (
  <TabsTrigger
    value={value}
    className="relative h-10 rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground hover:text-foreground data-[state=active]:shadow-none"
  >
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {count}
        </span>
      )}
    </div>
  </TabsTrigger>
);

const WorkspaceSkeleton = () => (
  <div className="space-y-8 container max-w-7xl mx-auto p-8 mt-10">
    <div className="flex gap-6 items-end">
      <Skeleton className="h-24 w-24 rounded-2xl" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
    <Separator />
    <div className="grid grid-cols-4 gap-4 mt-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  </div>
);
