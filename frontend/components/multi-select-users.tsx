"use client"

import * as React from "react"
import { Check, ChevronsUpDown, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { User } from "@/components/user"

interface Item {
  id: string
  username: string
  picture: string
}

interface CustomAction {
  label: string
  onSelect: () => void
  icon?: React.ElementType
}

interface MultiSelectUsersProps {
  items: Item[]
  selected: string[]
  onSelectedChange: (selected: string[]) => void
  placeholder?: string
  emptyMessage?: string
  maxDisplayItems?: number
  customActions?: CustomAction[]
}

export function MultiSelectUsers({
  items,
  selected,
  onSelectedChange,
  placeholder = "Select users...",
  emptyMessage = "No user found.",
  maxDisplayItems = 3,
  customActions,
}: MultiSelectUsersProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (itemValue: string) => {
    const newSelected = selected.includes(itemValue)
      ? selected.filter((s) => s !== itemValue)
      : [...selected, itemValue]
    onSelectedChange(newSelected)
    setInputValue("")
  }

  const handleRemove = (itemValue: string) => {
    const newSelected = selected.filter((s) => s !== itemValue)
    onSelectedChange(newSelected)
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent popover from closing
    onSelectedChange([])
    setInputValue("")
  }

  // Get the full item objects for selected values
  const selectedUsers = selected.map((id) => items.find((item) => item.id === id)).filter(Boolean) as Item[]

  const displayItems = selectedUsers.slice(0, maxDisplayItems)
  const overflowCount = selectedUsers.length - maxDisplayItems

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-[40px] flex items-center px-3 py-2 bg-transparent"
        >
          <div className="flex flex-wrap gap-1 flex-grow">
            {selectedUsers.length > 0 ? (
              <>
                {displayItems.map((item) => (
                  <User
                    key={item.id}
                    username={item.username}
                    onRemove={() => handleRemove(item.id)}
                    picture={item.picture}
                  />
                ))}
                {overflowCount > 0 && (
                  <User
                    username={`+${overflowCount} more`}
                    onRemove={() => {
                      /* No remove action for overflow user */
                    }}
                    picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStltpfa69E9JTQOf5ZcyLGR8meBbxMFJxM0w&s"
                    // You can customize the overflow user's appearance here if needed
                  />
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0 opacity-50 hover:opacity-100"
                onClick={handleClearAll}
                aria-label="Clear all selections"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            )}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search items..." value={inputValue} onValueChange={setInputValue} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => {
                return (
                  <CommandItem key={item.id} value={item.username} onSelect={() => handleSelect(item.id)}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selected.includes(item.id) ? "opacity-100" : "opacity-0")}
                    />
                    {item.username} {/* Removed item icon here */}
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {customActions && customActions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  {customActions.map((action, index) => {
                    const ActionIcon = action.icon
                    return (
                      <CommandItem
                        key={`custom-action-${index}`}
                        value={action.label}
                        onSelect={() => {
                          action.onSelect()
                          setOpen(false)
                        }}
                      >
                        {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
                        {action.label}
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
