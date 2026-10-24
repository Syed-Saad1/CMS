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
import { useTranslation } from "react-i18next";
import RecentlyAddedCourseSkeleton from "@/skeleton/RecentlyAddedCourseSkeleton";

function RecentlyAddedCourse({ CourseLoading, getCourses }) {
  const { t } = useTranslation();
  return (
    <div>
      {" "}
      <Card className="block! h-fit w-full rounded-xl p-3 mb-5">
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted">
            <GraduationCap className="text-primary size-6" strokeWidth={1.4} />
            {t("course.recentlyAdded")}
          </h1>
          <Link
            to={"/courses"}
            className="flex items-center gap-2 text-primary! text-sm font-normal "
          >
            {t("common.viewAll")}
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </Link>
        </div>
        <hr className="mt-2" />
        <div>
          {" "}
          {CourseLoading ? (
            <RecentlyAddedCourseSkeleton />
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className={"w-36"}>{t("common.course")}</TableHead>
                  <TableHead className={"w-34"}>
                    {t("course.instructor")}
                  </TableHead>
                  <TableHead className={"w-20"}>{t("common.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCourses?.slice(0, 6)?.map((item) => {
                  return (
                    <TableRow key={item?.id}>
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-2">
                          <CardTitle className="min-w-0 flex-1 line-clamp-2 whitespace-normal text-sm  truncate">
                            {item?.title}
                          </CardTitle>
                        </div>
                      </TableCell>
                      <TableCell className={""}>
                        <div className="flex items-center gap-1 font-semibold">
                          <img
                            src={item?.instructor?.avatar || "/men2.png"}
                            className="size-8 object-cover rounded-full"
                            alt={item?.instructor?.name}
                          />
                          <CardTitle className={"text-sm"}>
                            {item?.instructor?.name || "Sir Rashid Ali"}
                          </CardTitle>
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
