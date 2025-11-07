"use client"

import { create } from "zustand"
import { User } from "@/lib/auth"
import { apolloClient } from "./apollo-client"
import { WORKSPACES_QUERY, WORKSPACE_QUERY } from "./graphql/workspaces/query"
import { BOARDS_QUERY } from "./graphql/boards/query"
import { LISTS_QUERY } from "./graphql/lists/query"
import { CREATE_LIST_MUTATION } from "./graphql/lists/mutations"
import { CREATE_WORKSPACE_MUTATION } from "./graphql/workspaces/mutations"

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

export interface CreateWorkspacePayload {
  name: string
  description?: string
  color: string
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
  board: Board
  cards: Card[]
}

export interface Card {
  cardId: string
  title: string
  description?: string
  position: number
  listId: string
  labels: Label[]
  dueDate?: string
  comments: Comments[]
  members: User[]
  attachments: Attachment[]
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
  loadingLists: boolean
  loadingCache: Set<string>

  getWorkspaces: () => Promise<void>
  getWorkspace: (workspaceId: string) => Promise<void>
  createWorkspace: (workspace: CreateWorkspacePayload) => void
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void
  deleteWorkspace: (id: string) => void
  setCurrentWorkspace: (workspace: Workspace | null) => void

  getBoards: (workspaceId: string) => Promise<void>
  getBoard: (boardId: string) => Promise<void>
  createBoard: (board: Omit<Board, "boardId">) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
  deleteBoard: (id: string) => void
  setCurrentBoard: (board: Board | null) => void

  getLists: (boardId: string) => Promise<void>
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
  loadingLists: false,
  loadingCache: new Set(),

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
      set({ workspaces: [], isLoading: false })
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
    set({ isLoading: true })
    
    try {
      const board = get().boards.find(b => b.boardId === boardId)
      
      if (!board) {        
        const workspace = get().currentWorkspace
        if (workspace) {
          await get().getBoards(workspace.workspaceId)
          
          const reloadedBoard = get().boards.find(b => b.boardId === boardId)
          if (reloadedBoard) {
            set({ currentBoard: reloadedBoard, isLoading: false })
            return
          }
        }
        set({ currentBoard: null, isLoading: false })
        return
      }
      set({ currentBoard: board, isLoading: false })
    } catch (error) {
      set({ currentBoard: null, isLoading: false })
    }
  },

  getLists: async (boardId: string) => {
    const cacheKey = `lists-${boardId}`
    if (get().loadingCache.has(cacheKey)) return

    try {
      const newCache = new Set(get().loadingCache)
      newCache.add(cacheKey)
      set({ loadingLists: true, loadingCache: newCache })
      
      const { data } = await apolloClient.query<{ lists: any[] }>({
        query: LISTS_QUERY,
        variables: { board_id: boardId },
        fetchPolicy: "network-only",
      })

      if (data?.lists) {
        const transformedLists: List[] = data.lists.map((l: any) => ({
          listId: l.list_id,
          title: l.title,
          position: l.position ?? 0,
          color: l.color ?? '#CCCCCC',
          board: {
            boardId: boardId,
            title: '',
            description: '',
            color: '',
            workspaceId: '',
            lists: [],
            labels: [],
          },
          cards: l.cards?.map((c: any) => ({
            cardId: c.card_id,
            title: c.title,
            description: c.description || '',
            position: c.position ?? 0,
            labels: c.labels?.map((l: any) => l.label_id) || [],
          })) || [],
        }))
                
        const finalCache = new Set(get().loadingCache)
        finalCache.delete(cacheKey)
        set({ 
          lists: transformedLists, 
          loadingLists: false,
          loadingCache: finalCache 
        })
      } else {
        const finalCache = new Set(get().loadingCache)
        finalCache.delete(cacheKey)
        set({ 
          lists: [], 
          loadingLists: false,
          loadingCache: finalCache 
        })
      }
    } catch (error) {
      const finalCache = new Set(get().loadingCache)
      finalCache.delete(cacheKey)
      set({ 
        lists: [], 
        loadingLists: false,
        loadingCache: finalCache 
      })
    }
  },

  createWorkspace: async (workspace: CreateWorkspacePayload) => {
    try {
    const { data } = await apolloClient.mutate<{ 
      createWorkspace: { workspace: Workspace } 
    }>({
      mutation: CREATE_WORKSPACE_MUTATION,
      variables: { 
        input: {
          name: workspace.name, 
          description: workspace.description, 
          color: workspace.color 
        } 
      },
    })
  } catch (error) {
    console.error('Error creating workspace:', error)
  }
  },
  
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

  createList: async (list) => {
    try {
      set({ isLoading: true })
      const input = {
        title: list.title,
        board_id: list.board.boardId,
        position: list.position,
        color: list.color,
      };
      const { data } = await apolloClient.mutate<{
        createList: {
          list_id: string,
          title: string,
          position: number,
          color: string,
        }
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
