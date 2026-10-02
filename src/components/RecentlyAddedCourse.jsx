import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  UserRoundCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { StatusBadge } from "./ui/status";
import { Skeleton } from "./ui/skeleton";

function RecentlyAddedCourse({ CourseLoading, getCourses }) {
  return (
    <div>
      {" "}
      <Card className="block! h-106 w-full rounded-xl p-4 mb-5">
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted">
            <GraduationCap className="text-primary size-6" strokeWidth={1.4} />
            Recently Added Courses
          </h1>
          <Link
            to={"/admin/courses"}
            className="flex items-center gap-2 text-primary! text-sm font-normal "
          >
            View All
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </Link>
        </div>
        <hr className="mt-2" />
        <div>
          {" "}
          {CourseLoading ? (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-36">Course</TableHead>
                  <TableHead className="w-34">Instructor</TableHead>
                  <TableHead className="w-20">Status</TableHead>
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
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className={"w-36"}>Course</TableHead>
                  <TableHead className={"w-34"}>Instructor</TableHead>
                  <TableHead className={"w-20"}>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCourses?.slice(0, 6)?.map((item) => {
                  return (
                    <TableRow key={item?.id}>
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-2">
                          <img
                            src={item?.thumbnail || "/DefaultThumbnail.png"}
                            className="size-12 shrink-0 rounded-lg object-contain"
                            alt={item?.title}
                          />

                          <CardTitle className="min-w-0 flex-1 line-clamp-2 whitespace-normal text-xs leading-4">
                            {item?.title}
                          </CardTitle>
                        </div>
                      </TableCell>
                      <TableCell className={""}>
                        <div className="flex items-center gap-0.5 font-semibold">
                          <img
                            src={item?.instructor?.avatar || "/men2.png"}
                            className="size-8 rounded-full"
                            alt={item?.instructor?.name}
                          />
                          {item?.instructor?.name || "Sir Rashid Ali"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={"active"} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>{" "}
      </Card>
    </div>
  );
}

export default RecentlyAddedCourse;
