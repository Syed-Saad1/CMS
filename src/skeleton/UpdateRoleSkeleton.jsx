import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function UpdateRoleSkeleton() {
  return (
    <div>
      {" "}
      <Card className="flex h-fit min-h-62 w-full flex-col gap-y-4 px-4 py-2 pb-4 sm:px-6">
        <div>
          <Skeleton className="h-5 w-28 rounded-md" />

          <Skeleton className="h-4 w-104 max-w-full mt-2 rounded-md" />
          <Skeleton className="h-4 w-96 max-w-full mt-1 rounded-md" />

          <hr className="mt-2" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-5 w-full max-w-120">
            <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </Card>

            <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </Card>

            <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
              <Skeleton className="size-10 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </Card>
          </div>

          <div className="flex justify-end items-end">
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default UpdateRoleSkeleton;
