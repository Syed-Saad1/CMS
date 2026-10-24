import React, { useTransition } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getUserById } from "@/query/getUserById";
import { editUserData } from "@/mutations/editUserData";
import UpdateRole from "@/container/UpdateRole";
import AllUserUpdateProfile from "@/components/AllUserUpdateProfile";
import PriviewProfileCard from "@/container/AllUserPriviewProfileCard";
import toast from "react-hot-toast";
import DeleteUserAccount from "@/container/DeleteUserAccount";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import TeacherAssigned from "@/container/TeacherAssigned";
import axios from "axios";
import UpdateRoleSkeleton from "@/skeleton/UpdateRoleSkeleton";

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
          <UpdateRoleSkeleton />
        )}

        <DeleteUserAccount />
      </div>
    </div>
  );
}

export default UserView;
