import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function RecentlyAddedCourse({ CourseLoading, getCourses }) {
  return (
    <div>
      {" "}
      <Card className="block! h-82 w-full rounded-xl p-4">
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="flex gap-1 text-lg font-semibold text-muted-foreground">
            <BadgeCheck className="text-[#0246FB]!" strokeWidth={1.4} />
            Recently Added Courses
          </h1>
          <Link
            to={"/admin/courses"}
            className="flex items-center gap-2 text-[#0246FB]! text-sm font-normal "
          >
            View All
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </Link>
        </div>
        <hr className="mt-2" />
        <div className="grid grid-cols-2 max-h-200 overflow-y-auto gap-y-2 gap-x-4 mt-4 ">
          {CourseLoading
            ? [...Array(5)].map((_, index) => (
                <Card className="h-30 rounded-sm border border-border w-full flex pt-2 gap-8 pl-4 animate-pulse">
                  <div>
                    <div className="size-21 bg-muted/70 rounded-md" />
                  </div>

                  <div className="flex flex-col gap-y-1.5 w-full pr-4">
                    <div className="h-4 w-14 bg-muted/60 rounded-sm" />

                    <div className="h-4 w-3/4 bg-muted/80 rounded mt-0.5" />

                    <div className="h-3 w-20 bg-muted/50 rounded" />

                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex relative w-10 h-4">
                        <div className="rounded-full size-4 bg-muted/60" />
                        <div className="rounded-full size-4 bg-muted/60 absolute left-2.5" />
                        <div className="rounded-full size-4 bg-muted/60 absolute left-4.5" />
                      </div>
                      <div className="h-3 w-12 bg-muted/40 rounded pl-3.5" />
                    </div>
                  </div>
                </Card>
              ))
            : getCourses?.slice(0, 4)?.map((item) => {
                return (
                  <Card
                    key={item?.id}
                    className="h-30 rounded-sm  border border-border w-full flex gap-2 p-4"
                  >
                    <div>
                      {" "}
                      <img
                        className="h-21! w-28! object-cover  rounded-md"
                        src={item?.thumbnail || "/DeafultThumbinal.png"}
                      />
                    </div>
                    <div className="flex flex-col gap-y-0.5">
                      {" "}
                      <div
                        className={cn(
                          "text-[8px] px-2 py-0.5 line-clamp-1 rounded-sm w-fit font-semibold bg-[#E6E4FF]! text-[#5247A9]!",
                        )}
                      >
                        {item?.tags}
                      </div>
                      <CardTitle className="text-xs line-clamp-1 mt-1">
                        {item?.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {item?.teacher || " Sir Faizan Khan"}
                      </CardDescription>
                      <div className="flex items-center mt-0.5 gap-2">
                        <div className="flex relative px-0">
                          <img
                            className="rounded-full size-4"
                            src="/men1.png"
                            alt=""
                          />
                          <img
                            className="rounded-full size-4 absolute left-2.5"
                            src="/men2.png"
                            alt=""
                          />

                          <div className="bg-[#0246FB] rounded-full size-4 text-center text-primary-foreground text-xs absolute left-4.5">
                            {item?.numenroll || "4"}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-xs pl-3.5">
                          {item?.enrolltitle || "Enrolled"}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
        </div>
      </Card>
    </div>
  );
}

export default RecentlyAddedCourse;
