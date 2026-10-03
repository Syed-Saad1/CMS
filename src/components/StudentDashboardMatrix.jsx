import React, { useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Award,
  Calendar,
  FileEdit,
  FileText,
  GraduationCap,
} from "lucide-react";
function StudentDashboardMatrix() {
  const [loading, setLoading] = useState(false);
  const StudentDashboardMatrix = [
    {
      id: "1",
      icon: FileEdit,
      title: "CGPA",
      Quantity: 9.5,
      description: "Current Semester",
    },
    {
      id: "2",
      icon: GraduationCap,
      title: "Courses Enrolled",
      Quantity: 6,
      description: "3Months",
    },
    {
      id: "3",
      icon: FileText,
      title: "Exam Completed",
      Quantity: 4,
      description: "This Semester",
    },
    {
      id: "4",
      icon: Award,
      title: "Performance",
      Quantity: 12,
      description: "This Semester",
    },
    {
      id: "5",
      icon: Calendar,
      title: "Attendance",
      Quantity: " 90%",
      description: "This Semester",
    },
  ];

  return (
    <div>
      {" "}
      <div className="flex items-start justify-start mt-4 gap-5 shrink-0">
        {loading
          ? Array.from({ length: StudentDashboardMatrix?.length || 4 }).map(
              (_, index) => (
                <Card
                  key={index}
                  className="w-full h-28 flex items-center justify-between gap-4 p-4"
                >
                  <Skeleton className="size-14 shrink-0 rounded-md" />

                  <div className="flex flex-col flex-1 gap-1.5">
                    <Skeleton className="h-5 w-28 rounded-sm" />

                    <Skeleton className="h-6 w-16 rounded-sm" />

                    <Skeleton className="h-4 w-24 rounded-sm" />
                  </div>
                </Card>
              ),
            )
          : StudentDashboardMatrix.map((item) => {
              const IconCom = item.icon;
              return (
                <Card
                  className="relative w-full h-28 flex items-center justify-between gap-4 p-4 "
                  key={item?.id}
                >
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg font-bold line-clamp-1">
                      {item?.title}
                    </CardTitle>
                    <CardDescription className="text-xl font-semibold">
                      {item?.Quantity}
                    </CardDescription>
                    <p className="text-sm text-success">{item?.description}</p>

                    <div class="w-full bg-primary/60 rounded-full h-2">
                      <div
                        className="bg-primary/80 h-2 rounded-full"
                        style={{ width: 35 }}
                      />
                    </div>
                  </div>
                  <div className="absolute -right-16 top-0 h-full w-27 -rotate-42 rounded-xl bg-primary/15 p-2 flex items-center justify-center"></div>
                  <IconCom className="size-6 text-primary" />
                </Card>
              );
            })}
      </div>
    </div>
  );
}

export default StudentDashboardMatrix;
