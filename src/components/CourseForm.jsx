import React, { useEffect, useRef, useState } from "react";
import { Card, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { FieldDescription } from "./ui/field";
import { Textarea } from "./ui/textarea";
import MultiSelect from "@/container/MultiSelect";
import MarkdownEditor from "@/container/MarkDown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { ImagePlus, Loader, Plus, Save, Upload, X } from "lucide-react";
import TimeRangePicker from "./TimePicker";
import { createCourse } from "@/mutations/createCourse";
import { editCourse } from "@/mutations/editCourse";
import { getCourseById } from "@/query/getCourseById";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "react-i18next";
import axios from "axios";

const options = [
  { value: "Programing", label: "Programing" },
  { value: "Design", label: "Design" },
  { value: "E-Commerce", label: "E-Commerce" },
  { value: "Devlopment", label: "Devlopment" },
  { value: "AI(Artifical Intelligence)", label: "AI(Artifical Intelligence)" },
  { value: "React", label: "React" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Finance", label: "Finance" },
  { value: "Marketing", label: "Marketing" },
  { value: "DataScience", label: "Data Science" },
  { value: "DataScience", label: "Data Science" },
];
const Daysoptions = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];
function CourseForm({ isEditPending, editCourseMutation, courseId }) {
  const { t } = useTranslation();
  const [courseOverview, setCourseOverview] = useState("");
  const navigate = useNavigate();
  const ImgRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { id } = useParams();

  const isEdit = Boolean(id);

  const { mutateAsync: createCourseMutation, isPending: isCreatePending } =
    createCourse();

  const {
    data: courseData,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = getCourseById(id);

  const isPending = isCreatePending || isEditPending;

  const initialValues = {
    tags: courseData?.data?.tags || [],
    courseDays: courseData?.data?.courseDays || [],
    title: courseData?.data?.title || "",
    description: courseData?.data?.description || "",
    price: courseData?.data?.price || "",
    category: courseData?.data?.category || "",
    content: courseData?.data?.content || "",
    thumbnail: courseData?.data?.thumbnail || null,

    courseTime: {
      startTime: "",
      endTime: "",
    },
  };

  const ValidationScheme = Yup.object({
    title: Yup.string().trim().required(t("ui.courseTitleRequired")),

    description: Yup.string()
      .trim()
      .required(t("ui.courseDescriptionRequired")),

    price: Yup.string().required(t("ui.coursePriceRequired")),
  });

  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: ValidationScheme,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });

  async function onSubmit(values, { resetForm }) {
    if (isEdit) {
      await editCourseMutation({ courseId, ...values });
    } else {
      await createCourseMutation(values);
    }
    try {
      const payload = {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        content: values.content,
        thumbnail: values.thumbnail,
        tags: values.tags,
        courseDays: values.courseDays,
        courseTime: values.courseTime.startTime,
        courseTime: values.courseTime.endTime,
      };

      await editCourseMutation(payload);
      const formData = new FormData();

      formData.append("tags", JSON.stringify(values.tags || []));

      formData.append("courseDays", JSON.stringify(values.courseDays || []));

      formData.append("title", values?.title);

      formData.append("description", values.description);

      formData.append("price", values.price);

      formData.append("category", values.category || "");

      formData.append("content", values.content || "");

      formData.append(
        "courseTime",
        JSON.stringify(
          values.courseTime || {
            startTime: "",
            endTime: "",
          },
        ),
      );

      navigate("/courses");

      if (isEdit === false) {
        const CreateCourse = await createCourseMutation(formData);
        const CreateResult = CreateCourse;
        console.log("Error", CreateResult);
        toast.success(createCourse?.message || t("ui.courseCreateSuccess"));
      } else {
        const EditResponse = await editCourseMutation(formData);

        const Editresult = EditResponse;

        toast.success(Editresult?.message || t("ui.courseUpdateSuccess"));
      }
      resetForm();

      if (values.thumbnail instanceof File) {
        formData.append("thumbnail", values.thumbnail);
      }

      for (const [key, value] of formData.entries()) {
      }

      if (thumbnail?.preview && !thumbnail?.existing) {
        URL.revokeObjectURL(thumbnail.preview);
      }

      setThumbnail(null);

      if (ImgRef.current) {
        ImgRef.current.value = "";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || t("messages.somethingWrong"),
        );
      } else {
        toast.error(t("messages.somethingWrong"));
      }
    }
  }

  const handleThumbnailFile = (file) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert(t("ui.imageTypes"));
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(t("ui.imageSize"));
      return;
    }

    if (thumbnail?.preview && !thumbnail?.existing) {
      URL.revokeObjectURL(thumbnail.preview);
    }

    const preview = URL.createObjectURL(file);

    setThumbnail({
      file,
      preview,
      existing: false,
    });

    setFieldValue("thumbnail", file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    handleThumbnailFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleThumbnailFile(file);
  };

  const handleRemoveThumbnail = () => {
    if (thumbnail?.preview && !thumbnail?.existing) {
      URL.revokeObjectURL(thumbnail.preview);
    }

    setThumbnail(null);

    setFieldValue("thumbnail", null);

    if (ImgRef.current) {
      ImgRef.current.value = "";
    }
  };
  return (
    <>
      <form
        className="w-full min-w-0 min-h-full px-3 sm:px-6 mt-4 md:mb-6 mb-18
    "
        onSubmit={handleSubmit}
      >
        {isCourseLoading ? (
          <div className="w-full min-w-0 grid grid-cols-1 xl:grid-cols-[minmax(0,68fr)_minmax(0,30fr)] items-start justify-center gap-6">
            <Card className="flex flex-col w-full py-6 px-4 overflow-hidden">
              <div>
                <Skeleton className="h-8 w-52" />
                <Skeleton className="h-4 w-72 mt-2" />
              </div>

              <Skeleton className="h-px w-full mt-4" />

              <div className="mt-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full mt-2 rounded-md" />
              </div>

              <div className="mt-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-24 w-full mt-2 rounded-md" />
              </div>

              <Card className="grid grid-cols-2 mt-4 items-center w-full gap-4 p-4">
                <div>
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-full mt-2 rounded-md" />
                </div>

                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full mt-2 rounded-md" />
                </div>

                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-full mt-2 rounded-md" />
                </div>

                <div>
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-8 w-full mt-2 rounded-md" />
                </div>
              </Card>

              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>

                <Skeleton className="h-64 w-full rounded-md" />
              </div>

              <div className="flex items-center justify-end gap-4 mt-4">
                <Skeleton className="h-10 w-24 rounded-md" />
                <Skeleton className="h-10 w-36 rounded-md" />
              </div>
            </Card>

            <div>
              <Card className="flex flex-col py-8 px-6 h-fit">
                <Skeleton className="h-6 w-44" />

                <div className="space-y-2 mt-6">
                  <Skeleton className="h-64 w-full rounded-lg" />
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="w-full min-w-0 grid grid-cols-1 xl:grid-cols-[minmax(0,68fr)_minmax(0,30fr)] items-start justify-center gap-6">
            {" "}
            <Card className="flex min-w-0 flex-col w-full py-6 px-4">
              <div>
                <h1 className="text-dashboard-foreground text-2xl font-extrabold">
                  {location.pathname === "/courses-create"
                    ? " Create New Course"
                    : "Edit Course"}
                </h1>

                <p className="text-muted-foreground text-sm mt-1">
                  {location.pathname === "/courses-create"
                    ? "Add a new educational module to the portal."
                    : "Update your course information."}
                </p>
              </div>
              <hr className="mt-4" />

              <div className="mt-4">
                <Label htmlFor="Tit">
                  Course Title <span className="text-blue-500">*</span>
                </Label>

                <Input
                  value={values?.title}
                  onChange={handleChange}
                  name="title"
                  className={"mt-2"}
                  type="text"
                  id="Tit"
                  placeholder={t("ui.titleExample")}
                />

                {errors?.title && (
                  <FieldDescription>{errors.title}</FieldDescription>
                )}
              </div>

              <div className="mt-4">
                <Label htmlFor="des">
                  Description <span className="text-blue-500">*</span>
                </Label>

                <Textarea
                  value={values?.description}
                  onChange={handleChange}
                  id="des"
                  name="description"
                  className="mt-2 text-xs h-24! overflow-x-scroll overflow-y-scroll"
                  placeholder={t("ui.descriptionExample")}
                />

                {errors?.description && (
                  <FieldDescription>{errors.description}</FieldDescription>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 items-center justify-center w-full gap-4">
                <div>
                  <Label htmlFor="Pri">
                    Course Pricing <span className="text-blue-500">*</span>
                  </Label>

                  <Input
                    value={values?.price}
                    id="Pri"
                    onChange={handleChange}
                    name="price"
                    placeholder={t("ui.priceExample")}
                    type="number"
                    className="h-8 mt-2"
                  />

                  {errors?.price && (
                    <FieldDescription>{errors.price}</FieldDescription>
                  )}
                </div>
                <div>
                  <Label htmlFor="tags">
                    Course Tag <span className="text-destructive">*</span>
                  </Label>{" "}
                  <MultiSelect
                    name="tags"
                    className="h-8! w-full!"
                    value={values?.tags}
                    options={options}
                    onChange={(tags) => setFieldValue("tags", tags)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-4 w-full justify-start items-start">
                <div className="w-full">
                  {" "}
                  <Label htmlFor="ClassDays">
                    Class Days <span className="text-destructive">*</span>
                  </Label>{" "}
                  <MultiSelect
                    name="ClassDays"
                    className="h-14! bg-transparent "
                    value={values?.courseDays}
                    options={Daysoptions}
                    onChange={(courseDays) =>
                      setFieldValue("courseDays", courseDays)
                    }
                  />
                </div>
                <div className="w-full">
                  {" "}
                  <TimeRangePicker
                    value={values?.courseTime}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </div>
              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Course Overview <span className="text-destructive">*</span>
                  </label>

                  <span className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                    Markdown
                  </span>
                </div>

                <MarkdownEditor
                  value={values?.courseOverview}
                  onChange={setCourseOverview}
                  placeholder={`## Course Overview

Describe what students will learn in this course...

### What you'll learn

- Topic one
- Topic two
- Topic three`}
                />
              </div>
              <div className="flex items-center justify-end gap-4 mt-4">
                <Link to="/courses">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-sm px-4"
                  >
                    <X />
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  variant="button"
                  className="text-sm w-38"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader className="size-4 animate-spin" />
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      {isEdit ? (
                        <Save className="size-4" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                      {isEdit ? "Update Course" : "Create Course"}
                    </>
                  )}
                </Button>
              </div>
            </Card>
            <div>
              <Card className="flex flex-col py-8 px-6 h-fit">
                <CardTitle className="text-xl">
                  {t("ui.courseThumbnail")}
                </CardTitle>

                <div className="space-y-2 mt-6">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => ImgRef.current?.click()}
                    className={`
                   relative
                   flex
                   h-64
                   w-full
                   cursor-pointer
                   items-center
                   justify-center
                   overflow-hidden
                   rounded-lg
                   border-2
                   border-dashed
                   transition-all
                   ${
                     isDragging
                       ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                       : "border-[#b0adb4] dark:border-[#8b8694] bg-accent"
                   }
                 `}
                  >
                    {thumbnail ? (
                      <>
                        <img
                          src={thumbnail.preview}
                          alt="Course thumbnail preview"
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                          <div className="flex flex-col items-center text-white">
                            <ImagePlus className="size-8 mb-2" />

                            <span className="text-sm font-medium">
                              Change Thumbnail
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            handleRemoveThumbnail();
                          }}
                          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                        >
                          <X className="size-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center text-center px-4">
                        <div
                          className={`
                         mb-3 flex size-12 items-center justify-center rounded-full
                         ${
                           isDragging
                             ? "bg-blue-100 text-blue-600"
                             : "bg-muted text-muted-foreground"
                         }
                       `}
                        >
                          <Upload className="size-6" />
                        </div>

                        <span className="text-sm font-medium">
                          {isDragging
                            ? "Drop your thumbnail here"
                            : "Upload Course Thumbnail"}
                        </span>

                        <span className="mt-1 text-xs text-muted-foreground">
                          Drag & drop or click to browse
                        </span>

                        <span className="mt-2 text-xs text-gray-500">
                          PNG, JPG or WEBP • Max 5MB
                        </span>
                      </div>
                    )}

                    <input
                      ref={ImgRef}
                      id="thumbnail"
                      type="file"
                      name="thumbnail"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                  </div>

                  {errors.thumbnail && (
                    <FieldDescription>{errors.thumbnail}</FieldDescription>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}
      </form>
    </>
  );
}

export default CourseForm;
