import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GetCardDetailsDocument,
  UpdateCardContentDocument,
  AddLabelToCardDocument,
  RemoveLabelFromCardDocument,
  AddAssigneeToCardDocument, // Assure-toi d'avoir généré ces mutations
  RemoveAssigneeFromCardDocument,
} from '@/graphql/generated';

// UI Components
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { BorderBeam } from '@/components/ui/border-beam';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Icons
import {
  AlignLeft,
  CheckSquare,
  Clock,
  CreditCard,
  Layout,
  Paperclip,
  Calendar,
  Plus,
  Tag,
  Trash2,
  User,
  X,
  Activity,
  Check,
} from 'lucide-react';

interface CardDialogProps {
  cardId: string | null;
  isOpen: boolean;
  onClose: () => void;
  boardLabels?: any[];
  boardMembers?: any[];
}

export const CardDialog = ({
  cardId,
  isOpen,
  onClose,
  boardLabels = [],
  boardMembers = [],
}: CardDialogProps) => {
  // --- 1. DATA FETCHING ---
  const { data, loading } = useQuery(GetCardDetailsDocument, {
    variables: { card_id: cardId! },
    skip: !cardId,
    fetchPolicy: 'network-only',
  });

  const card = data?.card;

  // --- 2. MUTATIONS ---
  const [updateCard] = useMutation(UpdateCardContentDocument);
  const [addLabel] = useMutation(AddLabelToCardDocument);
  const [removeLabel] = useMutation(RemoveLabelFromCardDocument);
  const [addAssignee] = useMutation(AddAssigneeToCardDocument);
  const [removeAssignee] = useMutation(RemoveAssigneeFromCardDocument);

  // --- 3. STATE LOCAL ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDescFocused, setIsDescFocused] = useState(false);

  // Sync quand les données arrivent
  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description || '');
    }
  }, [card]);

  const handleSaveTitle = () => {
    if (!cardId || title === card?.title) return;
    updateCard({ variables: { card_id: cardId, input: { title } } }).then(() =>
      toast.success('Titre mis à jour'),
    );
  };

  const handleSaveDescription = () => {
    if (!cardId) return;
    updateCard({ variables: { card_id: cardId, input: { description } } }).then(
      () => {
        toast.success('Description enregistrée');
        setIsDescFocused(false);
      },
    );
  };

  const toggleLabel = (labelId: string) => {
    if (!cardId || !card) return;
    const isActive = card.labels.some((l: any) => l.label_id === labelId);

    if (isActive) {
      removeLabel({ variables: { card_id: cardId, label_id: labelId } });
    } else {
      addLabel({ variables: { card_id: cardId, label_id: labelId } });
    }
  };

  const toggleMember = (userId: string) => {
    if (!cardId || !card) return;
    const isAssigned = card.assignees.some((u: any) => u.user_id === userId);

    if (isAssigned) {
      removeAssignee({ variables: { card_id: cardId, user_id: userId } });
    } else {
      addAssignee({ variables: { card_id: cardId, user_id: userId } });
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 gap-0 bg-background border-zinc-800 overflow-hidden shadow-2xl rounded-xl h-[85vh] flex flex-col sm:max-w-6xl md:h-[90vh]">
        <BorderBeam
          size={500}
          duration={10}
          colorFrom="hsl(var(--primary))"
          colorTo="transparent"
        />

        <div className="h-32 w-full relative shrink-0 bg-gradient-to-r from-zinc-800 to-zinc-900">
          <div className="absolute top-4 right-4 z-10">
            <DialogClose asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-black/20 hover:bg-black/40 text-white border-none h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 -mt-6 relative z-10">
            <div className="md:col-span-9 space-y-8 bg-background rounded-t-2xl pt-4">
              <div className="flex items-start gap-4 pr-10">
                <CreditCard className="w-6 h-6 mt-1.5 text-primary" />
                <div className="w-full space-y-1">
                  {loading ? (
                    <Skeleton className="h-9 w-3/4" />
                  ) : (
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={handleSaveTitle}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && e.currentTarget.blur()
                      }
                      className="text-2xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground rounded-none border-b border-transparent focus:border-primary/50 transition-colors"
                      placeholder="Titre de la carte"
                    />
                  )}
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    Dans la liste{' '}
                    <span className="font-medium text-foreground underline decoration-dashed underline-offset-4">
                      To Do
                    </span>
                  </div>
                </div>
              </div>

              {!loading && card && (
                <div className="pl-10 flex flex-wrap gap-8">
                  {card.assignees.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Membres
                      </h4>
                      <div className="flex gap-2">
                        {card.assignees.map((u: any) => (
                          <Avatar
                            key={u.user_id}
                            className="h-8 w-8 border-2 border-background shadow-sm cursor-pointer hover:-translate-y-1 transition-transform"
                          >
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {u.username.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                        </Popover>
                      </div>
                    </div>
                  )}

                  {card.labels.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Étiquettes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {card.labels.map((l: any) => (
                          <Badge
                            key={l.label_id}
                            style={{ backgroundColor: l.color }}
                            className="h-8 px-3 text-white hover:opacity-90 transition-opacity cursor-pointer border-0 rounded-md font-medium"
                          >
                            {l.name}
                          </Badge>
                        ))}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-md bg-muted/50 hover:bg-muted"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4">
                <AlignLeft className="w-6 h-6 mt-1 text-muted-foreground" />
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Description</h3>
                  </div>

                  {loading ? (
                    <Skeleton className="h-32 w-full" />
                  ) : (
                    <div
                      className={cn(
                        'rounded-xl border bg-card/50 transition-all duration-200 overflow-hidden group',
                        isDescFocused
                          ? 'ring-2 ring-primary/20 border-primary/50 shadow-sm bg-card'
                          : 'border-transparent hover:bg-muted/30',
                      )}
                    >
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setIsDescFocused(true)}
                        placeholder="Ajouter une description plus détaillée..."
                        className="min-h-[150px] bg-transparent border-none focus-visible:ring-0 resize-none p-4 text-sm leading-relaxed"
                      />
                      {isDescFocused && (
                        <div className="p-2 bg-muted/30 flex items-center gap-2 justify-end border-t border-border/50 animate-in slide-in-from-top-2 fade-in">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setIsDescFocused(false);
                              setDescription(card?.description || '');
                            }}
                          >
                            Annuler
                          </Button>
                          <Button
                            onClick={handleSaveDescription}
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Enregistrer
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <Activity className="w-6 h-6 mt-1 text-muted-foreground" />
                <div className="w-full space-y-4">
                  <h3 className="font-semibold text-lg">Activité</h3>
                  <div className="flex gap-3 items-start">
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        ME
                      </AvatarFallback>
                    </Avatar>
                    <div className="relative w-full">
                      <Input
                        placeholder="Écrire un commentaire..."
                        className="bg-muted/30 border-transparent hover:bg-muted/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ajouter
                </span>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted hover:text-foreground transition-colors shadow-sm"
                    >
                      <User className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Membres
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-60 p-2">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm mb-2 px-2">
                        Membres du tableau
                      </h4>
                      {boardMembers?.map((m: any) => {
                        const isAssigned = card?.assignees.some(
                          (u: any) => u.user_id === m.user.user_id,
                        );
                        return (
                          <div
                            key={m.user.user_id}
                            onClick={() => toggleMember(m.user.user_id)}
                            className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer transition-colors text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                  {m.user.username[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>{m.user.username}</span>
                            </div>
                            {isAssigned && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted hover:text-foreground transition-colors shadow-sm"
                    >
                      <Tag className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Étiquettes
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-60 p-2">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm mb-2 px-2">
                        Labels disponibles
                      </h4>
                      {boardLabels?.map((l: any) => {
                        const isActive = card?.labels.some(
                          (cl: any) => cl.label_id === l.label_id,
                        );
                        return (
                          <div
                            key={l.label_id}
                            onClick={() => toggleLabel(l.label_id)}
                            className="flex items-center justify-between p-2 hover:opacity-80 rounded-md cursor-pointer text-white text-sm font-medium mb-1 transition-all active:scale-95"
                            style={{ backgroundColor: l.color }}
                          >
                            {l.name}
                            {isActive && (
                              <div className="bg-black/20 rounded-full p-0.5">
                                <Check className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {boardLabels?.length === 0 && (
                        <div className="text-xs text-muted-foreground p-2">
                          Aucun label créé sur ce tableau.
                        </div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted hover:text-foreground transition-colors shadow-sm"
                >
                  <CheckSquare className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Checklist
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted hover:text-foreground transition-colors shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Dates
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </span>
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted hover:text-foreground transition-colors shadow-sm"
                >
                  <Layout className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Déplacer
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start h-8 bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 shadow-none"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-2" /> Supprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
