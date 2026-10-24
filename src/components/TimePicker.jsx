import React from "react";
import { Clock3 } from "lucide-react";
import { Label } from "./ui/label";
import { useTranslation } from "react-i18next";

function TimeRangePicker({ value, setFieldValue }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <div className=" grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-normal">{t("ui.startTime")}</Label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="time"
              value={value?.startTime || ""}
              onChange={(e) => {
                setFieldValue("courseTime.startTime", e.target.value);
              }}
              className="h-8 w-full rounded-md border pl-10 pr-3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs font-normal">{t("ui.endTime")}</Label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="time"
              value={value?.endTime || ""}
              onChange={(e) => {
                setFieldValue("courseTime.endTime", e.target.value);
              }}
              className="h-8 w-full rounded-md border pl-10 pr-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeRangePicker;
