/*
** EPITECH PROJECT, 2025
** TaskFlow
** File description:
** BoardCard
*/

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { BoardType } from "@/graphql/generated";

interface BoardCardProps {
  board_id: string;
  title: string;
  color: string;
  description?: string | null;
  type: BoardType;
}

const getBoardTypeLabel = (type: BoardType) =>
  type === BoardType.Whiteboard ? "Whiteboard" : "Kanban";

export const BoardCard = ({ board_id, title, color, description, type }: BoardCardProps) => {
  return (
    <Link to={`/app/board/${board_id}`} className="group block h-full">
      <div className={cn(
        "relative h-32 overflow-hidden rounded-xl border border-border bg-card transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 group-hover:ring-2 ring-primary/20"
      )}>
        
        <div 
          className="absolute left-0 top-0 bottom-0 w-2 transition-all group-hover:w-3" 
          style={{ backgroundColor: color }} 
        />

        <div className="p-4 pl-6 flex flex-col h-full justify-between">
          <div>
            <h3 className="font-semibold text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
             <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                {getBoardTypeLabel(type)}
             </div>
             <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        </div>
      </div>
    </Link>
  );
};
