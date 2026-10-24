import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function CourseDataAssignedSkeleton() {
  return (
    <div>
      {" "}
      <Card className="border border-border h-fit pb-4 flex flex-col">
        <Skeleton className="h-7 w-48" />

        <hr className="mt-4 text-muted-foreground h-2 w-full" />

        <div className="flex gap-2 justify-start items-start mt-2">
          <Skeleton className="size-22 rounded-xl" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-24 rounded-2xl" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-4 w-18" />
            </div>

            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-4 w-18" />
            </div>

            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-4 w-18" />
            </div>

            <Skeleton className="h-4 w-36" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="size-5 rounded" />
              <Skeleton className="h-4 w-18" />
            </div>

            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <hr className="my-2 text-muted-foreground h-2 w-full" />

        <Skeleton className="h-6 w-40 mb-2" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[75%]" />
        </div>
      </Card>
    </div>
  );
}

export default CourseDataAssignedSkeleton;
