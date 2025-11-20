"use client";

import { create } from "zustand";
import { User } from "@/lib/auth";
import { apolloClient } from "./apollo-client";
//====================== Lists =====================//
import {
  CREATE_LIST_MUTATION,
  DELETE_LIST_MUTATION,
} from "./graphql/lists/mutations";
import { LISTS_QUERY } from "./graphql/lists/query";
//====================== Workspaces =====================//
import {
  CREATE_WORKSPACE_MUTATION,
  DELETE_WORKSPACE_MUTATION,
  PIN_WORKSPACE_MUTATION,
  UNPIN_WORKSPACE_MUTATION,
} from "./graphql/workspaces/mutations";
import { WORKSPACES_QUERY, WORKSPACE_QUERY } from "./graphql/workspaces/query";
//====================== Boards =====================//
import {
  CREATE_BOARD_MUTATION,
  DELETE_BOARD_MUTATION,
} from "./graphql/boards/mutations";
import { BOARDS_QUERY } from "./graphql/boards/query";
//====================== Labels =====================//
import { LABELS_QUERY } from "./graphql/labels/query";
import { th } from "date-fns/locale";

export interface Workspace {
  workspaceId: string;
  name: string;
  description?: string;
  ownerId: string;
  owner: {
    user_id: string;
    username: string;
    email: string;
    picture?: string;
  };
  color: string;
  boards: string[];
  members: User[];
  isPinned: boolean;
}

export interface CreateWorkspacePayload {
  name: string;
  description?: string;
  color: string;
}

export interface Board {
  boardId: string;
  title: string;
  description?: string;
  color: string;
  workspaceId: string;
  lists: string[];
  labels: Label[];
}

export interface CreateBoardPayload {
  title: string;
  description?: string;
  color: string;
  workspaceId: string;
}

export interface List {
  listId: string;
  title: string;
  position: number;
  color: string;
  board: Board;
  cards: Card[];
}

export interface Card {
  cardId: string;
  title: string;
  description?: string;
  position: number;
  listId: string;
  labels: Label[];
  dueDate?: string;
  comments: Comments[];
  members: User[];
  attachments: Attachment[];
}

export interface Comments {
  commentId: string;
  content: string;
  createdAt: string;
  cardId: string;
  userId: string;
}

export interface Label {
  labelId: string;
  name: string;
  color: string;
  boardId: string;
}

export interface Attachment {
  attachmentId: string;
  cardId: string;
  url: string;
  filename: string;
}

interface AppState {
  workspaces: Workspace[];
  boards: Board[];
  lists: List[];
  cards: Card[];
  comments: Comments[];
  labels: Label[];
  attachments: Attachment[];
  currentWorkspace: Workspace | null;
  currentBoard: Board | null;
  isLoading: boolean;
  loadingLists: boolean;
  loadingCache: Set<string>;

  getWorkspaces: () => Promise<void>;
  getWorkspace: (workspaceId: string) => Promise<void>;
  createWorkspace: (workspace: CreateWorkspacePayload) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
  pinWorkspace: (workspaceId: string) => void;
  unpinWorkspace: (workspaceId: string) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;

  getBoards: (workspaceId: string) => Promise<void>;
  getBoard: (boardId: string) => Promise<void>;
  createBoard: (board: CreateBoardPayload) => void;
  updateBoard: (id: string, updates: Partial<Board>) => void;
  deleteBoard: (boardId: string) => void;
  setCurrentBoard: (board: Board | null) => void;

  getLists: (boardId: string) => Promise<void>;
  createList: (list: Omit<List, "listId">) => void;
  updateList: (listId: string, updates: Partial<List>) => void;
  deleteList: (listId: string) => void;

  getLabels: (boardId: string) => Promise<void>;
  createLabel: (label: Omit<Label, "labelId">) => void;
  deleteLabel: (labelId: string) => void;

  createCard: (card: Omit<Card, "cardId">) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  workspaces: [],
  boards: [],
  lists: [],
  cards: [],
  comments: [],
  labels: [],
  attachments: [],
  currentWorkspace: null,
  currentBoard: null,
  isLoading: false,
  loadingLists: false,
  loadingCache: new Set(),

  getWorkspaces: async () => {
    try {
      set({ isLoading: true });
      const { data } = await apolloClient.query<{ workspaces: any[] }>({
        query: WORKSPACES_QUERY,
        fetchPolicy: "network-only",
      });

      if (data?.workspaces) {
        const transformedWorkspaces: Workspace[] = data.workspaces.map(
          (ws: any) => ({
            workspaceId: ws.workspace_id,
            name: ws.name,
            description: ws.description,
            ownerId: ws.owner_id,
            owner: {
              user_id: ws.owner.user_id,
              username: ws.owner.username,
              email: ws.owner.email,
              picture: ws.owner.picture,
            },
            color: ws.color,
            boards: ws.boards || [],
            members:
              ws.members?.map((m: any) => ({
                id: m.user.user_id,
                email: m.user.email,
                username: m.user.username,
                picture: m.user.picture,
              })) || [],
            isPinned: ws.is_pinned,
          })
        );
        set({ workspaces: transformedWorkspaces, isLoading: false });
      } else {
        set({ workspaces: [], isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      set({ workspaces: [], isLoading: false });
    }
  },

  getWorkspace: async (workspaceId: string) => {
    try {
      set({ isLoading: true });

      const { data } = await apolloClient.query<{ workspace: any }>({
        query: WORKSPACE_QUERY,
        variables: { workspace_id: workspaceId },
        fetchPolicy: "network-only",
      });

      if (data?.workspace) {
        const workspace: Workspace = {
          workspaceId: data.workspace.workspace_id,
          name: data.workspace.name,
          description: data.workspace.description || "",
          ownerId: data.workspace.owner_id,
          owner: {
            user_id: data.workspace.owner.user_id,
            username: data.workspace.owner.username,
            email: data.workspace.owner.email,
            picture: data.workspace.owner.picture,
          },
          color: data.workspace.color,
          boards: [],
          members:
            data.workspace.members?.map((m: any) => ({
              id: m.user.user_id,
              email: m.user.email,
              username: m.user.username,
              picture: m.user.picture,
            })) || [],
          isPinned: data.workspace.is_pinned || false,
        };
        set({ currentWorkspace: workspace, isLoading: false });
      } else {
        set({ currentWorkspace: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching workspace:", error);
      set({ currentWorkspace: null, isLoading: false });
    }
  },

  getBoards: async (workspaceId: string) => {
    try {
      set({ isLoading: true });
      const { data } = await apolloClient.query<{ boards: any[] }>({
        query: BOARDS_QUERY,
        variables: { workspaceId },
        fetchPolicy: "network-only",
      });

      if (data?.boards) {
        const transformedBoards: Board[] = data.boards.map((b: any) => ({
          boardId: b.board_id,
          title: b.title,
          description: b.description || "",
          color: b.color,
          workspaceId: b.workspace_id,
          lists: b.lists?.map((l: any) => l.list_id) || [],
          labels: b.labels?.map((l: any) => l.label_id) || [],
        }));
        set({ boards: transformedBoards, isLoading: false });
      } else {
        set({ boards: [], isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching boards:", error);
      set({ boards: [], isLoading: false });
    }
  },

  getBoard: async (boardId: string) => {
    set({ isLoading: true });

    try {
      const board = get().boards.find((b) => b.boardId === boardId);

      if (!board) {
        const workspace = get().currentWorkspace;
        if (workspace) {
          await get().getBoards(workspace.workspaceId);

          const reloadedBoard = get().boards.find((b) => b.boardId === boardId);
          if (reloadedBoard) {
            set({ currentBoard: reloadedBoard, isLoading: false });
            return;
          }
        }
        set({ currentBoard: null, isLoading: false });
        return;
      }
      set({ currentBoard: board, isLoading: false });
    } catch (error) {
      set({ currentBoard: null, isLoading: false });
    }
  },

  getLists: async (boardId: string) => {
    const cacheKey = `lists-${boardId}`;
    if (get().loadingCache.has(cacheKey)) return;

    try {
      const newCache = new Set(get().loadingCache);
      newCache.add(cacheKey);
      set({ loadingLists: true, loadingCache: newCache });

      const { data } = await apolloClient.query<{ lists: any[] }>({
        query: LISTS_QUERY,
        variables: { board_id: boardId },
        fetchPolicy: "network-only",
      });

      if (data?.lists) {
        const transformedLists: List[] = data.lists.map((l: any) => ({
          listId: l.list_id,
          title: l.title,
          position: l.position ?? 0,
          color: l.color ?? "#CCCCCC",
          board: {
            boardId: boardId,
            title: "",
            description: "",
            color: "",
            workspaceId: "",
            lists: [],
            labels: [],
          },
          cards:
            l.cards?.map((c: any) => ({
              cardId: c.card_id,
              title: c.title,
              description: c.description || "",
              position: c.position ?? 0,
              labels: c.labels?.map((l: any) => l.label_id) || [],
            })) || [],
        }));

        const finalCache = new Set(get().loadingCache);
        finalCache.delete(cacheKey);
        set({
          lists: transformedLists,
          loadingLists: false,
          loadingCache: finalCache,
        });
      } else {
        const finalCache = new Set(get().loadingCache);
        finalCache.delete(cacheKey);
        set({
          lists: [],
          loadingLists: false,
          loadingCache: finalCache,
        });
      }
    } catch (error) {
      const finalCache = new Set(get().loadingCache);
      finalCache.delete(cacheKey);
      set({
        lists: [],
        loadingLists: false,
        loadingCache: finalCache,
      });
    }
  },

  createWorkspace: async (workspace: CreateWorkspacePayload) => {
    try {
      const { data } = await apolloClient.mutate<{
        createWorkspace: { workspace: Workspace };
      }>({
        mutation: CREATE_WORKSPACE_MUTATION,
        variables: {
          input: {
            name: workspace.name,
            description: workspace.description,
            color: workspace.color,
          },
        },
      });
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  },

  updateWorkspace: (id, updates) =>
    set((state) => ({
      workspaces: state.workspaces.map((ws) =>
        ws.workspaceId === id ? { ...ws, ...updates } : ws
      ),
    })),

  deleteWorkspace: async (workspaceId: string) => {
    try {
      const { data } = await apolloClient.mutate<{
        deleteWorkspace: { success: boolean; message: string };
      }>({
        mutation: DELETE_WORKSPACE_MUTATION,
        variables: { workspace_id: workspaceId },
      });
      if (data?.deleteWorkspace.success) {
        set((state) => ({
          workspaces: state.workspaces.filter(
            (ws) => ws.workspaceId !== workspaceId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
      throw error;
    }
  },

  setCurrentWorkspace: (workspace: Workspace | null) =>
    set({ currentWorkspace: workspace }),

  createBoard: async (board: CreateBoardPayload) => {
    try {
      const { data } = await apolloClient.mutate<{
        createBoard: { board: Board };
      }>({
        mutation: CREATE_BOARD_MUTATION,
        variables: {
          input: {
            title: board.title,
            description: board.description,
            color: board.color,
            workspace_id: board.workspaceId,
          },
        },
      });
    } catch (error) {
      console.error("Error creating board:", error);
    }
  },

  updateBoard: (id, updates) =>
    set((state) => ({
      boards: state.boards.map((b) =>
        b.boardId === id ? { ...b, ...updates } : b
      ),
    })),

  deleteBoard: async (boardId) => {
    try {
      const { data } = await apolloClient.mutate<{
        deleteBoard: { success: boolean; message: string };
      }>({
        mutation: DELETE_BOARD_MUTATION,
        variables: { board_id: boardId },
      });
      if (data?.deleteBoard.success) {
        set((state) => ({
          boards: state.boards.filter((b) => b.boardId !== boardId),
        }));
      }
    } catch (error) {
      console.error("Error deleting board:", error);
      throw error;
    }
  },

  pinWorkspace: async (workspaceId: string) => {
    try {
      const { data } = await apolloClient.mutate<{
        pinWorkspace: {
          workspace: { workspace_id: string; is_pinned: boolean };
        };
      }>({
        mutation: PIN_WORKSPACE_MUTATION,
        variables: { workspace_id: workspaceId },
      });

      if (data?.pinWorkspace.workspace) {
        set((state) => ({
          workspaces: state.workspaces.map((ws) =>
            ws.workspaceId === workspaceId
              ? { ...ws, isPinned: data.pinWorkspace.workspace.is_pinned }
              : ws
          ),
        }));
      }
    } catch (error) {
      console.error("Error pinning workspace:", error);
      throw error;
    }
  },

  unpinWorkspace: async (workspaceId: string) => {
    try {
      const { data } = await apolloClient.mutate<{
        unpinWorkspace: {
          workspace: { workspace_id: string; is_pinned: boolean };
        };
      }>({
        mutation: UNPIN_WORKSPACE_MUTATION,
        variables: { workspace_id: workspaceId },
      });

      if (data?.unpinWorkspace.workspace) {
        set((state) => ({
          workspaces: state.workspaces.map((ws) =>
            ws.workspaceId === workspaceId
              ? { ...ws, isPinned: data.unpinWorkspace.workspace.is_pinned }
              : ws
          ),
        }));
      }
    } catch (error) {
      console.error("Error unpinning workspace:", error);
      throw error;
    }
  },

  setCurrentBoard: (board: Board | null) => set({ currentBoard: board }),

  createList: async (list) => {
    try {
      set({ isLoading: true });
      const input = {
        title: list.title,
        board_id: list.board.boardId,
        position: list.position,
        color: list.color,
      };
      const { data } = await apolloClient.mutate<{
        createList: {
          list_id: string;
          title: string;
          position: number;
          color: string;
        };
      }>({
        mutation: CREATE_LIST_MUTATION,
        variables: { input },
      });
      if (data?.createList) {
        const created = data.createList;
        const newList: List = {
          listId: created.list_id,
          title: created.title,
          position: created.position,
          color: created.color,
          board: list.board,
          cards: [],
        };
        set((state) => ({
          lists: [...state.lists, newList],
          isLoading: false,
        }));
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error(error);
      set({ isLoading: false });
    }
  },

  updateList: (id, updates) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.listId === id ? { ...l, ...updates } : l
      ),
    })),

  deleteList: async (listId) => {
    try {
      const { data } = await apolloClient.mutate<{
        deleteList: { success: boolean; message: string };
      }>({
        mutation: DELETE_LIST_MUTATION,
        variables: { list_id: listId },
      });
      if (data?.deleteList.success) {
        set((state) => ({
          lists: state.lists.filter((l) => l.listId !== listId),
        }));
      }
    } catch (error) {
      console.error("Error deleting list:", error);
      throw error;
    }
  },

  getLabels: async (boardId: string) => {
    try {
      set({ isLoading: true });
      // Assume we have a LABELS_QUERY to fetch labels
      const { data } = await apolloClient.query<{ labels: any[] }>({
        query: LABELS_QUERY,
        variables: { board_id: boardId },
        fetchPolicy: "network-only",
      });

      if (data?.labels) {
        const transformedLabels: Label[] = data.labels.map((l: any) => ({
          labelId: l.label_id,
          name: l.name,
          color: l.color,
          boardId: l.board_id,
        }));
        set({ labels: transformedLabels, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching labels:", error);
      set({ labels: [], isLoading: false });
    }
  },

  createLabel: (label) =>
    set((state) => ({
      labels: [...state.labels, { ...label } as Label],
    })),

  deleteLabel: (labelId) =>
    set((state) => ({
      labels: state.labels.filter((l) => l.labelId !== labelId),
    })),

  createCard: (card) =>
    set((state) => ({
      cards: [...state.cards, { ...card } as Card],
    })),

  updateCard: (id, updates) =>
    set((state) => ({
      cards: state.cards.map((c) =>
        c.cardId === id ? { ...c, ...updates } : c
      ),
    })),

  deleteCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((c) => c.cardId !== id),
    })),
}));
