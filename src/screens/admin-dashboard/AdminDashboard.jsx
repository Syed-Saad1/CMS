import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  CopyCheck,
  FileText,
  GraduationCap,
  IdCard,
} from "lucide-react";
import WelcomeDashboardAdmin from "@/components/WelcomeDashboard";
import RecentlyActivites from "@/components/RecentlyActivites";
import UserChart from "@/charts/UserChart";

export function AdminDashboard() {
  const navigate = useNavigate();

  const { data: Course, isLoading: CourseLoading } = getAllCourses();

  const UserId = Cookies.get("userId");
  const token = Cookies.get("token");
  const { data: User, isLoading: UserLoading } = useGetUser();
  const responseData = User?.data;

  const userData = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.users)
      ? responseData.users
      : Array.isArray(responseData?.data)
        ? responseData.data
        : [];

  const { data: UserById } = getUserById(UserId);

  const getCourses = Course?.data || [];
  const ProfileData = UserById?.UserById;

  const today = new Date().toISOString().split("T")[0];

  const filteredData =
    responseData?.filter((item) => {
      if (!item?.createdAt) return false;

      const date = new Date(item.createdAt);

      if (Number.isNaN(date.getTime())) return false;

      return date.toISOString().split("T")[0] === today;
    }) ?? [];
  const filteredCourse =
    getCourses?.filter((item) => {
      if (!item?.createdAt) return false;

      const date = new Date(item.createdAt);

      if (Number.isNaN(date.getTime())) return false;

      return date.toISOString().split("T")[0] === today;
    }) ?? [];

  const visibleUsers = filteredData;
  const VisibaleCourses = filteredCourse;

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
      cardBg: "bg-primary/20",
      iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
      iconcolor: "text-[#E29200]",
      id: "user",
      icon: FileText,
      des: "Total Users",
      today: visibleUsers?.length,
      title: userData.length,
    },
    {
      iconclass: "bg-[#ECFAF1] dark:bg-[#81CDA5]/10",
      iconcolor: "text-[#81CDA5]",
      id: "teacher",
      icon: IdCard,
      des: "Total Teacher",
      today: 0,

      title: totalTeacher,
    },
    {
      iconclass: "bg-[#F7F1FF] dark:bg-[#B289ED]/10",
      iconcolor: "text-[#B289ED]",
      id: "courses",
      icon: GraduationCap,
      des: "Total Courses",
      today: VisibaleCourses?.length,

      title: getCourses.length,
    },
    {
      iconclass: "bg-[#FFFAEE] dark:bg-[#E29200]/10",
      iconcolor: "text-[#E29200]",
      id: "enroll",
      icon: CopyCheck,
      today: 18,
      des: "Total Enrolled",
      title: "324",
    },
  ];

  const isDashboardLoading = UserLoading || CourseLoading;

  return (
    <div className="max-h-full h-full w-full mt-6 mx-6">
      {" "}
      <div>
        {" "}
        <WelcomeDashboardAdmin />
        {isDashboardLoading ? (
          <div className="flex justify-between items-center mt-8 gap-4">
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
        ) : (
          <div className="flex justify-between w-full mb-4 items-center mt-4 gap-4">
            {AdminDashboardCard.map((item) => {
              const IconCom = item.icon;
              return (
                <Card
                  key={item.id}
                  className={cn(
                    "border-border/40! bg-card flex pl-4 py-2 pt-2 h-30 gap-3.5 w-full  rounded-lg  justify-start items-start ",
                    item.cardBg,
                  )}
                >
                  <div className="flex justify-start items-start gap-5 pt-3 flex-col w-34">
                    <div className="flex-col flex gap-2">
                      <CardTitle className={"font-semibold"}>
                        {item.des}
                      </CardTitle>
                      <CardDescription className="text-primary text-2xl font-bold tracking-tight">
                        {item.title}
                        <sub className="text-sm text-muted-foreground font-medium">
                          {" "}
                          +{item?.today} today
                        </sub>
                      </CardDescription>
                    </div>
                    <div className="w-full bg-primary/60 rounded-full h-2">
                      <div
                        className="bg-primary/80 h-2 rounded-full"
                        style={{ width: 45 }}
                      />
                    </div>
                  </div>
                  <div className="size-14 flex justify-center items-center rounded-full bg-accent">
                    <IconCom
                      strokeWidth={1.3}
                      className={cn("size-8  ", item.iconcolor)}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
      <div className="grid grid-cols-[60%_40%]  mt-4 gap-2 w-full">
        {" "}
        <div>
          {" "}
          {UserLoading ? (
            <div className="h-full animate-pulse rounded-xl bg-muted" />
          ) : (
            <UserChart
              UserLoading={UserLoading}
              className=""
              userData={userData}
            />
          )}
        </div>
        <div>
          <RecentlyAddedUsers
            UserLoading={UserLoading}
            userData={userData}
            ProfileData={ProfileData}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
