import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";

function RecentAddedUserSkeleton() {
  return (
    <div>
      {" "}
      <TableBody>
        {[...Array(5)].map((_, index) => (
          <TableRow key={index} className="animate-pulse">
            <TableCell>
              <div className="h-4 w-28 bg-muted/80 rounded" />
            </TableCell>

            <TableCell>
              <div className="h-4 w-24 bg-muted/50 rounded" />
            </TableCell>

            <TableCell>
              <div className="h-6 w-16 bg-muted/60 rounded-full" />
            </TableCell>

            <TableCell>
              <div className="h-4 w-8 bg-muted/40 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
}

export default RecentAddedUserSkeleton;
