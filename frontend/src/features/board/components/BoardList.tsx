import { useMemo } from "react";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SortableCard } from "./SortableCard";
import { CreateCardForm } from "./CreateCardForm";
import { cn } from "@/lib/utils";

interface BoardListProps {
  list: any;
  boardId: string;
  onCardClick?: (cardId: string) => void;
  onCardCreated?: (cardId: string) => void;
}

export const BoardList = ({ list, boardId, onCardClick, onCardCreated }: BoardListProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.list_id,
    data: {
      type: "List",
      list,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const cardIds = useMemo(() => list.cards.map((c: any) => c.card_id), [list.cards]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex h-full w-72 flex-col shrink-0 gap-2 rounded-xl bg-muted/40 border border-border/40 max-h-full transition-colors",
        isDragging && "border-primary/50 ring-2 ring-primary/20"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between px-4 pt-3 pb-1 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{list.title}</h3>
          <span className="text-xs text-muted-foreground font-medium">
            {list.cards.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="h-3 w-3" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-2 pb-2">
          <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
            {list.cards.map((card: any) => (
              <SortableCard key={card.card_id} card={card} onClick={() => onCardClick?.(card.card_id)} />
            ))}
          </SortableContext>
        </div>
      </ScrollArea>

      <div className="p-2 pt-0">
        <CreateCardForm listId={list.list_id} boardId={boardId} onCardCreated={onCardCreated} />
      </div>
    </div>
  );
};