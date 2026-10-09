import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { getCourseById } from "@/query/getCourseById";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import {
  ArrowBigUpDash,
  ArrowDown,
  ChartBarStacked,
  ChevronDown,
  Clock,
  IdCardLanyard,
  User,
  UserRoundCheck,
  UserRoundCog,
  WavesArrowUp,
  X,
} from "lucide-react";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { useGetUser } from "@/query/useGetUser";
import { StatusBadge } from "./ui/status";
import { Button } from "./ui/button";
import MultiSelect from "@/container/MultiSelect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCreateAssigment } from "@/mutations/useCreateAssigment";
import toast from "react-hot-toast";
function TeacherAssigned() {
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  console.log("Set", selectedTeacher);
  const { id } = useParams();
  const { data, isLoading } = getCourseById(id);
  const Data = data?.data;
  const { data: UserData } = useGetUser();
  const TeacherData = UserData?.data?.filter((Role) => Role.role === "teacher");
  const { mutateAsync } = useCreateAssigment(id);
  const payload = {
    courseId: id,
    teacherId: selectedTeacher?._id,
  };
  const Submit = async () => {
    try {
      await mutateAsync(payload);
      toast.success("Assigned Course Successfully");
    } catch (error) {
      toast.error("Assigned Course Something Wen't Wrong");
    }
  };

  return (
    <div className="p-6 w-full flex-col justify-start items-start flex h-full">
      <CardTitle className={"text-xl"}>Assigne Course Teacher</CardTitle>
      <CardDescription>Assign a teacher to this Course</CardDescription>
      <div className="grid grid-cols-[58%_38%] w-full gap-4 mt-4">
        {isLoading ? (
          <Card className="h-100 p-4 flex flex-col">
            <Skeleton className="h-7 w-48" />

            <hr className="mt-4 text-muted-foreground h-2 w-full" />

            <div className="flex gap-2 justify-start items-start mt-2">
              <Skeleton className="size-22 rounded-xl" />

              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-6 w-24 rounded-2xl" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Skeleton className="size-5 rounded" />
                  <Skeleton className="h-4 w-18" />
                </div>

                <Skeleton className="h-4 w-32" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Skeleton className="size-5 rounded" />
                  <Skeleton className="h-4 w-18" />
                </div>

                <Skeleton className="h-4 w-24" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Skeleton className="size-5 rounded" />
                  <Skeleton className="h-4 w-18" />
                </div>

                <Skeleton className="h-4 w-36" />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Skeleton className="size-5 rounded" />
                  <Skeleton className="h-4 w-18" />
                </div>

                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <hr className="my-2 text-muted-foreground h-2 w-full" />

            <Skeleton className="h-6 w-40 mb-2" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
          </Card>
        ) : (
          <Card className={"h-100 p-4 flex flex-col"}>
            <CardTitle className={"text-xl"}>Course Information</CardTitle>
            <hr className="mt-4 text-muted-foreground h-2 w-full" />
            <div className="flex gap-2 justify-start items-start mt-2">
              {" "}
              <div className="bg-primary/70 rounded-xl flex justify-center items-center size-22 ">
                <img
                  className="h-14 w-18 object-cover "
                  src={Data?.thumbnail || "/DeafultThumbinal.png"}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <CardTitle className={"text-lg font-bold line-clamp-1"}>
                  {Data?.title || "CourseName"}
                </CardTitle>
                <div className="cursor-pointer mt-1  text-[14px] px-4 py-1 rounded-2xl w-fit  font-semibold shadow-2xl bg-primary/35 text-primary-foreground">
                  {Data?.tags}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {" "}
              <div className="flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <IdCardLanyard className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>Course ID:</Label>
                </div>
                <CardDescription>
                  course_{Data?._id.toUpperCase().slice(0, 10)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <ChartBarStacked className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>Category:</Label>
                </div>
                <CardDescription>{Data?.tags}</CardDescription>
              </div>
              <div className=" flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <ArrowBigUpDash className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>Level:</Label>
                </div>
                <CardDescription>Begginer to Advance</CardDescription>
              </div>
              <div className="flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <Clock className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>Duration:</Label>
                </div>
                <CardDescription>
                  {Data?.courseDuration?.value
                    ? `${Data?.courseDuration.value} ${Data?.courseDuration.unit}`
                    : "Duration is Not Decide"}
                </CardDescription>
              </div>
            </div>
            <hr className="my-2 text-muted-foreground h-2 w-full" />
            <Label className={"text-lg "}>Course Description</Label>
            <CardDescription className={"min-h-15 h-12 line-clamp-3"}>
              {Data?.description || "Description is Not Define "}
            </CardDescription>
          </Card>
        )}
        <Card className={"h- p-4 flex flex-col"}>
          <div>
            <div className="flex gap-2">
              <UserRoundCog />
              <div className="w-full">
                <CardTitle className={"text-xl"}>Assign Teacher</CardTitle>
                <hr className="mt-4 text-muted-foreground h-2 w-full" />
              </div>
            </div>
            <CardDescription>
              Selected the teacher from this course available teachers
            </CardDescription>
            <CardTitle className={"mt-6 mb-2"}>Teacher</CardTitle>
            <div className="w-full">
              <DropdownMenu>
                {" "}
                <DropdownMenuTrigger
                  render={<Button variant="outline" />}
                  className="flex w-full justify-between px-2"
                >
                  {" "}
                  {selectedTeacher
                    ? `${selectedTeacher?.firstName} ${selectedTeacher?.lastName}`
                    : "Select Teacher"}{" "}
                  <ChevronDown className="ml-2 size-4" />
                </DropdownMenuTrigger>{" "}
                <DropdownMenuContent>
                  {" "}
                  <DropdownMenuGroup>
                    {" "}
                    {TeacherData?.map((item) => {
                      return (
                        <div>
                          <DropdownMenuItem
                            key={item.id}
                            onClick={() => setSelectedTeacher(item)}
                          >
                            {" "}
                            <img
                              src={item?.avatar}
                              className="size-5 rounded-full object-cover"
                              alt={item?.firstName}
                            />{" "}
                            <CardTitle>
                              {" "}
                              {item?.firstName} {item?.lastName}
                            </CardTitle>{" "}
                          </DropdownMenuItem>{" "}
                        </div>
                      );
                    })}
                  </DropdownMenuGroup>
                </DropdownMenuContent>{" "}
              </DropdownMenu>
            </div>

            <div className="bg-primary/15 h-26 px-3 py-2 w-full mt-4 rounded-xl">
              <CardTitle className={"text-lg"}>Selected Teacher</CardTitle>
              <Card
                key={selectedTeacher?.id}
                className={
                  "bg-transparent flex items-start justify-start gap-4 mt-2"
                }
              >
                <div className="flex size-12 justify-center items-center">
                  {selectedTeacher?.avatar ? (
                    <img
                      className="size-full rounded-full object-cover "
                      src={selectedTeacher?.avatar}
                    />
                  ) : (
                    <div className="bg-accent size-12 rounded-full flex items-center justify-center">
                      <UserRoundCheck className="size-6" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <CardDescription>
                    {selectedTeacher?.firstName || "No Teacher Selected"}{" "}
                    {selectedTeacher?.lastName || ""}
                  </CardDescription>
                  <CardDescription className={"mt-0"}>
                    {selectedTeacher?.email ||
                      "Please Choose a teacher from a dropdown"}
                  </CardDescription>
                </div>
              </Card>
            </div>
            <div>
              <Link to={"/courses"}>
                <Button variant="outline">
                  <X />
                  Cancel
                </Button>
              </Link>
              <Button type="submit" onClick={Submit} variant="button">
                Assigned Teacher
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-[58%_38%]  w-full mt-8">
        <div className="p-4 h-fit w-full rounded-xl bg-card mb-4">
          <CardTitle>Available Teacher</CardTitle>
          <CardDescription>
            Here's are a list of teacher's you can assign this Course
          </CardDescription>
          <hr className="my-4" />
          <div className="grid grid-cols-4 gap-4 mt-2">
            {TeacherData?.slice(0, 4)?.map((item) => {
              const IntialFirst = setSelectedTeacher?.firstName
                ?.charAt()
                .toUpperCase();
              const LastFirst = setSelectedTeacher?.lastName
                ?.charAt()
                .toUpperCase();
              return (
                <div>
                  <Card
                    key={setSelectedTeacher?.id}
                    className={
                      "h-46 p-2 flex flex-col bg-transparent border border-border"
                    }
                  >
                    <div className="flex size-12 justify-center items-center ">
                      {item?.avatar ? (
                        <img
                          className="size-full rounded-full object-cover "
                          src={item?.avatar}
                        />
                      ) : (
                        <h1 className="size-full text-xs flex flex-col justify-center items-center bg-muted! rounded-full ">
                          {IntialFirst}
                          {LastFirst}
                        </h1>
                      )}
                    </div>
                    <CardTitle className={"text-sm line-clamp-1 mt-1"}>
                      {item?.firstName} {item?.lastName}
                    </CardTitle>
                    <CardDescription className={"text-xs"}>
                      {item?.email}
                    </CardDescription>
                    <div
                      className="bg-green-100 dark:bg-green-800/20 text-green-700 hover:bg-green-100 w-fit py-0.5 px-2 rounded-xl mt-1
                  "
                    >
                      Devloper
                    </div>
                    <Button
                      className={"border border-primary mt-2 text-primary"}
                      variant="outline"
                      onClick={() => setSelectedTeacher(item)}
                    >
                      Select
                    </Button>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
}

export default TeacherAssigned;
