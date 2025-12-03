import { GetUserWorkspacesDocument, type Workspace } from "@/graphql/generated";
import { WorkspaceCard } from "../components/WorkspaceCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useQuery } from "@apollo/client";
// import { CreateWorkspaceDialog } from "../components/CreateWorkspaceDialog"; // À créer plus tard

export const DashboardPage = () => {
  const { data, loading, error } = useQuery(GetUserWorkspacesDocument);
  const [search, setSearch] = useState("");

  // Filtrage local simple
  const filteredWorkspaces = data?.workspaces?.filter(ws => 
    ws?.name.toLowerCase().includes(search.toLowerCase())
  );

  const pinnedWorkspaces = filteredWorkspaces?.filter(ws => ws?.is_pinned);
  const otherWorkspaces = filteredWorkspaces?.filter(ws => !ws?.is_pinned);

  if (error) return <div className="text-red-500">Erreur : {error.message}</div>;

  return (
    <div className="space-y-8">
      
      {/* Header de la page */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Mes Espaces</h2>
            <p className="text-muted-foreground">Gérez vos projets et vos équipes.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Rechercher..." 
                    className="pl-8" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {/* <CreateWorkspaceDialog> */}
                <Button>
                    <Plus className="w-4 h-4 mr-2" /> Créer
                </Button>
            {/* </CreateWorkspaceDialog> */}
        </div>
      </div>

      {/* --- LOADING STATE --- */}
      {loading && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3].map(i => (
                 <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
             ))}
         </div>
      )}

      {/* --- CONTENT --- */}
      {!loading && (
        <>
            {/* Section Épinglés (Si existants) */}
            {pinnedWorkspaces && pinnedWorkspaces.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Favoris</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pinnedWorkspaces.map(ws => ws && (
                            <WorkspaceCard 
                                key={ws.workspace_id}
                                id={ws.workspace_id}
                                name={ws.name}
                                description={ws.description}
                                color={ws.color}
                                isPinned={true}
                                role={ws.members?.[0]?.role}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Section Tous les autres */}
            <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tous les espaces</h3>
                
                {otherWorkspaces?.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
                        <p className="text-muted-foreground">Aucun espace de travail trouvé.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherWorkspaces?.map(ws => ws && (
                        <WorkspaceCard 
                            key={ws.workspace_id}
                            id={ws.workspace_id}
                            name={ws.name}
                            description={ws.description}
                            color={ws.color}
                            isPinned={false}
                            role={ws.members?.[0]?.role}
                        />
                    ))}
                </div>
            </div>
        </>
      )}
    </div>
  );
};