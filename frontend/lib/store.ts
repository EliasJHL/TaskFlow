"use client"

import { create } from "zustand"
import { User } from "@/lib/auth"
import { apolloClient } from "./apollo-client"
import { WORKSPACES_QUERY, WORKSPACE_QUERY } from "./graphql/workspaces/query"
import { BOARDS_QUERY } from "./graphql/boards/query"

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

export interface Comments {
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
  comments: Comments[]
  labels: Label[]
  attachments: Attachment[]
  currentWorkspace: Workspace | null
  currentBoard: Board | null
  isLoading: boolean

  getWorkspaces: () => Promise<void>
  getWorkspace: (workspaceId: string) => Promise<void>
  createWorkspace: (workspace: Omit<Workspace, "workspaceId">) => void
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void
  deleteWorkspace: (id: string) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void

  getBoards: (workspaceId: string) => Promise<void>
  getBoard: (boardId: string) => Promise<void>
  createBoard: (board: Omit<Board, "boardId">) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
  deleteBoard: (id: string) => void
  setCurrentBoard: (board: Board | null) => void

  createList: (list: Omit<List, "listId">) => void
  updateList: (id: string, updates: Partial<List>) => void
  deleteList: (id: string) => void

  createCard: (card: Omit<Card, "cardId">) => void
  updateCard: (id: string, updates: Partial<Card>) => void
  deleteCard: (id: string) => void
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
          members: ws.members?.map((m: any) => ({
            id: m.user.user_id,
            email: m.user.email,
            username: m.user.username,
            picture: m.user.picture
          })) || [],
          isPinned: ws.is_pinned
        }))
        set({ workspaces: transformedWorkspaces, isLoading: false })
      } else {
        set({ workspaces: [], isLoading: false })
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error)
      set({ isLoading: false })
    }
  },

  getWorkspace: async (workspaceId: string) => {
    try {
      set({ isLoading: true })
      
      const { data } = await apolloClient.query<{ workspace: any }>({
        query: WORKSPACE_QUERY,
        variables: { workspace_id: workspaceId },
        fetchPolicy: "network-only",
      })

      if (data?.workspace) {
        const workspace: Workspace = {
          workspaceId: data.workspace.workspace_id,
          name: data.workspace.name,
          description: data.workspace.description || '',
          owner: data.workspace.owner_id,
          color: data.workspace.color,
          boards: [],
          members: data.workspace.members?.map((m: any) => ({
            id: m.user.user_id,
            email: m.user.email,
            username: m.user.username,
            picture: m.user.picture
          })) || [],
          isPinned: data.workspace.is_pinned || false
        }
        set({ currentWorkspace: workspace, isLoading: false })
      } else {
        set({ currentWorkspace: null, isLoading: false })
      }
    } catch (error) {
      console.error('Error fetching workspace:', error)
      set({ currentWorkspace: null, isLoading: false })
    }
  },

  getBoards: async (workspaceId: string) => {
    try {
      set({ isLoading: true })
      const { data } = await apolloClient.query<{ boards: any[] }>({
        query: BOARDS_QUERY,
        variables: { workspaceId },
        fetchPolicy: "network-only",
      })

      if (data?.boards) {
        const transformedBoards: Board[] = data.boards.map((b: any) => ({
          boardId: b.board_id,
          title: b.title,
          description: b.description || '',
          color: b.color,
          workspaceId: b.workspace_id,
          lists: b.lists?.map((l: any) => l.list_id) || [],
          labels: b.labels?.map((l: any) => l.label_id) || [],
        }))
        set({ boards: transformedBoards, isLoading: false })
      } else {
        set({ boards: [], isLoading: false })
      }
    } catch (error) {
      console.error('Error fetching boards:', error)
      set({ boards: [], isLoading: false })
    }
  },

  getBoard: async (boardId: string) => {
  console.log('🔍 Getting board from cache:', boardId)
  set({ isLoading: true })
  
  try {
    // Cherche le board dans les boards déjà chargés
    const board = get().boards.find(b => b.boardId === boardId)
    
    if (!board) {
      console.log('⚠️ Board not found in cache')
      
      // Essaie de recharger les boards du workspace
      const workspace = get().currentWorkspace
      if (workspace) {
        console.log('📡 Reloading boards...')
        await get().getBoards(workspace.workspaceId)
        
        const reloadedBoard = get().boards.find(b => b.boardId === boardId)
        if (reloadedBoard) {
          set({ currentBoard: reloadedBoard, isLoading: false })
          console.log('✅ Board loaded:', reloadedBoard.title)
          return
        }
      }
      
      // Toujours pas trouvé
      console.log('❌ Board not found after reload')
      set({ currentBoard: null, isLoading: false })
      return
    }
    
    // Board trouvé dans le cache
    console.log('✅ Board found in cache:', board.title)
    set({ currentBoard: board, isLoading: false })
    
  } catch (error) {
    console.error('❌ Error getting board:', error)
    set({ currentBoard: null, isLoading: false })
  }
},

  createWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [...state.workspaces, { ...workspace } as Workspace],
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
  
  setCurrentWorkspace: (workspace: Workspace | null) =>
    set({ currentWorkspace: workspace }),

  createBoard: (board) =>
    set((state) => ({
      boards: [...state.boards, { ...board } as Board],
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
  
  setCurrentBoard: (board: Board | null) =>
    set({ currentBoard: board }),

  createList: (list) =>
    set((state) => ({
      lists: [...state.lists, { ...list } as List],
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
}))
