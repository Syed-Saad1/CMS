import { Card, CardTitle } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { createCourse } from "@/mutations/createCourse";
import { editCourse } from "@/mutations/editCourse";
import { getCourseById } from "@/query/getCourseById";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ImagePlus, Upload, X } from "lucide-react";
import CourseForm from "@/container/CourseForm";

function AdminCreateCourse() {
  return (
    <>
      <CourseForm />{" "}
    </>
  );
}

export default AdminCreateCourse;
