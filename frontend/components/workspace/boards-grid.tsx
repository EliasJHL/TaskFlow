// components/workspace/boards-grid-detailed.tsx
"use client"

import { Board } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Plus, MoreVertical, Star, Users, Clock } from "lucide-react"

interface BoardsGridProps {
  boards: Board[]
}

export function BoardsGrid({ boards }: BoardsGridProps) {
  const router = useRouter()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Boards</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Board
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {boards.map((board) => (
          <div
            key={board.boardId}
            className="group bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/10 dark:border-white/5 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Header avec couleur du board */}
            <div
              className="h-24 p-4 cursor-pointer relative overflow-hidden"
              style={{ 
                backgroundColor: board.color || '#667eea',
                backgroundImage: `linear-gradient(135deg, ${board.color || '#667eea'} 0%, ${adjustColor(board.color || '#667eea', -30)} 100%)`
              }}
              onClick={() => router.push(`/workspace/${board.workspaceId}/board/${board.boardId}`)}
            >
              <div className="relative z-10">
                <h3 className="text-white font-bold text-lg line-clamp-2">
                  {board.title}
                </h3>
              </div>
              
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23fff" fill-opacity="1"%3E%3Cpath d="M0 0h20v20H0z" fill="none"/%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Body */}
            <div className="p-4">
              {board.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {board.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{board.lists?.length || 0} lists</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{board.labels?.length || 0} labels</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <button className="p-1.5 hover:bg-muted rounded transition-colors">
                  <Star className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => router.push(`/workspace/${board.workspaceId}/board/${board.boardId}`)}
                  className="text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors"
                >
                  Open Board
                </button>
                <button className="p-1.5 hover:bg-muted rounded transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Create board card */}
        <button className="min-h-[240px] rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 group">
          <div className="w-14 h-14 bg-muted group-hover:bg-primary/10 rounded-full flex items-center justify-center transition-colors">
            <Plus className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground mb-1">Create new board</p>
            <p className="text-xs text-muted-foreground">Start organizing your tasks</p>
          </div>
        </button>
      </div>
    </div>
  )
}

function adjustColor(color: string, amount: number): string {
  const clamp = (num: number) => Math.min(Math.max(num, 0), 255)
  const num = parseInt(color.replace("#", ""), 16)
  const r = clamp((num >> 16) + amount)
  const g = clamp(((num >> 8) & 0x00FF) + amount)
  const b = clamp((num & 0x0000FF) + amount)
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')
}
