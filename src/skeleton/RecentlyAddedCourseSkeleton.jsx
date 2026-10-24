import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function RecentlyAddedCourseSkeleton() {
  return (
    <div>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">{t("common.course")}</TableHead>
            <TableHead className="w-34">{t("course.instructor")}</TableHead>
            <TableHead className="w-20">{t("common.status")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex min-w-0 items-center gap-2">
                  <Skeleton className="size-12 shrink-0 rounded-lg" />

                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-28 rounded-sm" />
                    <Skeleton className="h-3.5 w-20 rounded-sm" />
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-8 shrink-0 rounded-full" />
                  <Skeleton className="h-3.5 w-24 rounded-sm" />
                </div>
              </TableCell>

              <TableCell>
                <Skeleton className="h-6 w-14 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default RecentlyAddedCourseSkeleton;
