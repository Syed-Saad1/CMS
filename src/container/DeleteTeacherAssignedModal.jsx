import React from "react";
import { CardDescription, CardTitle } from "../components/ui/card";
import { DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Loader, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteAssigment } from "@/mutations/useDeleteAssigment";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function DeleteTeacherAssignedModal({
  Data,
  selectedTeacher,
  selectedTeacherId,
}) {
  const { t } = useTranslation();
  const id = selectedTeacherId?.assignId;
  const { mutateAsync: Delete, isPending } = useDeleteAssigment(id);
  const handleClick = async () => {
    try {
      const response = await Delete(id);
      toast.success(response.message || "Delete Assigment Successfully");
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
    <div>
      <div>
        <CardTitle>Delete Assigned</CardTitle>
        <CardDescription className={"mt-2"}>
          Are you sure you want to remove this teacher{" "}
          {selectedTeacher?.firstName}
          {selectedTeacher?.lastName} from this assigned course {Data?.title}
          ?{" "}
        </CardDescription>
        <div className="flex justify-end items-end mt-4">
          {" "}
          <DialogTrigger>
            <Button onClick={() => handleClick()} variant="destructive">
              {isPending ? (
                <>
                  <Loader className="animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  {" "}
                  <Trash /> Remove Permently
                </>
              )}{" "}
            </Button>
          </DialogTrigger>
        </div>{" "}
      </div>
    </div>
  );
}
