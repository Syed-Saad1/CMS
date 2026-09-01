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
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
const ValidationScheme = Yup.object({
  firstName: Yup.string()
    .max(8, "firstName is maximum 8 letters")
    .min(3, "firstName is at least 3 letters")
    .required("firstName is Required"),
  lastName: Yup.string()
    .max(8, "lastName is maximum 8 letters")
    .min(3, "lastName is at least 3 letters")
    .required("lastName is Required"),

  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is Required"),
  password: Yup.string()
    .min(8, "password is at least 8 characters")
    .required("Password is Required"),
  confrimpassword: Yup.string()
    .required("Password is Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export const SignupScreen = () => {
  const [isloading, setIsLoading] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confrimpassword: "",
  };

  const url = "https://courses-system-three.vercel.app/api/auth/register";

  const onSubmit = async (values, { resetForm }) => {
    try {
      setIsLoading(true);

      const response = await axios.post(url, values);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || "Server error occurred");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
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
      <div className="flex justify-center items-center">
        <Card>
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
              Create Account{" "}
            </CardTitle>
            <CardDescription className="mt-1 text-base">
              Enter your details to register for the platform{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-10">
            <div className=" grid grid-cols-2 gap-4">
              <Field>
                <Label>First Name</Label>
                <Input
                  className="mt-1"
                  name="firstName"
                  placeholder="Enter Your firstName"
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                />{" "}
                {errors.firstName && (
                  <FieldDescription>{errors.firstName}</FieldDescription>
                )}
              </Field>

              <Field>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Enter Your lastName"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <FieldDescription>{errors.lastName}</FieldDescription>
                )}
              </Field>
            </div>
            <Field className="mt-4">
              <Label>Institutional Email </Label>
              <Input
                className="mt-1"
                name="email"
                placeholder="Enter Your Email"
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <FieldDescription>{errors.email}</FieldDescription>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Password</Label>
              <Input
                className="mt-1"
                showTogglePassword={true}
                name="password"
                placeholder="Enter Your Password"
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <FieldDescription>{errors.password}</FieldDescription>
              )}
            </Field>
            <Field className="mt-4">
              <Label>Confirm Password</Label>
              <Input
                className="mt-1"
                showTogglePassword={true}
                name="confrimpassword"
                placeholder="Re-type Your Password"
                type="password"
                value={values.confrimpassword}
                onChange={handleChange}
              />
              {errors.confrimpassword && (
                <FieldDescription>{errors.confrimpassword}</FieldDescription>
              )}
            </Field>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="mt-6 w-full bg-[#180289] text-base hover:bg-blue-900 h-12!"
              variant={"default"}
              disabled={isloading}
            >
              {isloading ? (
                <Icon icon="line-md:loading-loop" />
              ) : (
                "Create Account"
              )}
              <Icon icon="akar-icons:arrow-right" />
            </Button>
            <p className="text-center text-sm text-gray-500 font-medium mt-4 cursor-pointer">
              Already have an account?{" "}
              <Link to={"/auth/login"} className="text-[#180289]">
                Log in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};

export default SignupScreen;
