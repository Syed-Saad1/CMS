import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function EnrollCardSkeleton() {
  return (
    <div>
      <Card className="h-70 flex border border-border lg:top-6 flex-col items-center justify-center gap-4 px-6">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-9 w-28 my-1" />
        <div className="border border-border w-full" />

        <div className="grid grid-cols-2 gap-2 items-center w-full">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <Skeleton className="h-4 w-48 mt-1" />
        <div className="border border-border w-full" />

        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex flex-col items-center gap-1.5">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex flex-col  items-center gap-1.5 pl-4">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EnrollCardSkeleton;
