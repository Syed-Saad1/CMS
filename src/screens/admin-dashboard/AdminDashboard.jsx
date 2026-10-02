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

import {
  ArrowUp,
  ArrowUpAZ,
  CopyCheck,
  FileText,
  GraduationCap,
  IdCard,
} from "lucide-react";
import WelcomeDashboardAdmin from "@/components/WelcomeDashboard";
import RecentlyActivites from "@/components/RecentlyActivites";

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
      icon: GraduationCap,
      des: "Total Courses",
      title: getCourses.length,
    },
    {
      iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
      iconcolor: "text-[#E29200]",
      id: "enroll",
      icon: CopyCheck,
      des: "Total Enrolled",
      title: "324",
    },
  ];

  const isDashboardLoading = UserLoading || CourseLoading;

  return (
    <div className="h-full w-full mt-6 mx-6">
      <div className="grid grid-cols-[60%_38%] gap-6 mt-4 ">
        {" "}
        <div>
          {" "}
          <WelcomeDashboardAdmin />
          {isDashboardLoading ? (
            <div className="flex justify-between items-center mt-8 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card
                  key={index}
                  className="border-border/40! bg-card flex items-start px-2 pt-2 h-28 gap-1.5 w-full overflow-hidden"
                >
                  <Skeleton className="size-12 shrink-0 rounded-sm" />

                  <div className="flex-1">
                    <Skeleton className="h-3 w-20 rounded-sm" />

                    <Skeleton className="h-5 w-16 rounded-sm mt-2" />

                    <div className="flex items-center gap-1 mt-2">
                      <Skeleton className="size-4 rounded-sm" />
                      <Skeleton className="h-5 w-10 rounded-full" />
                    </div>

                    <Skeleton className="h-3 w-24 rounded-sm mt-1" />
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
                  bg-card
                  flex
                  items-start
                  px-2
                  pt-2
                  h-28
                  gap-1.5
                  w-full
                  overflow-hidden
                "
                  >
                    <div
                      className={cn(
                        "size-12 rounded-sm items-center justify-center flex",
                        item.iconclass,
                      )}
                    >
                      <IconCom
                        strokeWidth={1.3}
                        className={cn(" size-8", item.iconcolor)}
                      />
                    </div>

                    <div>
                      <CardDescription className="text-muted-foreground text-xs font-medium">
                        {item.des}
                      </CardDescription>

                      <CardTitle className="text-dashboard-foreground-heading text-lg font-bold mt-">
                        {item.title}
                      </CardTitle>
                      <h1 className="text-accent-foreground w-fit flex pl-2 mt-2">
                        <ArrowUp className="size-4" />
                        <span className="p-0.5 text-xs rounded-full text-success-foreground bg-success">
                          12%
                        </span>
                      </h1>
                      <CardDescription className={"text-xs mt-1"}>
                        vs last month
                      </CardDescription>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
          <RecentlyActivites UserLoading={UserLoading} />
        </div>
        <div>
          {" "}
          <div className="grid gap-6">
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
      </div>
    </div>
  );
}

export default AdminDashboard;
