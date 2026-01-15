import { ArrowRight, Pin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WorkspaceCardProps {
  id: string;
  name: string;
  description?: string | null;
  color: string;
  isPinned: boolean;
  role?: string;
}

export const WorkspaceCard = ({
  id,
  name,
  description,
  color,
  isPinned,
  role,
}: WorkspaceCardProps) => {
  return (
    <Link to={`/app/workspace/${id}`} className="group block h-full">
      <div
        className={cn(
          'relative h-full overflow-hidden rounded-xl border border-border bg-card p-6 transition-all duration-300',
          'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1',
        )}
      >
        <div
          className="absolute top-0 left-0 w-full h-1 opacity-80 transition-all group-hover:h-1.5 group-hover:opacity-100"
          style={{ backgroundColor: color }}
        />

        <div className="flex justify-between items-start mb-4">
          <div
            className="h-10 w-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shadow-sm"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          {isPinned && (
            <Pin className="w-4 h-4 text-muted-foreground rotate-45" />
          )}
        </div>

        <h3 className="font-semibold text-lg tracking-tight mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10">
          {description || 'Aucune description.'}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <Badge variant="secondary" className="text-xs font-normal">
            {role || 'Membre'}
          </Badge>
          <div className="text-xs text-muted-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
            Ouvrir <ArrowRight className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};
