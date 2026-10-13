import React from "react";
import { CardDescription, CardTitle } from "./ui/card";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";

export default function DeleteTeacherAssignedModal({ Data, selectedTeacher }) {
  console.log("selectedTeacher", selectedTeacher);
  const { t } = useTranslation();
  return (
    <div>
      <div>
        <CardTitle>{t("adminPage.base.title")}</CardTitle>
        <CardDescription className={"mt-2"}>
          Are you sure you want to remove this teacher{" "}
          {selectedTeacher?.firstName}
          {selectedTeacher?.lastName} from this assigned course {Data?.title}
          ?{" "}
        </CardDescription>
        <div className="flex justify-end items-end mt-4">
          {" "}
          <DialogTrigger>
            <Button type="submit" variant="destructive">
              <Trash />
              Remove Permently
            </Button>
          </DialogTrigger>
        </div>{" "}
      </div>
    </div>
  );
}
