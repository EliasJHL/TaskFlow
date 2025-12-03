import { Calendar, EditIcon, MessageSquare, Paperclip } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  title: string;
  labels?: { name: string; color: string }[];
  dueDate?: any;
  assignees?: { username: string }[];
  commentsCount?: number;
  attachmentsCount?: number;
}

export const KanbanCard = ({ title, labels, dueDate, assignees, commentsCount, attachmentsCount }: KanbanCardProps) => {
  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 shadow-sm transition-all hover:ring-2 hover:ring-primary/20 hover:shadow-md cursor-grab active:cursor-grabbing">
      
      {labels && labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-1">
          {labels.map((label, i) => (
            <div 
                key={i} 
                className="h-1.5 w-8 rounded-full" 
                style={{ backgroundColor: label.color }} 
                title={label.name}
            />
          ))}
        </div>
      )}

      <span className="text-sm font-medium text-card-foreground leading-tight">
        {title}
      </span>

      <div className="flex items-center justify-between mt-2">

        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          {dueDate && (
             <div className={cn("flex items-center gap-1", new Date(dueDate) < new Date() ? "text-red-500" : "")}>
                <Calendar className="w-3 h-3" />
                <span>{new Date(dueDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
             </div>
          )}
          {!!commentsCount && (
             <div className="flex items-center gap-1 hover:text-foreground">
                <MessageSquare className="w-3 h-3" /> {commentsCount}
             </div>
          )}
          {!!attachmentsCount && (
             <div className="flex items-center gap-1 hover:text-foreground">
                <Paperclip className="w-3 h-3" /> {attachmentsCount}
             </div>
          )}
        </div>

        <div className="flex -space-x-1.5">
           {assignees?.map((user, i) => (
             <Avatar key={i} className="h-5 w-5 border border-card">
                <AvatarFallback className="text-[8px] bg-primary/10 text-primary font-bold">
                    {user.username.slice(0,1).toUpperCase()}
                </AvatarFallback>
             </Avatar>
           ))}
        </div>
      </div>
      
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <EditIcon className="w-3 h-3 text-muted-foreground" />
      </div>
    </div>
  );
};