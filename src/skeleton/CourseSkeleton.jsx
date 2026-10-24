import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function CourseSkeleton() {
  return (
    <div>
      {" "}
      <div className="h-fit! rounded-md  p-1 border-border w-full flex flex-col gap-2">
        <Skeleton className="h-32 bg-muted/60" />
        <div className="relative h-32 overflow-hidden">
          <Skeleton className="absolute bg-muted/60 top-0 left-0 h-5 w-16 " />
        </div>

        <div className="flex flex-col pl-2 pr-2 gap-2">
          <Skeleton className="h-5 w-3/4 bg-muted/60 rounded mt-1" />

          <div className="space-y-1 mt-1">
            <div className="h-3 w-full bg-muted/60 rounded" />
            <div className="h-3 w-5/6 bg-muted/60 rounded" />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="flex relative w-10 h-4">
              <div className="rounded-full size-4 bg-muted/70" />
              <div className="rounded-full size-4 bg-muted/70 absolute left-2.5" />
              <div className="rounded-full size-4 bg-muted/70 absolute left-4.5" />
            </div>
            <div className="h-3 w-12 bg-muted/50 rounded" />
          </div>

          <div className="flex gap-1 mt-2 items-center">
            <div className="h-4 w-10 bg-muted/50 rounded" />
            <div className="h-4 w-12 bg-muted/80 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseSkeleton;
