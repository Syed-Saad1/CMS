import CourseForm from "@/components/CourseForm";
import { editCourse } from "@/mutations/editCourse";
import { getCourseById } from "@/query/getCourseById";
import { IdCardLanyardIcon } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

function EditCourseCard() {
  const { id } = useParams();
  const { data } = getCourseById(id);
  const CourseData = data?.data;

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
