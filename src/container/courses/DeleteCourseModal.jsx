import { Button } from "@/components/ui/button";
import { DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { deleteCourse } from "@/mutations/deleteCourse";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DeleteCourseModal = ({ handleOpenModal, item }) => {
  const deleteMutation = deleteCourse();
  const navigate = useNavigate();
  const handleConfirmDelete = () => {
    if (!item?._id) {
      console.error("Course ID is missing:", item);
      return;
    }
    deleteMutation.mutate(item._id, {
      onSuccess: () => {
        handleOpenModal?.(false);
      },
    });
    navigate("/admin/courses");
  };

  if (!item) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Delete Course?</h2>

      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete <strong>{item.title}</strong>?
      </p>

      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>

        <Button
          variant="destructive"
          onClick={handleConfirmDelete}
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
};
