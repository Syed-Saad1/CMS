import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "../components/ui/card";
import { getCourseById } from "@/query/getCourseById";
import { Link, useParams } from "react-router-dom";
import {
  Loader,
  Pencil,
  Trash,
  UserRoundArrowLeft,
  UserRoundCheck,
  UserRoundCog,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useCreateAssigment } from "@/mutations/useCreateAssigment";
import toast from "react-hot-toast";
import TeacherListDropDown from "@/components/CreateTeacherListDropDown";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import DeleteTeacherAssignedModal from "./DeleteTeacherAssignedModal";
import { getAllTeacher } from "@/query/getAllTeacher";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "../components/ui/scroll-area";
import CourseDataAssignedTeacher from "../components/CourseDataAssignedTeacher";
import axios from "axios";
import UpdateAssignedTeacher from "./UpdateAssignedTeacherModal";
function TeacherAssigned() {
  const { t } = useTranslation();
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { id } = useParams();
  const { data, isLoading } = getCourseById(id);
  const Data = data?.data;
  const { data: UserData } = getAllTeacher();
  const TeacherData = UserData?.data;
  const { mutateAsync, isPending } = useCreateAssigment(id);
  const payload = {
    courseId: id,
    teacherId: selectedTeacher?._id,
  };
  const Submit = async ({ resetForm }) => {
    try {
      const response = await mutateAsync(payload);
      toast.success(response?.message || t("ui.assignSuccess"));
      setSelectedTeacher(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || t("messages.somethingWrong"),
        );
      } else {
        toast.error(t("messages.somethingWrong"));
      }
    }
  };

  return (
    <div className="p-6 w-full flex-col justify-start items-start flex h-full">
      <CardTitle className={"text-xl"}>{t("ui.teacherTitle")}</CardTitle>
      <CardDescription>{t("ui.assignTeacherDescription")}</CardDescription>
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,58%)_minmax(0,38%)] w-full min-w-0 gap-4 mt-4 pb-2">
        <CourseDataAssignedTeacher Data={Data} isLoading={isLoading} />
        <Card className={"border h-fit border-border p-4 flex flex-col"}>
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
                  "bg-transparent flex items-start pb-2 justify-start gap-4 mt-2"
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
                  <CardDescription className={"font-semibold text-black"}>
                    {selectedTeacher?.firstName || "No Teacher Selected"}{" "}
                    {selectedTeacher?.lastName || ""}
                  </CardDescription>
                  <CardDescription className={"mt-0 text-xs"}>
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
                {isPending ? (
                  <>
                    <Loader className="animate-spin" />
                    Assiging..
                  </>
                ) : (
                  <>
                    <UserRoundArrowLeft /> Assigned Teacher
                  </>
                )}{" "}
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,58%)_minmax(0,38%)] gap-4 w-full min-w-0 mt-8">
        <div className="border border-border p-4 h-fit w-full rounded-xl bg-card mb-6">
          <CardTitle>{t("ui.availableTeacher")}</CardTitle>
          <CardDescription>
            Here's are a list of teacher's you can assign this Course
          </CardDescription>
          <hr className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-2 md:mb-6 mb-18">
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
          className={
            "border border-border h-fit bg-card max-h-fit p-4 md:mb-6 mb-24  rounded-xl"
          }
        >
          <CardTitle>{t("ui.manageAssignments")}</CardTitle>
          <CardDescription className={"text-xs"}>
            View currently assigned teachers, update assignments, or remove.
          </CardDescription>
          <hr className="mt-5" />
          <div className="grid gap-4 grid-cols-1  mt-4">
            {" "}
            {Data?.teacherAssignments?.map((item) => {
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
                    <Dialog
                      open={isUpdateDialogOpen}
                      onOpenChange={setIsUpdateDialogOpen}
                    >
                      <DialogTrigger>
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
                          <Pencil className="md:block hidden" />
                          Change Teacher
                        </Button>
                      </DialogTrigger>

                      <DialogContent
                        className="
    flex flex-col
    w-[calc(100%-1rem)]
    sm:w-[calc(100%-2rem)]
    max-w-2xl
    max-h-[90dvh]
    overflow-hidden
    gap-0
    p-0
  "
                      >
                        <UpdateAssignedTeacher
                          onSuccess={() => setIsUpdateDialogOpen(false)}
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
                          Delete
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
