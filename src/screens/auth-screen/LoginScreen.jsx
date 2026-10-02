import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription } from "@/components/ui/field";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

import { Icon } from "@iconify/react";
import Cookies from "js-cookie";

const ValidationScheme = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "password is at least 8 characters")
    .required("Password is Required"),
});
export const LoginScreen = () => {
  const [isloading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const url = `${import.meta.env.VITE_API_URL}/auth/login`;
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const userId = Cookies.get("userId");

  const navigate = useNavigate();
  if (token && role === "admin") {
    return <Navigate to={"/admin/dashboard"} replace />;
  }
  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await axios.post(url, values, {
        withCredentials: true,
      });
      console.log("Res", response);
      const role = response?.data?.data?.user?.role;
      const UserId = response?.data?.data?.user?._id;

      console.log("login-role", role);
      Cookies.set("token", response?.data?.data?.accessToken);
      Cookies.set("role", role);
      Cookies.set("userId", UserId);

      if (response.status === 200) {
        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (role === "user") {
          navigate("/user/dashboard", { replace: true });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.message || "Server error occurred");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: ValidationScheme,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="bg-background lg:h-screen lg:mt-0 mt-20 flex flex-col justify-center items-center">
          <Card className={cn("min-w-90 md:w-110 flex flex-col px-6! py-6!")}>
            <CardHeader>
              <Link
                className="lg:hidden flex justify-center items-center mb-4"
                to={"/"}
              >
                {" "}
                <img
                  className="  h-14! w-44  object-cover"
                  src="/logo.png"
                  alt=""
                />
              </Link>
              <CardTitle className="font-DmSans text-3xl font-bold">
                Welcome back
              </CardTitle>
              <CardDescription className="mt-1 text-base">
                Please enter your details to sign in.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-10">
              <Field>
                <Label>Email address</Label>
                <Input
                  className="mt-1"
                  name="email"
                  value={values.email}
                  placeholder="Enter Your Email"
                  type="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <FieldDescription>{errors.email}</FieldDescription>
                )}
              </Field>
              <Field className="mt-4">
                <Label>Password</Label>
                <Input
                  showTogglePassword={true}
                  className="mt-1"
                  name="password"
                  value={values.password}
                  placeholder="Enter Your Password"
                  onChange={handleChange}
                  type="password"
                />
                {errors.password && (
                  <FieldDescription>{errors.password}</FieldDescription>
                )}
              </Field>
            </CardContent>
            <CardFooter className="mt-7">
              <div className="flex justify-between items-center">
                <div className="flex items-center  gap-2">
                  {" "}
                  <Checkbox id="Con" />
                  <Label
                    className="text-gray-400 font-normal text-xs md:text-sm"
                    htmlFor="Con"
                  >
                    Remember me
                  </Label>
                </div>
                <div>
                  <Link className="text-primary font-semibold text-xs md:text-sm">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-primary text-base hover:bg-primary/90 h-12!"
                type="submit"
                variant={"default"}
                disabled={isloading}
              >
                {isloading ? <Icon icon="line-md:loading-loop" /> : "Sign in"}
              </Button>
              <p className="text-center text-xs md:text-sm text-gray-500 font-medium mt-4 cursor-pointer">
                Don't have an account?{" "}
                <Link to={"/auth/signup"} className="text-primary">
                  Contact Administrator
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </form>
  );
};
