import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseById } from "@/query/getCourseById";
import {
  ArrowRight,
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
    <div className="h-full w-full  overflow-y-auto overflow-hidden p-4 gap-4">
      <div className="relative grid grid-cols-[72%_27%] items-start gap-4">
        {isLoading ? (
          <Card className="flex w-full flex-col h-full animate-pulse">
            <div className="w-full h-72 shrink-0 relative bg-muted overflow-hidden">
              <div className="absolute bottom-4 left-4 w-32 h-7 rounded-2xl bg-muted-foreground/20" />
            </div>

            <ScrollArea className="max-h-full w-full pl-4 pr-8 mt-2">
              <div className="flex w-full flex-col">
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
                        <DialogContent className="h-40! w-130!">
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
                    Days:{" "}
                    {data?.data?.courseDays.map((item) => (
                      <div>{item},</div>
                    ))}
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

              <Card className="flex flex-col min-h-140! w-full mt-8 pl-6  bg-transparent pt-6">
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
          {isLoading ? (
            <div className="flex h-full lg:top-6  flex-col gap-2 animate-pulse">
              <Card className="h-70 flex  lg:top-6 flex-col items-center justify-center gap-4 px-6">
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
              <Card className="h-70 w-full flex flex-col items-center justify-center gap-3 px-6">
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
                    <CardTitle>24K</CardTitle>
                    <CardDescription>STUDENTS</CardDescription>
                  </div>
                  <div className="flex flex-col border-l border-border items-center">
                    <CardTitle>100%</CardTitle>
                    <CardDescription>ONLINE</CardDescription>
                  </div>
                </div>
              </Card>
              {/* <Card
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
                        Former Senior Staff Engineer at major tech firm with
                        over 15 years of experience in distributed systems. Dr.
                        Turing specializes in algorithmic optimization and has
                        been teaching advanced computer science concepts to
                        bridge the gap between academic theory and industry
                        practice.
                      </CardDescription>
                      <Link className="mt-1 h-10 flex items-center gap-2 text-primary">
                        View Profile <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </Card> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
