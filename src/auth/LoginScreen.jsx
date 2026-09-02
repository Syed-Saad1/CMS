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
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";

import { Icon } from "@iconify/react";

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
  const url = "http://192.168.100.22:3000/api/auth/login";

  const onSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await axios.post(url, values);
      localStorage.setItem("token", response.data.accessToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Server error occurred");
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
        <div className=" lg:h-screen lg:mt-0 mt-20 flex flex-col justify-center items-center">
          <Card
            className={` ${errors.email || errors.password ? "h-110!" : "h-100!"} min-w-90 md:w-110 lg:px-0 px-4`}
          >
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
              <CardTitle className="font-inter text-3xl font-bold">
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
                  <Link className="text-[#180289] font-semibold text-xs md:text-sm">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button
                className="mt-6 w-full bg-[#180289] text-base hover:bg-blue-900 h-12!"
                type="submit"
                variant={"default"}
                disabled={isloading}
              >
                {isloading ? <Icon icon="line-md:loading-loop" /> : "Sign in"}
              </Button>
              <p className="text-center text-xs md:text-sm text-gray-500 font-medium mt-4 cursor-pointer">
                Don't have an account?{" "}
                <Link to={"/auth/signup"} className="text-[#180289]">
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
