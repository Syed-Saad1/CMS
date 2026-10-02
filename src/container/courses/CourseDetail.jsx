import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatWillLearn } from "@/container/AdminDashboardCard";
import { getCourseById } from "@/query/getCourseById";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarSync,
  CircleCheckBig,
  Loader,
  Lock,
  MailBadge,
  Plus,
  RotateCwFadingClock,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { useEnrollCourse } from "@/mutations/useEnrollCourse";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
export const CourseDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = getCourseById(id);
  const { mutateAsync, isPending } = useEnrollCourse();
  const userId = Cookies.get("userId");
  const payload = {
    userId: userId,
    courseId: id,
  };
  console.log("Pay", payload);
  const handleEnroll = async () => {
    try {
      const res = await mutateAsync(payload);

      console.log("res", res);
      if (res.success === true) {
        console.log(res.success);
        toast.success(res.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error?.response?.data?.message || "Enroll api fail");
        } else {
          console.error("Setup Error:", error.message);
        }
      }
    }
  };

  return (
    <Dialog>
      <div className="h-full w-full grid grid-cols-[68%_30%] p-4 gap-4">
        {isLoading ? (
          <Card className="flex flex-col h-full animate-pulse">
            <div className="w-full h-72 shrink-0 relative bg-muted overflow-hidden">
              <div className="absolute bottom-4 left-4 w-32 h-7 rounded-2xl bg-muted-foreground/20" />
            </div>

            <ScrollArea className="max-h-full w-full pl-4 pr-8 mt-2">
              <div className="flex flex-col">
                <Skeleton className="h-9 w-3/4 mt-5" />

                <div className="space-y-2 mt-3 min-h-20">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <hr className="my-4 border-border" />

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4.5 w-4.5 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4.5 w-4.5 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4.5 w-4.5 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>

              <Card className="flex flex-col min-h-140! w-full mt-8 bg-muted/40 pl-6 pt-6 pb-6 pr-6 border-none">
                <div className="flex gap-2 items-center">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-6 w-44" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <Skeleton className="h-4.5 w-4.5 rounded-full shrink-0 pt-0.5" />
                      <div className="w-full space-y-1.5">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollArea>
          </Card>
        ) : (
          <Card className="flex flex-col">
            <div className="group w-full h-72 shrink-0 relative bg-accent overflow-hidden">
              <img
                className="w-full object-cover h-full"
                src={data?.data?.thumbnail || "/image.png"}
                alt=""
              />

              <div className="cursor-pointer absolute bottom-4 left-4 text-[14px] px-12 py-1 rounded-2xl w-fit z-40 font-semibold shadow-2xl bg-primary text-primary-foreground">
                {data?.data?.tags}
              </div>

              <DialogTrigger
                className="absolute top-0 right-0 z-50
               group-hover:opacity-100 opacity-0
               bg-destructive hover:bg-destructive/90
               inline-flex items-center gap-2
               rounded-md px-4 py-2
               text-sm font-medium"
              >
                <Trash size={18} />
                Delete
              </DialogTrigger>
            </div>

            <ScrollArea
              className="max-h-full w-full pl-4 pr-8 mt-2 
        "
            >
              <div className="flex flex-col ">
                <CardTitle className={"text-3xl mt-5 font-bold"}>
                  {data?.data?.title}
                </CardTitle>
                <CardDescription className="text-sm text-justify min-h-20 line-clamp-4 mt-3">
                  {data?.data?.description}
                </CardDescription>
                <hr className="my-4" />
                <div className="flex items-center gap-4">
                  <CardDescription className="flex items-center gap-2">
                    {" "}
                    <RotateCwFadingClock
                      className="text-accent-foreground"
                      strokeWidth={1.6}
                      size={18}
                    />
                    6 Months
                  </CardDescription>
                  <CardDescription className="flex items-center gap-2">
                    {" "}
                    <CalendarSync
                      className="text-accent-foreground"
                      strokeWidth={1.6}
                      size={18}
                    />
                    Days: Mon, Wed, Fri
                  </CardDescription>
                  <CardDescription className="flex items-center gap-2">
                    {" "}
                    <MailBadge
                      className="text-accent-foreground"
                      strokeWidth={1.6}
                      size={18}
                    />
                    Certificate Included
                  </CardDescription>
                </div>
              </div>
              <Card className="flex flex-col min-h-140! w-full mt-8 bg-muted! pl-6 pt-6">
                <CardTitle className="flex gap-2 items-center text-2xl font-semibold">
                  <BookOpenCheck
                    className="text-[#3b82f6]"
                    strokeWidth={1.8}
                    size={20}
                  />{" "}
                  What You'll learn
                </CardTitle>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {WhatWillLearn.map((item) => (
                    <div key={item?.id} className="flex gap-2 items-start">
                      <CircleCheckBig
                        className="text-[#4ce9a7] shrink-0 pt-0.5"
                        strokeWidth={1.5}
                        size={18}
                      />

                      <CardDescription className="text-[15px] max-h-14 line-clamp-2 leading-relaxed">
                        {item?.content}
                      </CardDescription>
                    </div>
                  ))}
                </div>
              </Card>
            </ScrollArea>
          </Card>
        )}
        {isLoading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <Card className="h-70 flex flex-col items-center justify-center gap-4 px-6">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-9 w-28 my-1" />
              <div className="border border-border w-full" />

              <div className="grid grid-cols-2 gap-2 items-center w-full">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <Skeleton className="h-4 w-48 mt-1" />
              <div className="border border-border w-full" />

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col items-center gap-1.5">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex flex-col border-l border-border items-center gap-1.5 pl-4">
                  <Skeleton className="h-6 w-12" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </Card>

            <Card className="h-58 flex flex-col gap-4 pt-4 px-6">
              <Skeleton className="h-3 w-28" />
              <div className="grid grid-cols-[32%_65%] gap-3">
                <div>
                  <Skeleton className="w-24 h-24 rounded-2xl" />
                </div>
                <div className="space-y-2 pl-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="flex flex-col gap-2 ">
            <Card className="h-70 flex flex-col items-center justify-center gap-3 px-6">
              <CardTitle className="text-xl font-bold">
                Build Your Future
              </CardTitle>
              <CardTitle className="text-3xl text-center font-semibold text-accent-foreground">
                <span className="pr-2 text-primary">$</span>299.99
              </CardTitle>
              <div className="border border-border w-full" />
              <div className="grid grid-cols-2 gap-2 items-center w-full">
                <Button
                  variant="button"
                  onClick={handleEnroll}
                  disabled={isPending}
                  className="w-full h-10 hover:bg-primary/90 hover:text-primary-foreground"
                >
                  {" "}
                  {isPending ? (
                    <>
                      <Loader className="size-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      Enroll{" "}
                    </>
                  )}{" "}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-10 hover:bg-outline hover:text-accent-foreground"
                >
                  Try ForFree
                </Button>
              </div>
              <CardDescription className="text-xs flex gap-2 items-center text-muted-foreground">
                <Lock size={16} />
                Secure Payment. 100% Refundable
              </CardDescription>
              <div className="border border-border w-full" />
              <div className=" grid grid-cols-2 gap-4 w-full ">
                <div className="flex flex-col items-center">
                  <CardTitle>24K</CardTitle>
                  <CardDescription>STUDENTS</CardDescription>
                </div>
                <div className="flex flex-col border-l border-border items-center">
                  <CardTitle>100%</CardTitle>
                  <CardDescription>ONLINE</CardDescription>
                </div>
              </div>
            </Card>
            <Card
              className="h-58 flex flex-col gap-4 pt-4
         px-6"
            >
              <Label className="text-xs font-semibold text-primary">
                COURSE INSTRUCTOR
              </Label>
              <div className="grid grid-cols-[32%_65%] gap-3">
                <div>
                  {" "}
                  <img
                    className="w-24 h-24 rounded-2xl object-cover"
                    src="/COURSEINSTRUCTOR.png"
                    alt="Instructor"
                  />
                </div>
                <div className="pl-2">
                  <CardTitle className="text-lg font-bold ">
                    Dr. Alan Turing
                  </CardTitle>
                  <CardDescription className="text-xs max-h-26 text-justify line-clamp-6  mt-2  leading-4.5 text-muted-foreground">
                    Former Senior Staff Engineer at major tech firm with over 15
                    years of experience in distributed systems. Dr. Turing
                    specializes in algorithmic optimization and has been
                    teaching advanced computer science concepts to bridge the
                    gap between academic theory and industry practice.
                  </CardDescription>
                  <Link className="mt-1 h-10 flex items-center gap-2 text-primary">
                    View Profile <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      <DialogContent className="h-40! w-130!">
        {data?.data ? <DeleteCourseModal item={data?.data} /> : null}{" "}
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetail;
