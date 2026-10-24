import { Card } from "@/components/ui/card";
import React from "react";

function AdminMetrixSkeleton() {
  return (
    <div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className="flex h-30 w-full items-start justify-start gap-3.5 rounded-lg border-border/40 bg-card py-2 pl-4 pt-2"
          >
            <div className="flex w-34 flex-col items-start justify-start gap-5 pt-3">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />

                <div className="flex items-center gap-2">
                  <div className="h-7 w-12 animate-pulse rounded-md bg-muted" />
                  <div className="h-5 w-16 animate-pulse rounded-md bg-muted" />
                </div>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[45%] animate-pulse rounded-full bg-muted-foreground/20" />
              </div>
            </div>

            <div className="flex size-14 shrink-0 animate-pulse items-center justify-center rounded-full bg-muted">
              <div className="size-8 rounded-full bg-muted-foreground/10" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminMetrixSkeleton;
