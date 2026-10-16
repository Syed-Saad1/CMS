import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { getCourseById } from "@/query/getCourseById";
import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import {
  ArrowBigUpDash,
  ChartBarStacked,
  Clock,
  IdCardLanyard,
  Pencil,
  Trash,
  UserRoundCheck,
  UserRoundCog,
  X,
} from "lucide-react";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useCreateAssigment } from "@/mutations/useCreateAssigment";
import toast from "react-hot-toast";
import UpdateAssignedTeacher from "./UpdateAssignedTeacherModal";
import TeacherListDropDown from "./CreateTeacherListDropDown";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import DeleteTeacherAssignedModal from "./DeleteTeacherAssignedModal";
import { getAllTeacher } from "@/query/getAllTeacher";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "./ui/scroll-area";
function TeacherAssigned() {
  const { t } = useTranslation();
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  console.log("selectedTeacherId", selectedTeacherId);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = getCourseById(id);
  const Data = data?.data;
  const { data: UserData } = getAllTeacher();
  const TeacherData = UserData?.data;
  const { mutateAsync } = useCreateAssigment(id);
  const payload = {
    courseId: id,
    teacherId: selectedTeacher?._id,
  };
  const Submit = async () => {
    try {
      await mutateAsync(payload);
      toast.success(t("ui.assignSuccess"));
    } catch (error) {
      toast.error(t("ui.assignFailure"));
    }
  };

  return (
    <div className="p-6 w-full flex-col justify-start items-start flex h-full">
      <CardTitle className={"text-xl"}>{t("ui.teacherTitle")}</CardTitle>
      <CardDescription>{t("ui.assignTeacherDescription")}</CardDescription>
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
            <CardTitle className={"text-xl"}>
              {t("ui.courseInformation")}
            </CardTitle>
            <hr className="mt-4 text-muted-foreground h-2 w-full" />
            <div className="flex gap-2 justify-start items-start mt-2">
              {" "}
              <div className="bg-primary/40 rounded-sm flex justify-center items-center size-22 ">
                <img
                  className="h-18 w-20 object-cover rounded-lg"
                  src={Data?.thumbnail || "/DeafultThumbinal.png"}
                  alt=""
                />
              </div>
              <div className="flex justify-center items-center gap-1">
                <div className="max-w-60 flex-1 ">
                  <CardTitle className="truncate  text-lg font-normal">
                    {Data?.title || "CourseName"}{" "}
                  </CardTitle>
                </div>
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
                  <Label className={"min-w-18 w-18"}>{t("ui.courseId")}</Label>
                </div>
                <CardDescription>
                  course_{Data?._id.toUpperCase().slice(0, 10)}
                </CardDescription>
              </div>
              <div className="flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <ChartBarStacked className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>{t("ui.category")}</Label>
                </div>
                <CardDescription>{Data?.tags}</CardDescription>
              </div>
              <div className=" flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <ArrowBigUpDash className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>{t("ui.level")}</Label>
                </div>
                <CardDescription>{t("ui.beginnerAdvanced")}</CardDescription>
              </div>
              <div className="flex items-center gap-4 ">
                <div className=" flex justify-center gap-0.5 items-center">
                  <Clock className="size-5 shrink-0" />
                  <Label className={"min-w-18 w-18"}>{t("ui.duration")}</Label>
                </div>
                <CardDescription>
                  {Data?.courseDuration?.value
                    ? `${Data?.courseDuration.value} ${Data?.courseDuration.unit}`
                    : "Duration is Not Decide"}
                </CardDescription>
              </div>
            </div>
            <hr className="my-2 text-muted-foreground h-2 w-full" />
            <Label className={"text-lg "}>{t("ui.courseDescription")}</Label>
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
                <CardTitle className={"text-xl"}>
                  {t("ui.teacherTitle")}
                </CardTitle>
                <hr className="mt-4 text-muted-foreground h-2 w-full" />
              </div>
            </div>
            <CardDescription>
              Selected the teacher from this course available teachers
            </CardDescription>
            <CardTitle className={"mt-6 mb-2"}>{t("ui.teacher")}</CardTitle>
            <TeacherListDropDown
              selectedTeacher={selectedTeacher}
              TeacherData={TeacherData}
              setSelectedTeacher={setSelectedTeacher}
            />

            <div className="bg-primary/15 h-26 px-3 py-2 w-full mt-6 rounded-xl">
              <CardTitle className={"text-lg"}>
                {t("ui.selectedTeacher")}
              </CardTitle>
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
            <div className="mt-6 flex gap-2 items-center">
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
      <div className="grid grid-cols-[58%_38%] gap-4  w-full mt-8">
        <div className="p-4 h-fit w-full rounded-xl bg-card mb-6">
          <CardTitle>{t("ui.availableTeacher")}</CardTitle>
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
                    <div className="mt-2">
                      <div className="min-w-0 ">
                        <CardTitle className="truncate text-sm font-medium">
                          {item?.firstName} {item?.lastName}{" "}
                        </CardTitle>
                      </div>
                      <div className="min-w-0 ">
                        <CardDescription className="truncate text-sm font-medium">
                          {item?.email}
                        </CardDescription>
                      </div>
                    </div>

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
        <ScrollArea
          orientation="vertically"
          className={"h-72 bg-card max-h-72 p-4  rounded-xl"}
        >
          <CardTitle>{t("ui.manageAssignments")}</CardTitle>
          <CardDescription className={"text-xs"}>
            View currently assigned teachers, update assignments, or remove.
          </CardDescription>
          <hr className="mt-5" />
          <div className="grid gap-4 grid-rows-4  mt-4">
            {" "}
            {Data?.teacherAssignments?.map((item) => {
              console.log("item", item);
              const teacher = item?.teacher;
              return (
                <Card
                  className={"flex flex-col bg-muted/40 p-2"}
                  key={teacher?.id}
                >
                  <div className="flex justify-start items-start mt-4 gap-4">
                    <div className="flex size-12 justify-center items-center ">
                      {teacher?.avatar ? (
                        <img
                          className="size-full rounded-full object-cover "
                          src={teacher?.avatar}
                        />
                      ) : (
                        <div className="bg-accent size-12 rounded-full flex items-center justify-center">
                          <UserRoundCheck className="size-6" />
                        </div>
                      )}
                    </div>{" "}
                    <div>
                      <CardDescription>
                        {teacher?.firstName || "No Teacher Selected"}
                        {teacher?.lastName || ""}
                      </CardDescription>
                      <CardDescription>
                        {teacher?.email ||
                          "Please Choose a teacher from a dropdown"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-2 items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setSelectedTeacherId({
                              teacher,
                              item,
                              assignId: item?._id,
                            })
                          }
                          variant="button"
                        >
                          <Pencil />
                          Change Teacher
                        </Button>
                      </DialogTrigger>

                      <DialogContent
                        className={"max-w-lg! w-fit shrink-0 h-140!"}
                      >
                        <UpdateAssignedTeacher
                          TeacherData={TeacherData}
                          setSelectedTeacher={setSelectedTeacher}
                          selectedTeacher={selectedTeacher}
                          Data={Data}
                          selectedTeacherId={selectedTeacherId}
                        />
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() =>
                            setSelectedTeacherId({
                              teacher,
                              item,
                              assignId: item?._id,
                            })
                          }
                          variant="destructive"
                        >
                          <Trash />
                          Remove Assigned
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DeleteTeacherAssignedModal
                          selectedTeacherId={selectedTeacherId}
                          setSelectedTeacherId={setSelectedTeacherId}
                          selectedTeacher={selectedTeacher}
                          Data={Data}
                          teacher={teacher}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default TeacherAssigned;
