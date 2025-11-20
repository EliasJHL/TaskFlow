"use client";

import * as React from "react";
import { Check, ChevronsUpDown, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { User } from "@/lib/auth";
import { User as UserType } from "@/components/user";

interface Item {
  id: string;
  username: string;
  picture: string;
}

interface CustomAction {
  label: string;
  onSelect: () => void;
  icon?: React.ElementType;
}

interface MultiSelectUsersProps {
  users: User[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  maxDisplayItems?: number;
  customActions?: CustomAction[];
}

export function MultiSelectUsers({
  users,
  selected,
  onSelectedChange,
  placeholder = "Select users...",
  emptyMessage = "No user found.",
  maxDisplayItems = 3,
  customActions,
}: MultiSelectUsersProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (itemValue: string) => {
    const newSelected = selected.includes(itemValue)
      ? selected.filter((s) => s !== itemValue)
      : [...selected, itemValue];
    onSelectedChange(newSelected);
    setInputValue("");
  };

  const handleRemove = (itemValue: string) => {
    const newSelected = selected.filter((s) => s !== itemValue);
    onSelectedChange(newSelected);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectedChange([]);
    setInputValue("");
  };

  const selectedUsers = selected
    .map((user_id) => users.find((user) => user.user_id === user_id))
    .filter(Boolean) as User[];

  const displayItems = selectedUsers.slice(0, maxDisplayItems);
  const overflowCount = selectedUsers.length - maxDisplayItems;

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
                {displayItems.map((user) => (
                  <UserType
                    key={user.user_id}
                    username={user.username}
                    onRemove={() => handleRemove(user.user_id)}
                    picture={user.picture || ""}
                  />
                ))}
                {overflowCount > 0 && (
                  <UserType
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
          <CommandInput
            placeholder="Search items..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {users.map((user) => {
                return (
                  <CommandItem
                    key={user.user_id}
                    value={user.username}
                    onSelect={() => handleSelect(user.user_id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.includes(user.user_id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {user.username}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {customActions && customActions.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  {customActions.map((action, index) => {
                    const ActionIcon = action.icon;
                    return (
                      <CommandItem
                        key={`custom-action-${index}`}
                        value={action.label}
                        onSelect={() => {
                          action.onSelect();
                          setOpen(false);
                        }}
                      >
                        {ActionIcon && <ActionIcon className="mr-2 h-4 w-4" />}
                        {action.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
