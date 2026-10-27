import CourseForm from "@/container/CourseForm";
import { editCourse } from "@/mutations/editCourse";
import React from "react";
import { useParams } from "react-router-dom";
function EditCourseCard() {
  const { id } = useParams();

  const { mutateAsync: editCourseMutation, isPending: isEditPending } =
    editCourse(id);
  return (
    <div className="w-full">
      <CourseForm
        editCourseMutation={editCourseMutation}
        isEditPending={isEditPending}
        courseId={id}
      />
    </div>
  );
}

export default EditCourseCard;
