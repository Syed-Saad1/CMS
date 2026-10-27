import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import UpdateProfileSkeleton from "@/skeleton/UpdateProfileSkeleton";
function AllUserUpdateProfile({
  values,
  errors,
  handleChange,
  isUpdating,
  isLoading,
}) {
  const { t } = useTranslation();
  return (
    <div>
      {isLoading ? (
        <UpdateProfileSkeleton />
      ) : (
        <div>
          <Card className="flex border border-border flex-col w-full h-fit! gap-y-4 px-6 py-6 pb-4">
            <div>
              <CardTitle className={"text-lg"}>
                {t("ui.personalInfo")}
              </CardTitle>

              <CardDescription className="mt-1">
                Update your basic profile details and contact information.
              </CardDescription>

              <hr className="mt-4" />
            </div>

            <CardContent className="mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <Field>
                  <Label htmlFor="firstName">{t("ui.firstName")}</Label>

                  <Input
                    id="firstName"
                    name="firstName"
                    className="w-full"
                    type="text"
                    onChange={handleChange}
                    value={values?.firstName}
                  />

                  {errors?.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </Field>

                <Field>
                  <Label htmlFor="lastName">{t("ui.lastName")}</Label>

                  <Input
                    id="lastName"
                    name="lastName"
                    className="w-full"
                    type="text"
                    onChange={handleChange}
                    value={values?.lastName}
                  />
                </Field>
              </div>

              <Field className="mt-4">
                <Label htmlFor="email">{t("ui.email")}</Label>

                <Input
                  id="email"
                  name="email"
                  className="w-full"
                  type="email"
                  value={values?.email}
                  readOnly
                />
              </Field>
            </CardContent>

            <CardFooter className="pb-5 flex justify-end gap-2">
              <Button type="submit" variant="button" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader className="animate-spin" /> Saving..
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

export default AllUserUpdateProfile;
