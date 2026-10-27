import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  ArrowBigUpDash,
  ChartBarStacked,
  Clock,
  IdCardLanyard,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CourseDataAssignedSkeleton from "@/skeleton/CourseDataAssignedSkeleton";

function CourseDataAssignedTeacher({ isLoading, Data }) {
  const { t } = useTranslation();

  return (
    <div>
      {" "}
      {isLoading ? (
        <CourseDataAssignedSkeleton />
      ) : (
        <Card className={"border border-border h-fit p-4  flex flex-col"}>
          <CardTitle className={"text-xl"}>
            {t("ui.courseInformation")}
          </CardTitle>
          <hr className="mt-4 text-muted-foreground h-2 w-full" />
          <div className="flex gap-2 justify-start items-start mt-2">
            {" "}
            <div className="rounded-sm flex h-22 w-36  ">
              <img
                className="h-18 w-44 object-center rounded-lg"
                src={Data?.thumbnail || "/DeafultThumbinal.png"}
                alt=""
              />
            </div>
            <div className="max-w-60 flex-1 ">
              <CardTitle className="line-clamp-2 font-semibold text-lg ">
                {Data?.title || "CourseName"}{" "}
              </CardTitle>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {" "}
            <div className="flex items-center gap-4 ">
              <div className=" flex justify-center gap-0.5 items-center">
                <IdCardLanyard className="size-5 shrink-0" />
                <Label className={"min-w-18 w-18"}>{t("ui.courseId")}</Label>
              </div>
              <CardDescription>
                course_{Data?._id.toUpperCase().slice(0, 10)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 ">
              <div className=" flex justify-center gap-0.5 items-center">
                <ChartBarStacked className="size-5 shrink-0" />
                <Label className={"min-w-18 w-18"}>{t("ui.category")}</Label>
              </div>
              <CardDescription className={"md:inline-flex xs:flex-col gap-1"}>
                {" "}
                {Data?.tags.map((item) => (
                  <div>{item},</div>
                ))}
              </CardDescription>
            </div>
            <div className=" flex items-center gap-4 ">
              <div className=" flex justify-center gap-0.5 items-center">
                <ArrowBigUpDash className="size-5 shrink-0" />
                <Label className={"min-w-18 w-18"}>{t("ui.level")}</Label>
              </div>
              <CardDescription>{t("ui.beginnerAdvanced")}</CardDescription>
            </div>
            <div className="flex items-center gap-4 ">
              <div className=" flex justify-center gap-0.5 items-center">
                <Clock className="size-5 shrink-0" />
                <Label className={"min-w-18 w-18"}>{t("ui.duration")}</Label>
              </div>
              <CardDescription>
                {Data?.courseDuration?.value
                  ? `${Data?.courseDuration.value} ${Data?.courseDuration.unit}`
                  : "Duration is Not Decide"}
              </CardDescription>
            </div>
          </div>
          <hr className="my-2 text-muted-foreground h-2 w-full" />
          <Label className={"text-lg "}>{t("ui.courseDescription")}</Label>
          <CardDescription className={"min-h-15 h-12 line-clamp-3"}>
            {Data?.description || "Description is Not Define "}
          </CardDescription>
        </Card>
      )}
    </div>
  );
}

export default CourseDataAssignedTeacher;
