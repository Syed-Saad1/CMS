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
import { StatusBadge } from "./ui/status";
import { useTranslation } from "react-i18next";
import RecentAddedUserSkeleton from "@/skeleton/RecentAddedUserSkeleton";

function RecentlyAddedUsers({ UserLoading, userData }) {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <Card className="block! border border-border h-100 w-full rounded-xl p-4 ">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 justify-end text-lg items-end font-semibold text-shadow-muted">
            <User className="text-primary size-6" strokeWidth={1.4} />
            <CardTitle className={"min-w-54 line-clamp-1 max-w-48"}>
              {t("RecentAddedUser.title", { defaultValue: "Title" })}
            </CardTitle>
          </div>
          <Link
            to={"/admin/users"}
            className="flex items-center md:gap-2 gap-1  "
          >
            <div className="min-w-0 pr-2">
              <CardTitle
                className={
                  "text-primary! line-clamp-1 md:text-sm text-xs font-normal truncate"
                }
              >
                {" "}
                {t("RecentAddedUser.ViewAll")}{" "}
              </CardTitle>
            </div>
            <ArrowRight className="md:block hidden size-4" strokeWidth={1.6} />
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
              <RecentAddedUserSkeleton />
            ) : (
              <TableBody>
                {userData.length ? (
                  userData?.slice(0, 6).map((item) => {
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

                                  {item?.enrolledCourses?.map(
                                    (course, index) => (
                                      <p className="max-w-30" key={index}>
                                        {course}
                                      </p>
                                    ),
                                  )}
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
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="h-24 text-center text-muted-foreground font-bold text-sm"
                    >
                      User Data Not Found
                    </TableCell>
                  </TableRow>
                )}
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
