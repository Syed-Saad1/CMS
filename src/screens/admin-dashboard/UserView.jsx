import React, { useTransition } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUserById } from "@/query/getUserById";
import { editUserData } from "@/mutations/editUserData";
import UpdateRole from "@/components/UpdateRole";
import AllUserUpdateProfile from "@/components/AllUserUpdateProfile";
import PriviewProfileCard from "@/components/AllUserPriviewProfileCard";
import toast from "react-hot-toast";
import DeleteUserAccount from "@/components/DeleteUserAccount";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import TeacherAssigned from "@/components/TeacherAssigned";
import axios from "axios";

function UserView() {
  const { id } = useParams();
  const { t } = useTransition();
  const { data, isLoading } = getUserById(id);

  const UserProfileData = data?.data;

  const ValidationScheme = Yup.object({
    firstName: Yup.string().required("First name is required"),
    role: Yup.string()
      .oneOf(["admin", "user", "teacher"])
      .required("Role is required"),
  });

  const initialValues = {
    email: UserProfileData?.email || "",
    firstName: UserProfileData?.firstName || "",
    lastName: UserProfileData?.lastName || "",
    role: UserProfileData?.role || "user",
  };

  const { mutateAsync, isPending: isUpdating } = editUserData(id);

  const onSubmit = async (values) => {
    try {
      const payload = {
        bio: values.bio,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      };

      const res = await mutateAsync(payload);

      toast.success(res?.message || "Update User Data Successfully");
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

  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: ValidationScheme,
      onSubmit,
    });

  const UserRole = Cookies.get("role");
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,24%)_minmax(0,1fr)] gap-6 justify-center items-start p-3 sm:p-4 w-full min-w-0 min-h-full md:mb-4 mb-18">
      <PriviewProfileCard user={UserProfileData} isLoading={isLoading} />

      <div className="flex flex-col gap-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="justify-center  gap-10 h-full w-full"
        >
          <AllUserUpdateProfile
            values={values}
            isLoading={isLoading}
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            isUpdating={isUpdating}
          />
        </form>

        {!isLoading ? (
          UserRole === "admin" && (
            <UpdateRole userRole={UserProfileData?.role} />
          )
        ) : (
          <Card className="flex h-fit min-h-62 w-full flex-col gap-y-4 px-4 py-2 pb-4 sm:px-6">
            <div>
              <Skeleton className="h-5 w-28 rounded-md" />

              <Skeleton className="h-4 w-104 max-w-full mt-2 rounded-md" />
              <Skeleton className="h-4 w-96 max-w-full mt-1 rounded-md" />

              <hr className="mt-2" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mt-5 w-full max-w-120">
                <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </Card>

                <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </Card>

                <Card className="relative min-h-26 w-full flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </Card>
              </div>

              <div className="flex justify-end items-end">
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </div>
          </Card>
        )}

        <DeleteUserAccount />
      </div>
    </div>
  );
}

export default UserView;
