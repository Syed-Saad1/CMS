import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Plus } from "lucide-react";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { getAllCourses } from "@/query/getAllCourses";
import { Link } from "react-router-dom";
import { CourseCard } from "@/container/courses/CourseCard";
import { Button } from "@/components/ui/button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";

function CourseScreen() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = getAllCourses();
  const getCourses = data?.data;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = Cookies.get("role");
  const FilterdCourse = getCourses?.filter((course) => {
    const SearchCourse = search?.toLowerCase();
    return course?.title?.toLowerCase()?.includes(SearchCourse);
  });
  return (
    <>
      <div className="h-full w-full mt-6 mx-6">
        <div className="flex justify-between items-end  ">
          <div>
            {" "}
            <h1 className="text-dashboard-foreground text-2xl font-extrabold">
              Course Managment{" "}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage curriculum, assign educators, and monitor course
              status.{" "}
            </p>
          </div>
          {userRole === "admin" && (
            <Link to={"/admin/courses-create"}>
              <Button variant="button" className="text-sm py-4">
                <Plus className="size-5 overflow-hidden" />
                Create Course
              </Button>
            </Link>
          )}
        </div>
        <Card className="block!   w-full rounded-xl p-4 mt-6">
          {" "}
          <div className="w-full flex justify-between items-center">
            {" "}
            <div className="relative w-88">
              <Icon
                className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
                icon="bx:search"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find a Course by Coursename,"
                className={"pt-0 pl-8"}
              />
            </div>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-4 gap-y-6 gap-x-4 mt-4">
            {isLoading
              ? Array.from({ length: 4 }).map((i) => (
                  <div className="h-70 rounded-md  p-1 border-border w-full flex flex-col gap-2">
                    <Skeleton className="h-32" />
                    <div className="relative h-32 bg-muted/60 overflow-hidden">
                      <Skeleton className="absolute top-0 left-0 h-5 w-16 bg-muted-foreground/60" />
                    </div>

                    <div className="flex flex-col pl-2 pr-2 gap-2">
                      <Skeleton className="h-5 w-3/4 bg-muted/60 rounded mt-1" />

                      <div className="space-y-1 mt-1">
                        <div className="h-3 w-full bg-muted/60 rounded" />
                        <div className="h-3 w-5/6 bg-muted/60 rounded" />
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex relative w-10 h-4">
                          <div className="rounded-full size-4 bg-muted/70" />
                          <div className="rounded-full size-4 bg-muted/70 absolute left-2.5" />
                          <div className="rounded-full size-4 bg-muted/70 absolute left-4.5" />
                        </div>
                        <div className="h-3 w-12 bg-muted/50 rounded" />
                      </div>

                      <div className="flex gap-1 mt-2 items-center">
                        <div className="h-4 w-10 bg-muted/50 rounded" />
                        <div className="h-4 w-12 bg-muted/80 rounded" />
                      </div>
                    </div>
                  </div>
                ))
              : FilterdCourse?.map((item) => (
                  <CourseCard key={item._id} item={item} />
                ))}
          </div>
        </Card>
      </div>
    </>
  );
}

export default CourseScreen;
