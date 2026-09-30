import React from "react";
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

function UserView() {
  const { id } = useParams();

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

      toast.success("Update User Data Successfully");
    } catch (error) {
      console.error("Update user error:", error);
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
    <div className="grid grid-cols-[24%_74%] gap-6 justify-center items-start p-4 w-full h-full">
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
          <Card className="flex flex-col w-full h-62! gap-y-4 px-6 py-2 pb-4">
            <div>
              <Skeleton className="h-5 w-28 rounded-md" />

              <Skeleton className="h-4 w-104 mt-2 rounded-md" />
              <Skeleton className="h-4 w-96 mt-1 rounded-md" />

              <hr className="mt-2" />

              <div className="grid grid-cols-1 md:grid-cols-3 mt-5 w-120 gap-3">
                <Card className="relative min-h-26 w-38 flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </Card>

                <Card className="relative min-h-26 w-38 flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
                  <Skeleton className="size-10 rounded-full" />
                  <Skeleton className="h-4 w-16 rounded-md" />
                </Card>

                <Card className="relative min-h-26 w-38 flex flex-col items-center justify-center gap-2 p-5 rounded-xl">
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
