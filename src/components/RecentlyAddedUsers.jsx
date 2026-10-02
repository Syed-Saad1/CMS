import React from "react";
import { Card, CardTitle } from "./ui/card";
import { ArrowRight, BadgeCheck, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { RoleBadge } from "./RoleBadge";
import { Icon } from "@iconify/react";
import { StatusBadge } from "./ui/status";

function RecentlyAddedUsers({ UserLoading, userData }) {
  return (
    <div>
      {" "}
      <Card className="block! h-88! w-full rounded-xl p-4 mb-5">
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted">
            <User className="text-primary size-6" strokeWidth={1.4} />
            Recently Added Users
          </h1>
          <Link
            to={"/admin/users"}
            className="flex items-center gap-2 text-primary! text-sm font-normal "
          >
            View All
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </Link>
        </div>
        <hr className="mt-2" />
        <ScrollArea orientation="horizontal" className={"w-full max-w-full"}>
          {" "}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            {UserLoading ? (
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
            ) : (
              <TableBody>
                {userData?.slice(0, 6).map((item) => {
                  const IntialFirst = item?.firstName
                    ?.trim()
                    .charAt(0)
                    .toUpperCase();

                  const LastFirst = item?.lastName
                    ?.trim()
                    .charAt(0)
                    .toUpperCase();

                  return (
                    <TableRow key={item?._id}>
                      <TableCell className="pl-2">
                        <div className="flex items-center gap-2">
                          <div className="flex size-8 justify-center items-center">
                            {item?.avatar ? (
                              <img
                                className="size-full rounded-full object-cover"
                                src={item.avatar}
                                alt={`${item?.firstName} ${item?.lastName}`}
                              />
                            ) : (
                              <h1 className="size-full text-xs flex justify-center items-center bg-muted rounded-full">
                                {IntialFirst}
                                {LastFirst}
                              </h1>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <span className="py-0 pl-0 text-sm">
                                    {item?.firstName} {item?.lastName}
                                  </span>
                                }
                              />

                              <TooltipContent className="flex flex-col">
                                <CardTitle>Course Enrollments</CardTitle>

                                {item?.enrolledCourses?.map((course, index) => (
                                  <p className="max-w-30" key={index}>
                                    {course}
                                  </p>
                                ))}
                              </TooltipContent>
                            </Tooltip>

                            <span className="text-xs text-muted-foreground">
                              {item?.email || "---"}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <RoleBadge role={item?.role} />
                      </TableCell>

                      <TableCell>
                        <StatusBadge status="active" />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}

export default RecentlyAddedUsers;
