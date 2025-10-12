"use client"

import { create } from "zustand"
import { User } from "@/lib/auth"
import { apolloClient } from "./apollo-client"
import { WORKSPACES_QUERY } from "./graphql/workspaces/query"

export interface Workspace {
  workspaceId: string
  name: string
  description?: string
  owner: string
  color: string
  boards: string[]
  members: User[]
  isPinned: boolean
}

export interface Board {
  boardId: string
  title: string
  description?: string
  color: string
  workspaceId: string
  lists: string[]
  labels: string[]
}

export interface List {
  listId: string
  title: string
  position: number
  color: string
  board: string
  cards: string[]
}

export interface Card {
  cardId: string
  title: string
  description?: string
  position: number
  listId: string
  labelsId: string[]
  dueDate?: string
  comments: string[]
  cardLabels: string[]
  members: string[]
  attachments: string[]
}

export interface Commants {
  commentId: string
  content: string
  createdAt: string
  cardId: string
  userId: string
}

export interface Label {
  labelId: string
  name: string
  color: string
  boardId: string
}

export interface Attachment {
  attachmentId: string
  cardId: string
  url: string
  filename: string
}


interface AppState {
  workspaces: Workspace[]
  boards: Board[]
  lists: List[]
  cards: Card[]
  comments: Commants[]
  labels: Label[]
  attachments: Attachment[]
  currentWorkspaceId: string | null
  currentBoardId: string | null
  isLoading: boolean

  getWorkspaces: () => Promise<void>

  createWorkspace: (workspace: Omit<Workspace, "id" | "createdAt" | "updatedAt">) => void
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void
  deleteWorkspace: (id: string) => void
  setCurrentWorkspace: (id: string) => void

  createBoard: (board: Omit<Board, "id" | "createdAt" | "updatedAt">) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
  deleteBoard: (id: string) => void
  setCurrentBoard: (id: string) => void

  createList: (list: Omit<List, "id">) => void
  updateList: (id: string, updates: Partial<List>) => void
  deleteList: (id: string) => void
  // reorderLists: (boardId: string, listIds: string[]) => void

  createCard: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void
  updateCard: (id: string, updates: Partial<Card>) => void
  deleteCard: (id: string) => void
  // moveCard: (cardId: string, newListId: string, newOrder: number) => void
  // reorderCards: (listId: string, cardIds: string[]) => void
}
export const useStore = create<AppState>((set, get) => ({
  workspaces: [],
  boards: [],
  lists: [],
  cards: [],
  comments: [],
  labels: [],
  attachments: [],
  currentWorkspaceId: null,
  currentBoardId: null,
  isLoading: false,

  getWorkspaces: async () => {
    try {
      set({ isLoading: true })
      const { data } = await apolloClient.query<{ workspaces: any[] }>({
        query: WORKSPACES_QUERY,
        fetchPolicy: "network-only",
      })

      if (data?.workspaces) {
        const transformedWorkspaces: Workspace[] = data.workspaces.map((ws: any) => ({
          workspaceId: ws.workspace_id,
          name: ws.name,
          description: ws.description,
          owner: ws.owner_id,
          color: ws.color,
          boards: ws.boards || [],
          members: ws.members?.map((m: any) => m.user) || [],
          isPinned: ws.is_pinned
        }))
        set({ workspaces: transformedWorkspaces, isLoading: false })
      } else {
        set({ workspaces: [], isLoading: false })
      }
    } catch (error) {
      set({ isLoading: false })
    }
  },

  createWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [...state.workspaces, { ...workspace }],
    })),
  updateWorkspace: (id, updates) =>
    set((state) => ({
      workspaces: state.workspaces.map((ws) =>
        ws.workspaceId === id ? { ...ws, ...updates } : ws
      ),
    })),
  deleteWorkspace: (id) =>
    set((state) => ({
      workspaces: state.workspaces.filter((ws) => ws.workspaceId !== id),
    })),
  setCurrentWorkspace: (id) =>
    set(() => ({
      currentWorkspaceId: id,
    })),

  createBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, { ...board }],
    })),
  updateBoard: (id, updates) =>
    set((state) => ({
      boards: state.boards.map((b) =>
        b.boardId === id ? { ...b, ...updates } : b
      ),
    })),
  deleteBoard: (id) =>
    set((state) => ({
      boards: state.boards.filter((b) => b.boardId !== id),
    })),
  setCurrentBoard: (id) =>
    set(() => ({
      currentBoardId: id,
    })),

  createList: (list) =>
    set((state) => ({
      lists: [...state.lists, { ...list }],
    })),
  updateList: (id, updates) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.listId === id ? { ...l, ...updates } : l
      ),
    })),
  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((l) => l.listId !== id),
    })),

  createCard: (card) =>
    set((state) => ({
      cards: [...state.cards, { ...card }],
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
}))
