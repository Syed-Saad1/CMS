import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function UpdateProfileSkeleton() {
  return (
    <div>
      {" "}
      <Card className="border border-border flex flex-col w-full h-fit! gap-y-4 px-6 py-6 pb-4">
        <div>
          <Skeleton className="h-5 w-44 rounded-md" />

          <Skeleton className="h-4 w-80 mt-2 rounded-md" />

          <hr className="mt-4" />
        </div>

        <CardContent className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
            <Field>
              <Skeleton className="h-4 w-20 mb-2 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Field>

            <Field>
              <Skeleton className="h-4 w-20 mb-2 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Field>
          </div>

          <Field className="mt-4">
            <Skeleton className="h-4 w-12 mb-2 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </Field>
        </CardContent>

        <CardFooter className="pb-5 flex justify-end gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}

export default UpdateProfileSkeleton;
