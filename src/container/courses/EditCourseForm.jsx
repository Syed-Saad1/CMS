import CourseForm from "@/components/CourseForm";
import { getCourseById } from "@/query/getCourseById";
import React from "react";
import { useParams } from "react-router-dom";

function EditCourseCard() {
  const { id } = useParams();
  const { data } = getCourseById(id);
  const CourseData = data?.data;
  console.log("Get Course by Id", CourseData);
  return (
    <div className="w-full">
      <CourseForm />
    </div>
  );
}

export default EditCourseCard;
