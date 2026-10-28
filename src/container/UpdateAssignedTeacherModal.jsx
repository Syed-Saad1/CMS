import React, { useState } from "react";
import {
  ArrowDownUp,
  Loader,
  Repeat,
  Save,
  UserRoundCheck,
  X,
} from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { useUpdateAssigned } from "@/mutations/useUpdateAssigned";
import toast from "react-hot-toast";
import axios from "axios";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateTeacherListDropDown from "@/components/UpdateTeacherListDropDown";

function UpdateAssignedTeacher({ onSuccess, TeacherData, selectedTeacherId }) {
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
      onSuccess?.();
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
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col  overflow-hidden">
      <div className="min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain p-4 sm:p-6">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold tracking-tight">
            Update Teacher Assignment
          </CardTitle>
          <CardDescription className="text-sm">
            Update the teacher assigned to this course.
          </CardDescription>
        </div>

        <div className="mt-6 min-w-0 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 space-y-1">
              <CardTitle className="text-sm font-semibold">
                Select New Teacher
              </CardTitle>
              <CardDescription className="text-xs">
                Choose the instructor for this course.
              </CardDescription>
            </div>

            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50">
              <UserRoundCheck className="size-4 text-muted-foreground" />
            </div>
          </div>

          <UpdateTeacherListDropDown
            updateAssigned={updateAssigned}
            setUpdateAssignedTeacher={setUpdateAssignedTeacher}
            TeacherData={TeacherData}
          />
        </div>
        <div className="mt-6 w-full min-w-0 overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex min-w-0 items-center gap-3 border-b border-border bg-muted/30 px-3 py-3 sm:px-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Repeat className="size-4 text-primary" />
            </div>

            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm font-semibold">
                Assignment Preview
              </CardTitle>
              <CardDescription className="mt-0.5 text-xs">
                Review the teacher change before saving.
              </CardDescription>
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 p-3 sm:p-4">
            <Card className="min-w-0 gap-3 rounded-xl border-border bg-muted/20 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-muted-foreground">
                  Current Teacher
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-muted-foreground" />
                  Assigned
                </span>
              </div>

              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-background sm:size-16">
                  {selectedTeacherId?.teacher?.avatar ? (
                    <img
                      className="size-full object-cover"
                      src={selectedTeacherId.teacher.avatar}
                      alt="Current teacher"
                    />
                  ) : (
                    <UserRoundCheck className="size-6 text-muted-foreground" />
                  )}
                </div>

                <div className="w-full min-w-0 space-y-1">
                  <CardTitle className="wrap-break-word text-sm font-semibold">
                    {selectedTeacherId?.teacher?.firstName || "Current Teacher"}{" "}
                    {selectedTeacherId?.teacher?.lastName}
                  </CardTitle>

                  <CardDescription className="break-all text-xs">
                    {selectedTeacherId?.teacher?.email || "Email unavailable"}
                  </CardDescription>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 py-1">
              <div className="h-px min-w-0 flex-1 bg-border" />

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
                <ArrowDownUp className="size-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-primary">
                  Teacher Change
                </span>
              </div>

              <div className="h-px min-w-0 flex-1 bg-border" />
            </div>

            <Card className="min-w-0 gap-3 rounded-xl border-primary/30 bg-primary/4 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-foreground">
                  New Teacher
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {updateAssigned?._id ? "Selected" : "Awaiting Selection"}
                </span>
              </div>

              <div className="flex min-w-0 flex-col items-center gap-2 text-center">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-background sm:size-16">
                  {updateAssigned?.avatar ? (
                    <img
                      className="size-full object-cover"
                      src={updateAssigned.avatar}
                      alt="New teacher"
                    />
                  ) : (
                    <UserRoundCheck className="size-6 text-muted-foreground" />
                  )}
                </div>

                <div className="w-full min-w-0 space-y-1">
                  <CardTitle className="wrap-break-word text-sm font-semibold">
                    {updateAssigned?._id
                      ? `${updateAssigned.firstName || ""} ${updateAssigned.lastName || ""}`.trim()
                      : "No teacher selected"}
                  </CardTitle>

                  <CardDescription className="break-all text-xs">
                    {updateAssigned?.email || "Select a teacher above"}
                  </CardDescription>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-border bg-background p-3 sm:px-6 sm:py-4">
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
