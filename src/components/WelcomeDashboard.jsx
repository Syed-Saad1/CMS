import { getUserById } from "@/query/getUserById";
import React from "react";
import Cookies from "js-cookie";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
function WelcomeDashboard() {
  const hours = new Date().getHours();
  let greeting = "Good evening";
  const Role = Cookies.get("role");

  if (hours >= 5 && hours < 12) {
    greeting = "Good morning";
  } else if (hours >= 12 && hours < 16) {
    greeting = "Good afternoon";
  } else if (hours >= 16 && hours < 21) {
    greeting = "Good evening";
  } else {
    greeting = "Good Night";
  }
  const userId = Cookies.get("userId");
  const { data, isLoading } = getUserById(userId);
  const ProfileData = data?.data;
  const name = ProfileData?.firstName + " " + ProfileData?.lastName;
  return (
    <div>
      {isLoading ? (
        <Card className="flex flex-col dark:bg-[url('/WelcomeCardImageDark.jpeg')] bg-[url('/WelcomeCardImageLight.jpeg')] bg-cover bg-no-repeat p-6 h-fit">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <Skeleton className="h-10 w-64 rounded-md" />

              <Skeleton className="h-7 w-52 rounded-md mt-2" />

              <Skeleton className="h-5 w-full max-w-xl rounded-md mt-2" />

              <Skeleton className="h-10 w-32 rounded-md mt-4" />
            </div>

            <div className="flex gap-2 justify-center">
              {Role === "user" && <Skeleton className="size-40 rounded-md" />}

              <Skeleton className="size-40 rounded-md" />
            </div>
          </div>
        </Card>
      ) : (
        <Card className="flex flex-col dark:bg-[url('/WelcomeCardImageDark.jpeg')] bg-[url('/WelcomeCardImageLight.jpeg')] bg-cover bg-no-repeat p-6 h-fit">
          {" "}
          <div className="flex justify-between items-center">
            {" "}
            <div>
              {" "}
              <CardTitle className="text-4xl font-bold">
                {greeting},👋
              </CardTitle>{" "}
              <CardDescription className={"text-xl mt-1"}>
                {" "}
                Welcome Back, {name}{" "}
              </CardDescription>{" "}
              <CardDescription className={"text-sm mt-1 text-muted-foreground"}>
                {" "}
                Here's Whats happening with your course managment system today.
                keep up the great work!{" "}
              </CardDescription>{" "}
              <Link to="/admin/courses">
                {" "}
                <Button variant="button" className="w-fit mt-4">
                  {" "}
                  View Courses <ArrowRight />{" "}
                </Button>{" "}
              </Link>{" "}
            </div>{" "}
            <div className="flex gap-2 justify-center">
              {" "}
              {Role === "user" && (
                <img className="size-40" src="/Cap.png" alt="" />
              )}{" "}
              <img
                className="size-40 object-contain"
                src="/Book.png"
                alt=""
              />{" "}
            </div>{" "}
          </div>{" "}
        </Card>
      )}
    </div>
  );
}

export default WelcomeDashboard;
