"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "review" | "done"
  assignedTo?: string[]
  dueDate?: string
  priority: "low" | "medium" | "high"
  labels: string[]
  createdAt: string
  updatedAt: string
  boardId: string
  columnId: string
  order: number
}

export interface Column {
  id: string
  title: string
  color: string
  order: number
  boardId: string
}

export interface Board {
  id: string
  title: string
  description?: string
  color: string
  createdAt: string
  updatedAt: string
  members: string[]
  isArchived: boolean
}

interface AppState {
  boards: Board[]
  columns: Column[]
  tasks: Task[]
  currentBoardId: string | null

  // Board actions
  createBoard: (board: Omit<Board, "id" | "createdAt" | "updatedAt">) => void
  updateBoard: (id: string, updates: Partial<Board>) => void
  deleteBoard: (id: string) => void
  setCurrentBoard: (id: string) => void

  // Column actions
  createColumn: (column: Omit<Column, "id">) => void
  updateColumn: (id: string, updates: Partial<Column>) => void
  deleteColumn: (id: string) => void
  reorderColumns: (boardId: string, columnIds: string[]) => void

  // Task actions
  createTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (taskId: string, newColumnId: string, newOrder: number) => void
  reorderTasks: (columnId: string, taskIds: string[]) => void
}

// Mock data
const mockBoards: Board[] = [
  {
    id: "1",
    title: "Projet Web App",
    description: "Développement de la nouvelle application web",
    color: "#3b82f6",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    members: ["1", "2", "3"],
    isArchived: false,
  },
]

const mockColumns: Column[] = [
  { id: "1", title: "À faire", color: "#ef4444", order: 0, boardId: "1" },
  { id: "2", title: "En cours", color: "#f59e0b", order: 1, boardId: "1" },
  { id: "3", title: "En révision", color: "#8b5cf6", order: 2, boardId: "1" },
  { id: "4", title: "Terminé", color: "#10b981", order: 3, boardId: "1" },
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Créer la page d'accueil",
    description: "Développer la page d'accueil avec le nouveau design",
    status: "todo",
    assignedTo: ["1"],
    dueDate: "2024-01-15",
    priority: "high",
    labels: ["frontend", "design"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    boardId: "1",
    columnId: "1",
    order: 0,
  },
  {
    id: "2",
    title: "Configurer la base de données",
    description: "Mettre en place la structure de la base de données",
    status: "in-progress",
    assignedTo: ["2"],
    dueDate: "2024-01-10",
    priority: "high",
    labels: ["backend", "database"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    boardId: "1",
    columnId: "2",
    order: 0,
  },
  {
    id: "3",
    title: "Tests unitaires",
    description: "Écrire les tests pour les composants principaux",
    status: "review",
    assignedTo: ["3"],
    priority: "medium",
    labels: ["testing"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    boardId: "1",
    columnId: "3",
    order: 0,
  },
]

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      boards: mockBoards,
      columns: mockColumns,
      tasks: mockTasks,
      currentBoardId: "1",

      createBoard: (boardData) => {
        const newBoard: Board = {
          ...boardData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ boards: [...state.boards, newBoard] }))
      },

      updateBoard: (id, updates) => {
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, ...updates, updatedAt: new Date().toISOString() } : board,
          ),
        }))
      },

      deleteBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
          columns: state.columns.filter((column) => column.boardId !== id),
          tasks: state.tasks.filter((task) => task.boardId !== id),
          currentBoardId: state.currentBoardId === id ? null : state.currentBoardId,
        }))
      },

      setCurrentBoard: (id) => {
        set({ currentBoardId: id })
      },

      createColumn: (columnData) => {
        const newColumn: Column = {
          ...columnData,
          id: Date.now().toString(),
        }
        set((state) => ({ columns: [...state.columns, newColumn] }))
      },

      updateColumn: (id, updates) => {
        set((state) => ({
          columns: state.columns.map((column) => (column.id === id ? { ...column, ...updates } : column)),
        }))
      },

      deleteColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((column) => column.id !== id),
          tasks: state.tasks.filter((task) => task.columnId !== id),
        }))
      },

      reorderColumns: (boardId, columnIds) => {
        set((state) => ({
          columns: state.columns.map((column) => {
            if (column.boardId === boardId) {
              const newOrder = columnIds.indexOf(column.id)
              return { ...column, order: newOrder }
            }
            return column
          }),
        }))
      },

      createTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ tasks: [...state.tasks, newTask] }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task,
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      moveTask: (taskId, newColumnId, newOrder) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, columnId: newColumnId, order: newOrder, updatedAt: new Date().toISOString() }
              : task,
          ),
        }))
      },

      reorderTasks: (columnId, taskIds) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.columnId === columnId) {
              const newOrder = taskIds.indexOf(task.id)
              return { ...task, order: newOrder }
            }
            return task
          }),
        }))
      },
    }),
    {
      name: "trello-storage",
    },
  ),
)
