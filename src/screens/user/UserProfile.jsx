import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";

import { getUserById } from "@/query/getUserById";
import { editUserData } from "@/mutations/editUserData";

import UpdateRole from "@/components/UpdateRole";
import AllUserUpdateProfile from "@/components/AllUserUpdateProfile";
import PriviewProfileCard from "@/components/AllUserPriviewProfileCard";

import toast from "react-hot-toast";
import DeleteUserAccount from "@/components/DeleteUserAccount";
import UpdatePassword from "@/container/UpdatePassword";

function AdminProfile() {
  const userId = Cookies.get("userId");
  const { data, isLoading, isError, error } = getUserById(userId);
  const UserProfileData = data?.data;
  const ValidationScheme = Yup.object({
    firstName: Yup.string().required("First name is required"),
    role: Yup.string()
      .oneOf(["admin", "user", "teacher"])
      .required("Role is required"),
  });
  const initialValues = {
    firstName: UserProfileData?.firstName || "",
    lastName: UserProfileData?.lastName || "",
    email: UserProfileData?.email || "",
    bio: UserProfileData?.bio || "",
    role: UserProfileData?.role || "user",
  };
  const { mutateAsync, isPending: isUpdating } = editUserData(userId);
  const onSubmit = async (values) => {
    try {
      const payload = {
        bio: values.bio,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        role: values.role,
      };
      await mutateAsync(payload);
      toast.success("Update User Data Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update user");
    }
  };
  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: ValidationScheme,
      onSubmit,
    });
  if (!userId) {
    return (
      <div className="p-4 text-red-500">
        User ID not found. Please login again.
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Failed to Load User: {error?.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,24%)_minmax(0,1fr)] gap-4 justify-center items-start p-3 sm:p-4 w-full min-w-0 md:mb-4 mb-18">
      <PriviewProfileCard user={UserProfileData} isLoading={isLoading} />
      <div className="flex flex-col gap-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="justify-center  gap-10 h-full w-full"
        >
          <AllUserUpdateProfile
            values={values}
            errors={errors}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            isUpdating={isUpdating}
          />
        </form>
        <UpdatePassword />{" "}
      </div>
    </div>
  );
}

export default AdminProfile;
