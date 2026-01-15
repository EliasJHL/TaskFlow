/*
 ** EPITECH PROJECT, 2025
 ** TaskFlow
 ** File description:
 ** CardDialog
 */

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getAvatarUrl } from '@/components/shared/getAvatarUrl';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useCardModal } from '../hooks/useCardModal';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';

import {
  AlignLeft,
  CheckSquare,
  CreditCard,
  Layout,
  Calendar,
  Plus,
  Tag,
  Trash2,
  User,
  X,
  Activity,
  Check,
  Eye,
  Copy,
  Archive,
} from 'lucide-react';

interface CardDialogProps {
  cardId: string | null;
  isOpen: boolean;
  onClose: () => void;
  boardLabels?: any[];
  boardMembers?: any[];
  workspaceId?: string;
}

export const CardDialog = ({
  cardId,
  isOpen,
  onClose,
  boardLabels = [],
  boardMembers = [],
  workspaceId,
}: CardDialogProps) => {
  const { card, loading, actions } = useCardModal(cardId, workspaceId || '');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDescFocused, setIsDescFocused] = useState(false);

  const [checklistItems, setChecklistItems] = useState<
    { id: number; text: string; done: boolean }[]
  >([]);
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description || '');
      if (card.due_date) setDueDate(new Date(card.due_date));
    }
  }, [card]);

  const handleBlurTitle = () => {
    if (title !== card?.title) actions.updateTitle(title);
  };

  const handleSaveDescription = async () => {
    await actions.updateDescription(description);
    setIsDescFocused(false);
  };

  const addChecklistItem = () => {
    if (!newChecklistItem.trim()) return;
    setChecklistItems([
      ...checklistItems,
      { id: Date.now(), text: newChecklistItem, done: false },
    ]);
    setNewChecklistItem('');
  };

  const toggleChecklistItem = (id: number) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const progress =
    checklistItems.length > 0
      ? Math.round(
          (checklistItems.filter((i) => i.done).length /
            checklistItems.length) *
            100,
        )
      : 0;

  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    card?.card_members?.map((u: any) => u.user_id) || [],
  );

  useEffect(() => {
    setSelectedMemberIds(card?.card_members?.map((u: any) => u.user_id) || []);
  }, [card?.card_members]);

  const handleToggleMember = (userId: string) => {
    const isAlreadyMember = selectedMemberIds.includes(userId);
    let newIds: string[];

    if (isAlreadyMember) {
      newIds = selectedMemberIds.filter((id) => id !== userId);
    } else {
      newIds = [...selectedMemberIds, userId];
    }

    setSelectedMemberIds(newIds);

    try {
      actions.toggleMember(userId, card?.card_members || []);
    } catch (error) {
      setSelectedMemberIds(selectedMemberIds);
      console.error('Erreur lors de la mise à jour');
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 gap-0 bg-background border-zinc-800 overflow-hidden shadow-2xl rounded-xl h-[85vh] flex flex-col sm:max-w-6xl md:h-[90vh]">
        <div className="h-32 w-full relative shrink-0 bg-gradient-to-r from-zinc-800 to-zinc-900 group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-8 -mt-6 relative z-10">
            {/* --- COLONNE GAUCHE (Contenu Principal) --- */}
            <div className="md:col-span-9 space-y-10 bg-background rounded-t-2xl pt-4">
              {/* HEADER: TITRE */}
              <div className="flex items-start gap-4 pr-10">
                <CreditCard className="w-6 h-6 mt-1 text-primary" />
                <div className="w-full space-y-1">
                  {loading ? (
                    <Skeleton className="h-9 w-3/4" />
                  ) : (
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onBlur={handleBlurTitle}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && e.currentTarget.blur()
                      }
                      className="text-2xl font-bold border-none shadow-none px-0 h-auto focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground rounded-none border-b border-transparent focus:border-primary/50 transition-colors"
                      placeholder="Titre de la carte"
                    />
                  )}
                </div>
              </div>

              {!loading && card && (
                <div className="pl-10 flex flex-wrap gap-8">
                  {card.card_members && card.card_members.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Membres
                      </h4>
                      <div className="flex gap-2">
                        {card.card_members?.map((u: any) => (
                          <Avatar
                            key={u.user_id || u.user?.user_id}
                            className="..."
                          >
                            <AvatarImage
                              src={
                                u.picture ||
                                u.user?.picture ||
                                getAvatarUrl(u.username || u.user?.username)
                              }
                            />
                            <AvatarFallback>
                              {(u.username || u.user?.username || '?')
                                .slice(0, 2)
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-muted/50 hover:bg-muted"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Labels */}
                  {card.labels.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Étiquettes
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {card.labels.map((l: any) => (
                          <Badge
                            key={l.label_id}
                            style={{ backgroundColor: l.color }}
                            className="h-8 px-3 text-white hover:opacity-90 transition-opacity cursor-pointer border-0 rounded-md font-medium shadow-sm"
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

                  {/* Date d'échéance (Si active) */}
                  {dueDate && (
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Échéance
                      </h4>
                      <div className="flex items-center gap-2">
                        <Checkbox id="due-date-check" />
                        <Button
                          variant="secondary"
                          className="h-8 bg-muted/50 hover:bg-muted font-normal"
                        >
                          {format(dueDate, 'd MMMM yyyy', { locale: fr })}
                          {dueDate < new Date() && (
                            <Badge
                              variant="destructive"
                              className="ml-2 text-[10px] h-5 px-1"
                            >
                              En retard
                            </Badge>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: DESCRIPTION */}
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
                        className="min-h-[120px] bg-transparent border-none focus-visible:ring-0 resize-none p-4 text-sm leading-relaxed"
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
                          <Button onClick={handleSaveDescription} size="sm">
                            Enregistrer
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* SECTION: CHECKLIST (Fonctionnelle locale) */}
              {checklistItems.length > 0 && (
                <div className="flex gap-4">
                  <CheckSquare className="w-6 h-6 mt-1 text-muted-foreground" />
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Checklist</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setChecklistItems([])}
                      >
                        Supprimer
                      </Button>
                    </div>

                    {/* Barre de progression */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-muted-foreground w-8">
                        {progress}%
                      </span>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      {checklistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 group"
                        >
                          <Checkbox
                            checked={item.done}
                            onCheckedChange={() => toggleChecklistItem(item.id)}
                            className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span
                            className={cn(
                              'flex-1 text-sm transition-all',
                              item.done &&
                                'line-through text-muted-foreground opacity-70',
                            )}
                          >
                            {item.text}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() =>
                              setChecklistItems(
                                checklistItems.filter((i) => i.id !== item.id),
                              )
                            }
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              <div className="flex gap-4">
                <Activity className="w-6 h-6 mt-1 text-muted-foreground" />
                <div className="w-full space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Activité</h3>
                  </div>
                  {/* --- LISTE DES COMMENTAIRES --- */}
                  <div className="space-y-6">
                    {card?.comments?.map((comment: any) => (
                      <div
                        key={comment.comment_id}
                        className="flex gap-3 group"
                      >
                        <Avatar className="h-8 w-8 mt-1 border border-border">
                          <AvatarImage
                            src={
                              comment.author.picture ||
                              getAvatarUrl(comment.author.username)
                            }
                          />
                        </Avatar>

                        <div className="w-full space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">
                              {comment.author.username}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                comment.created_at,
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="bg-muted/30 p-3 rounded-r-xl rounded-bl-xl text-sm text-foreground/90 border border-transparent group-hover:border-border transition-colors">
                            {comment.content}
                          </div>

                          <div className="flex gap-3 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="hover:underline">
                              Répondre
                            </button>
                            <button className="hover:underline text-red-500">
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* --- NOUVEAU COMMENTAIRE --- */}
                  <div className="flex gap-3 items-start">
                    <div className="relative w-full space-y-2">
                      <div className="rounded-xl border border-border bg-card p-1 focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
                        <Textarea
                          placeholder="Écrire un commentaire..."
                          className="min-h-[40px] border-none focus-visible:ring-0 bg-transparent resize-none text-sm"
                        />
                        <div className="flex justify-between items-center p-2 pt-0">
                          <Button size="sm">Enregistrer</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- COLONNE DROITE (Sidebar Actions) --- */}
            <div className="md:col-span-3 space-y-6 pt-2">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ajouter
                </span>

                {/* Popover Membres */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                    >
                      <User className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Membres
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-60 p-2">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm mb-2 px-2 text-muted-foreground">
                        Membres du tableau
                      </h4>
                      {boardMembers?.map((m: any) => {
                        const userId = m.user?.user_id || m.user_id;

                        return (
                          <div
                            key={userId}
                            onClick={() => handleToggleMember(userId)}
                            className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer transition-colors text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={getAvatarUrl(m.user.username)}
                                />
                              </Avatar>
                              <span>{m.user?.username || m.username}</span>
                            </div>

                            {selectedMemberIds.includes(userId) && (
                              <Check className="w-3.5 h-3.5 text-primary" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Popover Labels */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                    >
                      <Tag className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Étiquettes
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-60 p-2">
                    <div className="space-y-1">
                      {boardLabels?.map((l: any) => (
                        <div
                          key={l.label_id}
                          onClick={() =>
                            actions.toggleLabel(l.label_id, card?.labels || [])
                          }
                          className="flex items-center justify-between p-2 hover:opacity-90 rounded-md cursor-pointer text-white text-sm font-medium mb-1"
                          style={{ backgroundColor: l.color }}
                        >
                          {l.name}
                          {card?.labels.some(
                            (cl: any) => cl.label_id === l.label_id,
                          ) && <Check className="w-3.5 h-3.5" />}
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Popover Checklist (Fonctionnel) */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                    >
                      <CheckSquare className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Checklist
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-3">
                    <h4 className="font-medium mb-2">Ajouter un élément</h4>
                    <div className="flex gap-2">
                      <Input
                        value={newChecklistItem}
                        onChange={(e) => setNewChecklistItem(e.target.value)}
                        placeholder="Nom de la tâche..."
                        className="h-8 text-sm"
                        onKeyDown={(e) =>
                          e.key === 'Enter' && addChecklistItem()
                        }
                      />
                      <Button
                        size="sm"
                        className="h-8"
                        onClick={addChecklistItem}
                      >
                        Add
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Popover Dates */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="secondary"
                      className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                      Dates
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarUI
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <Separator />

              {/* GROUPE ACTIONS */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Actions
                </span>
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                >
                  <Layout className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Déplacer
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                >
                  <Copy className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Copier
                </Button>
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                >
                  <Eye className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Suivre
                </Button>
                <Separator className="my-2 bg-transparent" />
                <Button
                  variant="secondary"
                  className="w-full justify-start h-8 bg-muted/30 hover:bg-muted shadow-sm text-sm font-normal"
                >
                  <Archive className="w-3.5 h-3.5 mr-2 text-muted-foreground" />{' '}
                  Archiver
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start h-8 bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 shadow-none text-sm font-normal"
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
