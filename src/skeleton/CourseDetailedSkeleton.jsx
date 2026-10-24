import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function CourseDetailedSkeleton() {
  return (
    <div>
      {" "}
      <Card className="flex w-full flex-col h-full animate-pulse">
        <div className="w-full h-72 shrink-0 relative bg-muted overflow-hidden">
          <div className="absolute bottom-4 left-4 w-32 h-7 rounded-2xl bg-muted-foreground/20" />
        </div>

        <ScrollArea className="max-h-full w-full pl-4 pr-8 mt-2">
          <div className="flex w-full flex-col">
            <Skeleton className="h-9 w-3/4 mt-5" />

            <div className="space-y-2 mt-3 min-h-20">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <hr className="my-4 border-border" />

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4.5 w-4.5 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4.5 w-4.5 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4.5 w-4.5 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <Card className="flex flex-col min-h-140! w-full mt-8 bg-muted/40 pl-6 pt-6 pb-6 pr-6 border-none">
            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
              <Skeleton className="h-6 w-44" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Skeleton className="h-4.5 w-4.5 rounded-full shrink-0 pt-0.5" />
                  <div className="w-full space-y-1.5">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default CourseDetailedSkeleton;
