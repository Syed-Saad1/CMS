import React, { useState } from "react";
import {
  ArrowRight,
  Loader,
  Repeat,
  Save,
  UserRoundCheck,
  X,
} from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { useUpdateAssigned } from "@/mutations/useUpdateAssigned";
import { useDeleteAssigment } from "@/mutations/useDeleteAssigment";
import toast from "react-hot-toast";
import axios from "axios";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateTeacherListDropDown from "@/components/UpdateTeacherListDropDown";

function UpdateAssignedTeacher({ Data, TeacherData, selectedTeacherId }) {
  const [updateAssigned, setUpdateAssignedTeacher] = useState(null);
  const id = selectedTeacherId?.assignId;
  const { mutateAsync, isPending } = useUpdateAssigned(id);
  const handleClick = async () => {
    try {
      const payload = {
        teacherId: updateAssigned?._id,
      };
      const response = await mutateAsync(payload);

      toast.success(response.message || "");
      onclose;
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
    <div className="w-full min-w-0 max-w-120 shrink-0">
      <div className="space-y-1">
        <CardTitle>Update Teacher Assigned</CardTitle>
        <CardDescription>
          Update the teacher assigned to this course.
        </CardDescription>
      </div>

      <div className="mt-4 flex min-w-0 items-start gap-3 rounded-xl border border-border bg-muted/60 p-3 sm:p-4">
        <img
          className="h-14 w-16 shrink-0 rounded-md object-cover sm:w-20"
          src={Data?.thumbnail || "/DeafultThumbinal.png"}
          alt={Data?.title || "Course thumbnail"}
        />

        <div className="min-w-0 flex-1 space-y-2">
          <CardTitle className="truncate text-base font-medium sm:text-lg">
            {Data?.title}
          </CardTitle>

          <div className="flex flex-wrap gap-1.5">
            {Data?.tags?.slice(0, 2).map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-md bg-background px-2 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
            {(Data?.tags?.length ?? 0) > 2 && (
              <span className="text-xs text-muted-foreground">
                +{Data.tags.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <CardTitle className="text-base">Select New Teacher</CardTitle>

        <UpdateTeacherListDropDown
          updateAssigned={updateAssigned}
          setUpdateAssignedTeacher={setUpdateAssignedTeacher}
          TeacherData={TeacherData}
        />

        <CardDescription className="pl-1 text-xs">
          Select an eligible teacher to replace the current teacher.
        </CardDescription>
      </div>

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4">
        <div className="flex items-center gap-2">
          <Repeat className="size-5 shrink-0 text-primary" />
          <CardTitle className="text-base">Assignment Preview</CardTitle>
        </div>

        <div className="mt-4 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-2">
          <Card className="min-w-0 gap-3 rounded-xl border-border bg-card p-3">
            <span className="w-fit max-w-full rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
              Current Teacher
            </span>

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent">
                {selectedTeacherId?.teacher?.avatar ? (
                  <img
                    className="size-full object-cover"
                    src={selectedTeacherId.teacher.avatar}
                    alt="Current teacher"
                  />
                ) : (
                  <UserRoundCheck className="size-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-sm font-medium">
                  {selectedTeacherId?.teacher?.firstName}{" "}
                  {selectedTeacherId?.teacher?.lastName}
                </CardTitle>

                <CardDescription className="mt-1 truncate text-xs">
                  {selectedTeacherId?.teacher?.email}
                </CardDescription>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-center py-1">
            <ArrowRight className="size-5 rotate-90 text-primary sm:rotate-0" />
          </div>

          <Card className="min-w-0 gap-3 rounded-xl border-primary/30 bg-card p-3">
            <span className="w-fit max-w-full rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              New Teacher
            </span>

            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent">
                {updateAssigned?.avatar ? (
                  <img
                    className="size-full object-cover"
                    src={updateAssigned.avatar}
                    alt="New teacher"
                  />
                ) : (
                  <UserRoundCheck className="size-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <CardTitle className="truncate text-sm font-medium">
                  {updateAssigned?.firstName || "No teacher selected"}{" "}
                  {updateAssigned?.lastName}
                </CardTitle>

                <CardDescription className="mt-1 truncate text-xs">
                  {updateAssigned?.email || "Select a teacher above"}
                </CardDescription>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <X className="mr-1 size-4" />
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="button"
            onClick={handleClick}
            disabled={isPending || !updateAssigned?._id}
            variant="button"
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader className="mr-1 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-1 size-4" />
                Update Assignment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UpdateAssignedTeacher;
