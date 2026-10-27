import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseById } from "@/query/getCourseById";
import {
  BookOpenCheck,
  CalendarSync,
  Loader,
  Lock,
  MailBadge,
  Pencil,
  Plus,
  RotateCwFadingClock,
  Trash,
  UserRoundArrowLeft,
} from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { useEnrollCourse } from "@/mutations/useEnrollCourse";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";
import remarkGfm from "remark-gfm";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CourseDetailedSkeleton from "@/skeleton/CourseDetailedSkeleton";
export const CourseDetail = () => {
  const { id } = useParams();

  const { data, isLoading } = getCourseById(id);
  const { mutateAsync, isPending } = useEnrollCourse();
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");
  const payload = {
    userId: userId,
    courseId: id,
  };

  const handleEnroll = async () => {
    try {
      const res = await mutateAsync(payload);

      if (res.success === true) {
        toast.success(res.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(error?.response?.data?.message || "Enroll api fail");
        } else {
        }
      }
    }
  };
  return (
    <div className="w-full md:mb-4 mb-18 min-w-0 overflow-x-hidden p-3 sm:p-4">
      <div
        className={`relative grid min-w-0 grid-cols-1 items-start gap-4 ${
          role === "admin"
            ? "w-full"
            : "xl:grid-cols-[minmax(0,72%)_minmax(0,27%)]"
        }`}
      >
        {isLoading ? (
          <CourseDetailedSkeleton />
        ) : (
          <Card className="flex border border-border flex-col w-full">
            <div className="w-full h-72 shrink-0 relative bg-accent overflow-hidden">
              <img
                className="aspect-video w-full object-cover h-full"
                src={data?.data?.thumbnail || "/DeafultThumbinal.png"}
                alt="thumbnail"
              />
              {role === "admin" && (
                <div className="flex justify-between  right-0 left-0  bottom-1 px-4 absolute z-50">
                  <div className="flex items-center  gap-2">
                    <Tooltip>
                      <Dialog>
                        <DialogTrigger
                          className=" cursor-pointer  bottom-0
                 inline-flex px-2 w-fit gap-1 py-2 opacity-100 bg-muted text-destructive rounded-sm justify-center items-center"
                        >
                          <Trash size={18} />
                        </DialogTrigger>
                        <DialogContent className="h-fit! w-full! max-w-[calc(100vw-2rem)]! sm:w-88!">
                          {data?.data ? (
                            <DeleteCourseModal item={data?.data} />
                          ) : null}{" "}
                        </DialogContent>
                      </Dialog>
                      <TooltipContent>Delete Course</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      {" "}
                      <TooltipTrigger>
                        {" "}
                        <Link
                          className="
                 inline-flex size-8 opacity-100 bg-muted text-primary rounded-sm justify-center items-center px-2 w-fit gap-1 py-2"
                          to={`/courses/edit/${data?.data?._id}`}
                        >
                          <Pencil size={18} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Edit Course</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      {" "}
                      <TooltipTrigger>
                        <Link
                          className="
                 inline-flex size-8 opacity-100 bg-muted text-primary rounded-sm justify-center items-center px-2 w-fit gap-1 py-2"
                          to={`/courses/assign/${data?.data?._id}`}
                        >
                          <UserRoundArrowLeft size={18} />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>Assign Course Teacher</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>

            <div
              className="max-h-fit w-fit pl-4 pr-8 mt-2 
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
                <div className="md:flex gap-4 items-center md:gap-4">
                  <div className="md:mt-0 mt-2">
                    {" "}
                    <CardDescription className="md:text-sm text-xs  flex items-center gap-2">
                      {" "}
                      <RotateCwFadingClock
                        className="text-accent-foreground"
                        strokeWidth={1.6}
                        size={18}
                      />
                      6 Months
                    </CardDescription>
                  </div>
                  <div className="md:mt-0 mt-2">
                    {" "}
                    <CardDescription className="md:text-sm text-xs  flex items-center gap-2">
                      {" "}
                      <CalendarSync
                        className="text-accent-foreground"
                        strokeWidth={1.6}
                        size={18}
                      />
                      Days:{" "}
                      {data?.data?.courseDays.map((item) => (
                        <div>{item},</div>
                      ))}
                    </CardDescription>
                  </div>
                  <div className="md:mt-0 mt-2">
                    <CardDescription className="md:text-sm text-xs flex items-center gap-2">
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
              </div>

              <Card className="flex flex-col min-h-fit! pb-10 w-full mt-8  bg-transparent pt-6">
                <CardTitle className="flex gap-2 items-center text-2xl font-semibold">
                  <BookOpenCheck
                    className="text-[#3b82f6]"
                    strokeWidth={1.8}
                    size={20}
                  />{" "}
                  What You'll learn
                </CardTitle>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex gap-2 items-start">
                    <CardDescription className="text-[15px] leading-relaxed ">
                      {data?.data?.content ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="mb-3 text-xl font-bold text-foreground">
                                {children}
                              </h1>
                            ),

                            h2: ({ children }) => (
                              <h2 className="mb-3 mt-5 text-lg font-semibold text-foreground">
                                {children}
                              </h2>
                            ),

                            h3: ({ children }) => (
                              <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">
                                {children}
                              </h3>
                            ),

                            p: ({ children }) => (
                              <p className="mb-3 text-sm leading-6 text-muted-foreground">
                                {children}
                              </p>
                            ),

                            ul: ({ children }) => (
                              <ul className="mb-4 ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                                {children}
                              </ul>
                            ),

                            ol: ({ children }) => (
                              <ol className="mb-4 ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
                                {children}
                              </ol>
                            ),

                            li: ({ children }) => (
                              <li className="pl-1">{children}</li>
                            ),

                            strong: ({ children }) => (
                              <strong className="font-semibold text-foreground">
                                {children}
                              </strong>
                            ),

                            em: ({ children }) => (
                              <em className="italic">{children}</em>
                            ),
                          }}
                        >
                          {data.data.content}
                        </ReactMarkdown>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Module not available
                        </p>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        )}
        <div className="sticky top-0 right-0 self-start h-fit w-full">
          {role === "user" && (
            <div>
              {" "}
              {isLoading ? (
                <div className="flex h-full lg:top-6  flex-col gap-2 animate-pulse">
                  <Card className="h-70 flex border border-border lg:top-6 flex-col items-center justify-center gap-4 px-6">
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
                      <div className="flex flex-col  items-center gap-1.5 pl-4">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="flex  flex-col gap-2 w-full mt-1">
                  <Card className="h-70 border border-border w-full flex flex-col items-center justify-center gap-3 px-6">
                    <CardTitle className="text-xl font-bold">
                      Build Your Future
                    </CardTitle>
                    <CardTitle className="text-3xl text-center font-semibold text-accent-foreground">
                      <span className="pr-2 text-primary">$</span>
                      {data?.data?.price}
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
                        <CardTitle>10K</CardTitle>
                        <CardDescription>STUDENTS</CardDescription>
                      </div>
                      <div className="flex flex-col border-l border-border items-center">
                        <CardTitle>100%</CardTitle>
                        <CardDescription>ONLINE</CardDescription>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
