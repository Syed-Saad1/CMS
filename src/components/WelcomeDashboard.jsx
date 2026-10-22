import { getUserById } from "@/query/getUserById";
import React from "react";
import Cookies from "js-cookie";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useTranslation } from "react-i18next";
function WelcomeDashboard() {
  const { t } = useTranslation();

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
      <Card
        className="flex flex-col dark:bg-[url('/WelcomeCardImageDark.jpeg')] bg-[url('/WelcomeCardImageLight.jpeg')] bg-cover bg-no-repeat px-4
      pt-2 sm:p-6 h-fit relative"
      >
        {" "}
        <div className="flex flex-col justify-between items-start gap-4 sm:flex-row sm:items-center">
          {" "}
          <div>
            {" "}
            <CardTitle className="text-2xl sm:text-4xl font-bold">
              {greeting},👋
            </CardTitle>{" "}
            <CardTitle
              className={"mt-1 flex min-w-0 items-center text-lg sm:text-xl"}
            >
              {" "}
              {t("AdminWel.title")}, {isLoading ? " * * * * *" : name}
            </CardTitle>{" "}
            <CardDescription className={"text-sm mt-1 text-muted-foreground"}>
              {t("AdminWel.des")}
            </CardDescription>{" "}
            <Link to="/courses">
              {" "}
              <Button variant="button" className="w-fit mt-4">
                {" "}
                {t("AdminWel.view")} <ArrowRight />{" "}
              </Button>{" "}
            </Link>{" "}
          </div>{" "}
          <div className="flex shrink-0 items-center justify-center gap-2 self-center sm:self-auto ">
            <img
              className="size-20 md:opacity-100 bottom-2 right-2 absolute opacity-25 sm:size-28 xl:size-40 object-contain"
              src="/Book.png"
              alt=""
            />{" "}
          </div>{" "}
        </div>{" "}
      </Card>
    </div>
  );
}

export default WelcomeDashboard;
