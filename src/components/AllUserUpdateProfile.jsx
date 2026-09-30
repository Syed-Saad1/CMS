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
import { Skeleton } from "./ui/skeleton";
function AllUserUpdateProfile({
  values,
  errors,
  handleChange,
  isUpdating,
  isLoading,
}) {
  return (
    <div>
      {isLoading ? (
        <Card className="flex flex-col w-full h-76! gap-y-4 px-6 py-6 pb-4">
          <div>
            <Skeleton className="h-5 w-44 rounded-md" />

            <Skeleton className="h-4 w-80 mt-2 rounded-md" />

            <hr className="mt-4" />
          </div>

          <CardContent className="mt-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Field>
                <Skeleton className="h-4 w-20 mb-2 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </Field>

              <Field>
                <Skeleton className="h-4 w-20 mb-2 rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </Field>
            </div>

            <Field className="mt-4">
              <Skeleton className="h-4 w-12 mb-2 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </Field>
          </CardContent>

          <CardFooter className="pb-5 flex justify-end gap-2">
            <Skeleton className="h-9 w-28 rounded-md" />
          </CardFooter>
        </Card>
      ) : (
        <div>
          <Card className="flex flex-col w-full h-76! gap-y-4 px-6 py-6 pb-4">
            <div>
              <CardTitle className={"text-lg"}>Personal Information</CardTitle>

              <CardDescription className="mt-1">
                Update your basic profile details and contact information.
              </CardDescription>

              <hr className="mt-4" />
            </div>

            <CardContent className="mt-2">
              <div className="grid grid-cols-2 items-center gap-4">
                <Field>
                  <Label htmlFor="firstName">First Name:</Label>

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
                  <Label htmlFor="lastName">Last Name:</Label>

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
                <Label htmlFor="email">Email</Label>

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
