import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Repeat,
  Save,
  UserRoundCheck,
  X,
} from "lucide-react";
import TeacherListDropDown from "./TeacherListDropDown";
import { Button } from "./ui/button";
import { DialogClose } from "./ui/dialog";

function UpdateAssignedTeacher({
  setSelectedTeacher,
  Data,
  TeacherData,
  selectedTeacher,
}) {
  return (
    <div>
      <div>
        <CardTitle>Update Teacher Assigned</CardTitle>
        <CardDescription>
          update the teacher assigned to this course.
        </CardDescription>
      </div>
      <div className="flex gap-4 border p-4 mt-4 border-muted w-full justify-start items-start">
        <div>
          <img
            className="h-10 rounded-sm object-center"
            src={Data?.thumbnail || "/DeafultThumbinal.png"}
            alt=""
          />
        </div>
        <div className="flex justify-start gap-1 items-start">
          <div className="max-w-50 flex-1 ">
            <CardTitle className="truncate  text-lg font-normal">
              {Data?.title}{" "}
            </CardTitle>
          </div>
          <div className="bg-primary/30 w-fit text-primary-foreground px-3 py-0.5 rounded-2xl overflow-hidden ">
            {Data?.tags}
          </div>
        </div>
      </div>
      <div>
        {" "}
        <CardTitle className={"mt-4 mb-2"}>Select New Teacher</CardTitle>
        <TeacherListDropDown
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          TeacherData={TeacherData}
        />
        <CardDescription className={"text-xs pl-1 pt-1 mt-1"}>
          select an eligable teacher to replace the current teacher.
        </CardDescription>
      </div>
      <div className="bg-primary/15  p-4 flex flex-col mt-4 h-fit rounded-xl">
        <div className="text-lg items-start justify-start flex gap-2">
          <Repeat />
          <CardTitle>Assigned Preview</CardTitle>
        </div>
        <div className="grid grid-cols-[45%_10%_45%] justify-center items-center mt-4 w-full ">
          <Card className={"p-2 min-h-35 gap-1 flex flex-col "}>
            <div
              className="bg-primary/30 w-fit text-primary-foreground px-2 py-0.5 mt-1
               rounded-2xl overflow-hidden "
            >
              Current Teacher
            </div>
            <div key={selectedTeacher?.id}>
              <div className="flex size-12 justify-center items-center ">
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
              </div>{" "}
            </div>
            <div>
              <CardTitle className={"text-sm"}>
                {selectedTeacher?.firstName}
                {selectedTeacher?.lastName}
              </CardTitle>
              <div className="min-w-0 flex-1 ">
                <CardDescription className="truncate block text-xs font-normal">
                  {selectedTeacher?.email}
                </CardDescription>
              </div>
            </div>
          </Card>
          <div className="flex justify-center items-center">
            {" "}
            <ArrowRight className="text-primary font-bold" />
          </div>
          <Card className={"p-2 min-h-35 gap-1 flex flex-col "}>
            <div
              className="bg-primary/30 w-fit text-primary-foreground px-3 py-0.5 mt-1
               rounded-2xl overflow-hidden "
            >
              New Teacher
            </div>
            <div key={selectedTeacher?.id}>
              <div className="flex size-12 justify-center items-center ">
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
              </div>{" "}
            </div>
            <div>
              <CardTitle className={"text-sm"}>
                {selectedTeacher?.firstName}
                {selectedTeacher?.lastName}
              </CardTitle>
              <div className="min-w-0 flex-1 ">
                <CardDescription className="truncate block text-xs font-normal">
                  {selectedTeacher?.email}
                </CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="flex justify-end items-end mt-4 gap-3">
        <DialogClose asChild>
          <Button variant="outline">
            <X />
            Cancel
          </Button>
        </DialogClose>
        <Button variant="button">
          <Save /> Update Assign
        </Button>
      </div>
    </div>
  );
}

export default UpdateAssignedTeacher;
