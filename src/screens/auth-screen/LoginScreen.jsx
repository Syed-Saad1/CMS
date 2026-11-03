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
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import { cn, getDashboardPath } from "@/lib/utils";
import { Icon } from "@iconify/react";
import Cookies from "js-cookie";
import { useLogin } from "@/mutations/useLogin";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "@/mutations/useGoogleAuthentication";
export const LoginScreen = () => {
  const { t } = useTranslation();
  const ValidationScheme = Yup.object({
    email: Yup.string()
      .email(t("auth.invalidEmail"))
      .required(t("auth.emailRequired")),
    password: Yup.string()
      .min(8, t("auth.passwordMin"))
      .required(t("auth.passwordRequired")),
  });
  const initialValues = {
    email: "",
    password: "",
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        email: values.email,
        password: values.password,
      };
      const response = await mutateAsync(payload);
      const result = response;
      const userRole = response?.data?.user?.role;
      const userId = response?.data?.user?._id;
      const accessToken = response?.data?.accessToken;
      toast.success(result?.message || t("auth.accountCreated"));
      if (response?.success === true) {
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else if (userRole === "user") {
          navigate("/user/dashboard");
        }
      }
      Cookies.set("token", accessToken);
      Cookies.set("role", userRole);
      Cookies.set("userId", userId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || t("messages.somethingWrong"),
        );
      } else {
        toast.error(t("messages.somethingWrong"));
      }
    } finally {
      resetForm();
    }
  };

  const GoogleAuth = async (response) => {
    try {
      const credential = response.credential;

      if (!credential) {
        throw new Error("Google ID token not received");
      }

      const result = await googleLogin(credential);

      const { user, accessToken } = result.data || {};

      if (!user || !accessToken) {
        throw new Error("Invalid backend response");
      }

      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      navigate(getDashboardPath(user.role), {
        replace: true,
      });
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Google login failed",
      );
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
        <div className=" lg:h-full bg-transparent lg:mt-0 mt-20 flex flex-col justify-center items-center">
          <Card
            className={cn(
              "w-[calc(100%-2rem)] max-w-110 min-w-0 flex flex-col px-6! py-6!",
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
              <CardTitle className="font-DmSans md:text-3xl text-xl font-bold">
                {t("auth.welcomeBack")}
              </CardTitle>
              <CardDescription className=" md:text-sm text-xs">
                {t("auth.signInPrompt")}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-10">
              <Field>
                <Label>{t("auth.emailAddress")}</Label>
                <Input
                  className="mt-1"
                  name="email"
                  value={values.email}
                  placeholder={t("auth.enterEmail")}
                  type="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <FieldDescription>{errors.email}</FieldDescription>
                )}
              </Field>
              <Field className="mt-4">
                <Label>{t("auth.password")}</Label>
                <Input
                  showTogglePassword={true}
                  className="mt-1"
                  name="password"
                  value={values.password}
                  placeholder={t("auth.enterPassword")}
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
                className="mt-6 w-full bg-primary text-primary-foreground text-base hover:bg-primary/90 h-12!"
                type="submit"
                variant={"default"}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    {" "}
                    <Icon icon="line-md:loading-loop" /> Signin...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
              <div className="mt-2 mx-4">
                {" "}
                <GoogleLogin
                  className={
                    "w-full flex items-center justify-center bg-accent gap-2 py-2 rounded-sm"
                  }
                  onError={() => setError("Google login failed")}
                  onSuccess={GoogleAuth}
                />
              </div>
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
