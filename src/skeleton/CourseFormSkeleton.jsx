import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function CourseFormSkeleton() {
  return (
    <div>
      {" "}
      <div className="w-full min-w-0 grid grid-cols-1 xl:grid-cols-[minmax(0,68fr)_minmax(0,30fr)] items-start justify-center gap-6">
        <Card className="border border-border flex flex-col w-full py-6 px-4 overflow-hidden">
          <div>
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>

          <Skeleton className="h-px w-full mt-4" />

          <div className="mt-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full mt-2 rounded-md" />
          </div>

          <div className="mt-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-24 w-full mt-2 rounded-md" />
          </div>

          <Card className="grid grid-cols-2 mt-4 items-center w-full gap-4 p-4">
            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-full mt-2 rounded-md" />
            </div>

            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full mt-2 rounded-md" />
            </div>

            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-full mt-2 rounded-md" />
            </div>

            <div>
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-full mt-2 rounded-md" />
            </div>
          </Card>

          <div className="space-y-2 mt-6">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>

            <Skeleton className="h-64 w-full rounded-md" />
          </div>

          <div className="flex items-center justify-end gap-4 mt-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </Card>

        <div>
          <Card className="border border-border flex flex-col py-8 px-6 h-fit">
            <Skeleton className="h-6 w-44" />

            <div className="space-y-2 mt-6">
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseFormSkeleton;
