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
import { useTranslation } from "react-i18next";
import CourseSkeleton from "@/skeleton/CourseSkeleton";

function CourseScreen() {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
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
      <div className="w-full min-w-0 py-4 px-3 sm:px-6 mb-18 md:mb-4">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div>
            {" "}
            <h1 className="text-dashboard-foreground text-2xl font-extrabold">
              {t("course.management")}{" "}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {t("course.managementDescription")}{" "}
            </p>
          </div>
          {userRole === "admin" && (
            <Link to={"/courses-create"}>
              <Button variant="button" className="text-sm py-4">
                <Plus className="size-5 overflow-hidden" />
                {t("course.create")}
              </Button>
            </Link>
          )}
        </div>
        <Card className="block! bg-transparent w-full rounded-xl  mt-6">
          {" "}
          <div className="w-full flex justify-between items-center">
            {" "}
            <div className="relative w-full max-w-88">
              <Icon
                className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
                icon="bx:search"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("course.find")}
                className={"pt-0 pl-8"}
              />
            </div>
          </div>
          <hr className="mt-2" />
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 mt-4 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 4 }).map((i) => <CourseSkeleton />)
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
