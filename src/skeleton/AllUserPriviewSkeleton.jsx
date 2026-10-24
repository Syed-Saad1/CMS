import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function AllUserPriviewSkeleton() {
  return (
    <Card className="border border-border h-fit min-h-126 flex flex-col items-center px-4 py-4">
      <div className="relative w-full">
        <Skeleton className="h-24 w-full rounded-none" />
        <div className="absolute left-1/2 top-10 -translate-x-1/2">
          <Skeleton className="size-34 rounded-full border-4 border-white" />
        </div>
      </div>

      <Skeleton className="h-5 w-40 mt-22 rounded-md" />

      <Skeleton className="h-4 w-52 mt-2 rounded-md" />

      <div className="border-b w-full mt-4 border-accent" />

      <div className="flex flex-col mt-4 w-full gap-2">
        <Card className="flex w-full min-w-0 px-2 py-2 gap-4">
          <Skeleton className="size-8 rounded-sm" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-14 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
        </Card>

        <Card className="flex px-2 py-2 gap-4">
          <Skeleton className="size-8 rounded-sm" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>
        </Card>

        <Card className="flex px-2 py-2 gap-4">
          <Skeleton className="size-8 rounded-sm" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-12 rounded-md" />
            <Skeleton className="h-4 w-40 rounded-md" />
          </div>
        </Card>

        <Card className="flex px-2 py-2 gap-4">
          <Skeleton className="size-8 rounded-sm" />

          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-14 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
        </Card>
      </div>
    </Card>
  );
}

export default AllUserPriviewSkeleton;
