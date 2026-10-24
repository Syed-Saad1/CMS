import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function StudentMatrixSkeleton() {
  return (
    <div>
      <Card
        key={index}
        className="w-full border border-border h-28 flex items-center justify-between gap-4 p-4"
      >
        <Skeleton className="size-14 shrink-0 rounded-md" />

        <div className="flex flex-col flex-1 gap-1.5">
          <Skeleton className="h-5 w-28 rounded-sm" />

          <Skeleton className="h-6 w-16 rounded-sm" />

          <Skeleton className="h-4 w-24 rounded-sm" />
        </div>
      </Card>
    </div>
  );
}

export default StudentMatrixSkeleton;
