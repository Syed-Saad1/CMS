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
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { useSignup } from "@/mutations/useSignup";
import { useTranslation } from "react-i18next";

export const SignupScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ValidationScheme = Yup.object({
    firstName: Yup.string()
      .max(8, t("auth.firstNameMax"))
      .min(3, t("auth.firstNameMin"))
      .required(t("auth.firstNameRequired")),
    lastName: Yup.string()
      .max(8, t("auth.lastNameMax"))
      .min(3, t("auth.lastNameMin"))
      .required(t("auth.lastNameRequired")),
    email: Yup.string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    password: Yup.string()
      .min(8, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
    confrimpassword: Yup.string()
      .required(t("auth.passwordRequired"))
      .oneOf([Yup.ref("password")], t("auth.passwordsMatch")),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confrimpassword: "",
  };
  const { mutateAsync, isPending } = useSignup();
  const token = Cookies.get("token");
  console.log("GetToken", token);
  const role = Cookies.get("role");
  console.log("GetRole", role);

  if (token) {
    return (
      <Navigate
        to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
        replace
      />
    );
  }
  const onSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      const response = await mutateAsync(payload);

      const result = response;

      if (result?.success !== true) {
        toast.error(result?.message || t("auth.registrationFailed"));
        return;
      }

      const accessToken = result?.data?.accessToken;
      const role = result?.data?.user?.role;
      const userId = result?.data?.user?._id;
      console.log("Result", result?.data);
      console.log("GetId", userId);
      if (!accessToken || !["admin", "user"].includes(role)) {
        toast.error(t("auth.registrationFailed"));
        return;
      }

      Cookies.set("token", accessToken);
      Cookies.set("role", role);
      Cookies.set("userId", userId);

      toast.success(result?.message || t("auth.accountCreated"));

      resetForm();

      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "user") {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Signup Error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || t("messages.somethingWrong"),
        );
      } else {
        toast.error(t("messages.somethingWrong"));
      }
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
    <form className="h-full" onSubmit={handleSubmit}>
      <div className="h-full! mt-0 flex flex-col justify-center items-center">
        <Card
          className={cn(
            "w-[calc(100%-2rem)]  h-full overflow-hidden overflow-y-auto max-w-110 min-w-0 flex flex-col p-6!",
          )}
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
            <CardTitle className="text-xl md:text-3xl font-bold">
              Create Account{" "}
            </CardTitle>
            <CardDescription className="mt-1 lg:text-sm text-xs ">
              Enter your details to register for the platform{" "}
            </CardDescription>
          </CardHeader>
          <CardContent className="md:mt-10 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <Label>{t("auth.firstName")}</Label>
                <Input
                  className=" h-9!"
                  name="firstName"
                  placeholder={t("auth.enterFirstName")}
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                />{" "}
                {errors.firstName && (
                  <FieldDescription>{errors.firstName}</FieldDescription>
                )}
              </Field>

              <Field>
                <Label>{t("auth.lastName")}</Label>
                <Input
                  className="h-9!"
                  name="lastName"
                  placeholder={t("auth.enterLastName")}
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
              <Label>{t("auth.institutionalEmail")}</Label>
              <Input
                className="mt-1 h-9!"
                name="email"
                placeholder={t("auth.enterEmail")}
                type="email"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <FieldDescription>{errors.email}</FieldDescription>
              )}
            </Field>
            <Field className="mt-4">
              <Label>{t("auth.password")}</Label>
              <Input
                className="mt-1 h-9!"
                showTogglePassword={true}
                name="password"
                placeholder={t("auth.enterPassword")}
                type="password"
                value={values.password}
                onChange={handleChange}
              />
              {errors.password && (
                <FieldDescription>{errors.password}</FieldDescription>
              )}
            </Field>
            <Field className="mt-4">
              <Label>{t("auth.confirmPassword")}</Label>
              <Input
                className="mt-1 h-9!"
                showTogglePassword={true}
                name="confrimpassword"
                placeholder={t("auth.retypePassword")}
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
              className="mt-6 w-full bg-primary text-primary-foreground text-base hover:bg-primary/80 h-12!"
              variant={"default"}
              disabled={isPending}
            >
              {isPending ? (
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
