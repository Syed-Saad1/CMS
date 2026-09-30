import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useGetUser } from "@/query/useGetUser";
import { getAllCourses } from "@/query/getAllCourses";
import { getUserById } from "@/query/getUserById";

import RecentlyAddedUsers from "@/components/RecentlyAddedUsers";
import RecentlyAddedCourse from "@/components/RecentlyAddedCourse";

import { CopyCheck, FileText, IdCard } from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();

  const { data: User, isLoading: UserLoading } = useGetUser();
  const { data: Course, isLoading: CourseLoading } = getAllCourses();

  const UserId = Cookies.get("userId");
  const token = Cookies.get("token");

  const { data: UserById } = getUserById(UserId);

  const userData = User?.data || [];
  const getCourses = Course?.data || [];
  const ProfileData = UserById?.UserById;

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  const totalTeacher = userData.filter(
    (user) => user?.role === "teacher",
  ).length;

  const AdminDashboardCard = [
    {
      iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
      iconcolor: "text-[#E29200]",
      id: "user",
      icon: FileText,
      des: "Total Users",
      title: userData.length,
    },
    {
      iconclass: "bg-[#ECFAF1] dark:bg-[#81CDA5]/10",
      iconcolor: "text-[#81CDA5]",
      id: "teacher",
      icon: IdCard,
      des: "Total Teacher",
      title: totalTeacher,
    },
    {
      iconclass: "bg-[#F7F1FF] dark:bg-[#B289ED]/10",
      iconcolor: "text-[#B289ED]",
      id: "courses",
      icon: FileText,
      des: "Total Courses",
      title: getCourses.length,
    },
    {
      iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
      iconcolor: "text-[#E29200]",
      id: "enroll",
      icon: CopyCheck,
      des: "Total Enrollments",
      title: "324",
    },
  ];

  const isDashboardLoading = UserLoading || CourseLoading;

  return (
    <div className="h-full w-full mt-6 mx-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-dashboard-foreground text-2xl font-extrabold">
            Dashboard Overview
          </h1>

          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, Admin. Here's What's Happening today.
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" className="text-[13px] py-4">
            <Icon className="size-5" icon="flowbite:calendar-week-outline" />
            This Week
          </Button>

          <Button variant="button" className="text-[13px] py-4">
            <Icon className="size-5 object-cover" icon="akar-icons:download" />
            Export Report
          </Button>
        </div>
      </div>

      {isDashboardLoading ? (
        <div className="flex justify-between items-center mt-8 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card
              key={index}
              className="border-border/40! relative flex items-center gap-5 px-4 h-24 w-full overflow-hidden"
            >
              <Skeleton
                className="
                  size-28
                  rotate-24
                  -right-7
                  -top-1
                  rounded-2xl
                  absolute
                  opacity-60
                "
              />

              <Skeleton
                className="
                  absolute
                  right-4
                  size-10
                  rounded-xl
                "
              />

              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="h-6 w-16 rounded-md" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-between items-center mt-8 gap-4">
          {AdminDashboardCard.map((item) => {
            const IconCom = item.icon;

            return (
              <Card
                key={item.id}
                className="
                  border-border/40!
                  relative
                  flex
                  items-center
                  gap-5
                  px-4
                  h-24
                  w-full
                  overflow-hidden
                "
              >
                <div
                  className={cn(
                    "size-28 rotate-24 -right-7 -top-1 rounded-2xl absolute",
                    item.iconclass,
                  )}
                />

                <IconCom
                  strokeWidth={1.3}
                  className={cn("absolute right-4 size-10", item.iconcolor)}
                />

                <div>
                  <CardDescription className="text-muted-foreground text-xs font-medium">
                    {item.des}
                  </CardDescription>

                  <CardTitle className="text-dashboard-foreground-heading text-xl font-bold mt-2">
                    {item.title}
                  </CardTitle>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mt-4">
        <RecentlyAddedUsers
          UserLoading={UserLoading}
          userData={userData}
          ProfileData={ProfileData}
        />

        <RecentlyAddedCourse
          CourseLoading={CourseLoading}
          getCourses={getCourses}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
