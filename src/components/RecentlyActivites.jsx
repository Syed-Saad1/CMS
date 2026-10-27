import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import {
  ArrowRight,
  FileIcon,
  GraduationCap,
  Megaphone,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import RecentActivitySkeleton from "@/skeleton/RecentActivitySkeleton";

function RecentlyActivites({ UserLoading }) {
  return (
    <div className=" mt-10">
      {UserLoading ? (
        <RecentActivitySkeleton UserLoading={UserLoading} />
      ) : (
        <Card className="block!  h-106! w-full rounded-xl p-4 mb-5">
          <div className="w-full flex justify-between items-center">
            {" "}
            <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted pl-5">
              Recently Activities
            </h1>
            <Link className="flex items-center gap-2 text-primary! text-sm font-normal ">
              View All
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </Link>
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between gap-4 px-4 items-center hover:bg-accent">
            <div className="flex gap-4 items-center mt-4 mb-4">
              <div className="flex gap-2 items-center  bg-primary/10 p-2 rounded-lg w-fit text-primary">
                <User />
              </div>
              <div>
                <CardTitle>New User Registered</CardTitle>
                <CardDescription className={"text-xs"}>Farooq </CardDescription>
              </div>
            </div>
            <div>
              <CardDescription className={"text-xs mt-1 text-muted-foreground"}>
                2 hours ago
              </CardDescription>
            </div>
          </div>
          <hr />
          <div className="flex justify-between gap-4 px-4  items-center hover:bg-accent">
            <div className="flex gap-4 items-center  mb-4  mt-4">
              <div className="flex gap-2 items-center  bg-primary/10 p-2 rounded-lg w-fit text-primary">
                <GraduationCap />
              </div>
              <div>
                <CardTitle>Course Created</CardTitle>
                <CardDescription className={"text-xs"}>
                  Advance FullStack Devlopment{" "}
                </CardDescription>
              </div>
            </div>
            <div>
              <CardDescription className={"text-xs mt-1 text-muted-foreground"}>
                1 Day left
              </CardDescription>
            </div>
          </div>
          <hr />
          <div className="flex justify-between gap-4 px-4  items-center hover:bg-accent">
            <div className="flex gap-4 items-center mb-4 mt-4">
              <div className="flex gap-2 items-center  bg-primary/10 p-2 rounded-lg w-fit text-primary">
                <FileIcon />
              </div>
              <div>
                <CardTitle>Exam Scheduled</CardTitle>
                <CardDescription className={"text-xs"}>
                  First Term Exam
                </CardDescription>
              </div>
            </div>
            <div>
              <CardDescription className={"text-xs mt-1 text-muted-foreground"}>
                23, April 2023
              </CardDescription>
            </div>
          </div>
          <hr />
          <div className="flex justify-between gap-4 px-4  items-center hover:bg-accent">
            <div className="flex gap-4 items-center mb-4 mt-4">
              <div className="flex gap-2 items-center  bg-primary/10 p-2 rounded-lg w-fit text-primary">
                <User />
              </div>
              <div>
                <CardTitle>New Enrollment</CardTitle>
                <CardDescription className={"text-xs"}>
                  Sohail Raza{" "}
                </CardDescription>
              </div>
            </div>
            <div>
              <CardDescription className={"text-xs mt-1 text-muted-foreground"}>
                10 Minutes ago
              </CardDescription>
            </div>
          </div>
          <hr />
          <div className="flex justify-between gap-4 px-4  items-center hover:bg-accent">
            <div className="flex gap-4 items-center mb-4 mt-4">
              <div className="flex gap-2 items-center  bg-primary/10 p-2 rounded-lg w-fit text-primary">
                <Megaphone />
              </div>
              <div>
                <CardTitle>Notification posted</CardTitle>
                <CardDescription className={"text-xs"}>
                  English Language Seminar{" "}
                </CardDescription>
              </div>
            </div>
            <div>
              <CardDescription className={"text-xs mt-1 text-muted-foreground"}>
                3, Oct 2026
              </CardDescription>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default RecentlyActivites;
