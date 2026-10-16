import React from "react";
import { CardDescription, CardTitle } from "./ui/card";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteAssigment } from "@/mutations/useDeleteAssigment";

export default function DeleteTeacherAssignedModal({
  Data,
  selectedTeacher,
  selectedTeacherId,
  setSelectedTeacherId,
  teacher,
}) {
  const id = selectedTeacherId?.assignId;
  console.log("ID", id);
  const { mutateAsync: Delete } = useDeleteAssigment(id);
  const handleClick = async () => {
    try {
      await Delete(id);
      toast.success("Delete Assigment Successfully");
    } catch (error) {}
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
              <Trash />
              Remove Permently
            </Button>
          </DialogTrigger>
        </div>{" "}
      </div>
    </div>
  );
}
