import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { deleteCourse } from "@/mutations/deleteCourse";
import { Loader } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DeleteCourseModal = ({ handleOpenModal, item }) => {
  const { mutateAsync, isPending } = deleteCourse();
  const navigate = useNavigate();
  const handleConfirmDelete = async () => {
    try {
      if (!item?._id) {
        return;
      }
      const response = await mutateAsync(item._id);
      const result = response;
      toast.success(result?.message || "Delete Course");
      navigate("/courses");
    } catch (error) {}
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
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader className="animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </Button>
      </div>
    </div>
  );
};
