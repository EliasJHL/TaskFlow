import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { KanbanCard } from "./KanbanCard";

interface SortableCardProps {
  card: any;
  onClick?: () => void;
}

export const SortableCard = ({ card, onClick }: SortableCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.card_id,
    data: {
      type: "Card",
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={onClick} className="touch-none">
      <KanbanCard
        title={card.title}
        labels={card.labels}
        dueDate={card.due_date}
        assignees={card.assignees}
        commentsCount={card.comments?.length}
        attachmentsCount={card.attachments?.length}
      />
    </div>
  );
};