import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import MultiSelect from "@/container/MultiSelect";
import { createCourse } from "@/mutations/createCourse";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ImagePlus, Loader, Plus, Upload, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function AdminCreateCourse() {
  const ImgRef = useRef(null);

  const [thumbnail, setThumbnail] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const { mutateAsync, isPending } = createCourse();
  const navigate = useNavigate();
  const ValidationScheme = Yup.object({
    tags: Yup.array()
      .min(1, "Select at least one tag")
      .required("Select Tag is Required"),

    title: Yup.string().trim().required("Course Title is Required"),

    description: Yup.string().trim().required("Course Description is Required"),

    price: Yup.string().required("Course Price is Required"),

    thumbnail: Yup.mixed().required("Course Thumbnail is Required"),
  });
  const initialValues = {
    tags: [],
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: null,
  };

  const handleThumbnailFile = (file, setFieldValue) => {
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PNG, JPG, JPEG or WEBP images are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Image size must be less than 5MB.");
      return;
    }

    const preview = URL.createObjectURL(file);

    setThumbnail({
      file,
      preview,
    });

    setFieldValue("thumbnail", file);
  };

  const handleThumbnailChange = (e, setFieldValue) => {
    const file = e.target.files?.[0];

    handleThumbnailFile(file, setFieldValue);
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

  const handleDrop = (e, setFieldValue) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    handleThumbnailFile(file, setFieldValue);
  };

  const handleRemoveThumbnail = (setFieldValue) => {
    if (thumbnail?.preview) {
      URL.revokeObjectURL(thumbnail.preview);
    }

    setThumbnail(null);

    setFieldValue("thumbnail", null);

    if (ImgRef.current) {
      ImgRef.current.value = "";
    }
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();

      formData.append("tags", JSON.stringify(values.tags));

      formData.append("title", values.title);

      formData.append("description", values.description);

      formData.append("price", values.price);

      formData.append("category", values.category);

      if (values.thumbnail) {
        formData.append("thumbnail", values.thumbnail);
      }

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await mutateAsync(formData);

      resetForm();
      if (thumbnail?.preview) {
        URL.revokeObjectURL(thumbnail.preview);
      }

      setThumbnail(null);

      if (ImgRef.current) {
        ImgRef.current.value = "";
      }
      toast.success("Course Create Succesfully");

      navigate(`/admin/courses`);
    } catch (error) {
      console.error("Create Course Error:", error);
      toast.error("Something Went Wrong");
    }
  };

  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: ValidationScheme,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit,
    });
  return (
    <form onSubmit={handleSubmit} className="h-full w-full mt-6 mx-10 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-dashboard-foreground text-2xl font-extrabold">
            Create New Course
          </h1>

          <p className="text-muted-foreground text-sm mt-1">
            Add a new educational module to the portal.
          </p>
        </div>
      </div>
      <div className="w-full grid grid-cols-[68%_30%] gap-6 mt-4">
        <Card className="flex flex-col w-full py-6 px-4">
          <CardTitle className="text-xl">Course Information</CardTitle>

          <hr className="mt-4" />

          <Field className="mt-4">
            <Label htmlFor="Tit">
              Course Title <span className="text-blue-500">*</span>
            </Label>

            <Input
              value={values.title}
              onChange={handleChange}
              name="title"
              type="text"
              id="Tit"
              placeholder="e.g., Introduction to Advanced Calculus"
            />

            {errors.title && (
              <FieldDescription>{errors.title}</FieldDescription>
            )}
          </Field>

          <Field className="mt-4">
            <Label htmlFor="des">
              Description <span className="text-blue-500">*</span>
            </Label>

            <Textarea
              value={values.description}
              onChange={handleChange}
              id="des"
              name="description"
              className="text-xs h-24! overflow-x-scroll overflow-y-scroll"
              placeholder="Provide a detailed overview of the curriculum and learning objectives..."
            />

            {errors.description && (
              <FieldDescription>{errors.description}</FieldDescription>
            )}
          </Field>

          <Card className="grid grid-cols-2 items-center gap-4 mt-6">
            <Field>
              <Label htmlFor="Pri">
                Course Pricing <span className="text-blue-500">*</span>
              </Label>

              <Input
                value={values.price}
                id="Pri"
                onChange={handleChange}
                name="price"
                placeholder="e.g. 500"
                type="number"
                className="h-8"
              />

              {errors.price && (
                <FieldDescription>{errors.price}</FieldDescription>
              )}
            </Field>
            <Field>
              <Label htmlFor="tags">
                Course Tag <span className="text-blue-500">*</span>
              </Label>

              <MultiSelect
                name="tags"
                className="h-10!"
                value={values.tags}
                onChange={(tags) => setFieldValue("tags", tags)}
              />

              {errors.tags && (
                <FieldDescription>{errors.tags}</FieldDescription>
              )}
            </Field>
          </Card>
          <div>
            <Field className={"mt-7"}>
              <Label htmlFor="tags">
                Course Overview <span className="text-blue-500">*</span>
              </Label>

              <Input className={"h-10 "} />

              {errors.tags && (
                <FieldDescription>{errors.tags}</FieldDescription>
              )}
            </Field>
          </div>
          <div className="flex items-center justify-end gap-4 mt-4">
            <Link to="/admin/courses">
              <Button type="button" variant="outline" className="text-sm px-4">
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
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create Course
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="flex flex-col py-8 px-6 h-full">
          <CardTitle className="text-xl">Course Thumbnail</CardTitle>

          <div className="space-y-2 mt-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, setFieldValue)}
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

                      handleRemoveThumbnail(setFieldValue);
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
                onChange={(e) => handleThumbnailChange(e, setFieldValue)}
                className="hidden"
              />
            </div>

            {errors.thumbnail && (
              <FieldDescription>{errors.thumbnail}</FieldDescription>
            )}
          </div>
        </Card>
      </div>
    </form>
  );
}

export default AdminCreateCourse;
