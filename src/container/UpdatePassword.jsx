import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdatePassword } from "@/mutations/useUpdatePassword";
import axios from "axios";
import { useFormik, validateYupSchema } from "formik";
import Cookies from "js-cookie";
import { Loader } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

function UpdatePassword() {
  const Navigate = useNavigate();
  const id = Cookies.get("userId");
  const { mutateAsync, isPending, isLoading } = useUpdatePassword(id);
  const ValidationScheme = Yup.object({
    currentPassword: Yup.string().required("currentPassword is required"),
    newPassword: Yup.string()
      .required("newPassword is required")
      .min(8, "password is at least 8 Character"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Passwords must match",
    ),
  });
  const intailValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const onSubmit = async (values) => {
    try {
      const payload = {
        currentPassword: values?.currentPassword,
        newPassword: values?.newPassword,
      };
      const Response = await mutateAsync(payload);
      const result = Response;
      if (Response.success === 200) {
        toast.success(result?.message || "Password updated successfully");
      }
      Navigate("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.message || "Server error occurred");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
    }
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: intailValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: ValidationScheme,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <Card className="border border-border p-4 md:mb-4 mb-18 h-full flex flex-col">
          <Skeleton className="h-7 w-44" />

          <Skeleton className="mt-2 h-4 w-105 max-w-full" />

          <Skeleton className="mt-4 h-px w-full" />

          <div className="mt-6 grid grid-cols-1 gap-4">
            <div>
              <Skeleton className="mb-2 h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
              <div>
                <Skeleton className="mb-2 h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div>
                <Skeleton className="mb-2 h-4 w-36" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </Card>
      ) : (
        <Card
          className={
            "border border-border p-4 md:mb-4 mb-10 h-full flex flex-col"
          }
        >
          <CardTitle className={"text-xl font-bold"}>Update Password</CardTitle>
          <CardDescription>
            Ensure your account is using a long, random password to stay
            secure{" "}
          </CardDescription>
          <hr className="mt-2" />
          <div className="mt-4 grid grid-cols-1 gap-4">
            {" "}
            <div>
              {" "}
              <Field>
                {" "}
                <Label>current Password :</Label>
                <Input
                  showTogglePassword={true}
                  type={"password"}
                  value={values.currentPassword}
                  onChange={handleChange}
                  name="currentPassword"
                  placeholder="Enter Your currentPassword"
                />
                {errors?.currentPassword && (
                  <p className="text-sm text-red-500 ">
                    {errors.currentPassword}
                  </p>
                )}
              </Field>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-4">
              <Field>
                {" "}
                <Label>New Password :</Label>
                <Input
                  showTogglePassword={true}
                  type={"password"}
                  value={values.newPassword}
                  onChange={handleChange}
                  name="newPassword"
                  placeholder="Enter Your new Password"
                />
                {errors?.newPassword && (
                  <p className="text-sm text-red-500 ">{errors.newPassword}</p>
                )}
              </Field>
              <Field>
                {" "}
                <Label>Confirm Password :</Label>
                <Input
                  name={"confirmPassword"}
                  type={"password"}
                  showTogglePassword={true}
                  placeholder="Re-type You're New Password"
                />
                {errors?.confirmPassword && (
                  <p className="text-sm text-red-500 ">
                    {errors.confirmPassword}
                  </p>
                )}
              </Field>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit" variant="button">
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </Card>
      )}
    </form>
  );
}

export default UpdatePassword;
