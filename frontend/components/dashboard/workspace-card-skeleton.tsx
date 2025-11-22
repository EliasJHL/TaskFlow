"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Calendar } from "lucide-react";

export function WorkspaceCardSkeleton() {
  return (
    <Card className="group border-l-4 border-l-muted animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="space-y-1.5">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>
          </div>

          <div className="h-8 w-8 bg-muted rounded" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div className="h-4 bg-muted rounded w-16" />
          </div>
          <div className="h-5 bg-muted rounded w-12" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="flex -space-x-2">
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background" />
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background" />
              <div className="h-6 w-6 rounded-full bg-muted border-2 border-background" />
            </div>
          </div>

          <div className="h-3 w-3 rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
