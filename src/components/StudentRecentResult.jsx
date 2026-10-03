import React from "react";
import { Card, CardTitle } from "./ui/card";
import { ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function StudentRecentResult() {
  const RecentResult = [
    {
      id: "Std1",
      Subject: "Data Science",
      ExamType: "MidTerm",
      Grade: "A",
      Score: "83/100",
      Date: "2,Apr 2010",
    },

    {
      id: "Std2",
      Subject: "FullStack Website  Devlopment",
      ExamType: "Final Term",
      Grade: "A+1",
      Score: "94/100",
      Date: "28,Apr 2010",
    },
    {
      id: "Std3",
      Subject: "CIT",
      ExamType: "First Term",
      Grade: "B",
      Score: "62/100",
      Date: "21,Sep 2025",
    },
    {
      id: "Std4",
      Subject: "Graphics Design",
      ExamType: "Final Term",
      Grade: "A+1",
      Score: "98/100",
      Date: "28,Octuber 2026",
    },
    {
      id: "Std5",
      Subject: "Digital Marketing",
      ExamType: "Final Term",
      Grade: "C",
      Score: "64/100",
      Date: "21,May 2026",
    },
  ];
  return (
    <div>
      {" "}
      <Card className="block! h-72! w-full rounded-xl p-4 mb-5">
        {" "}
        <div className="w-full px-2 flex justify-between items-center">
          {" "}
          <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted">
            Recent Results
          </h1>
          <Link className="flex items-center gap-2 text-primary! text-sm font-normal ">
            View All Results
          </Link>
        </div>
        <hr className="mt-2" />
        <ScrollArea orientation="horizontal" className={"w-full max-w-full"}>
          {" "}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={"text-sm font-semibold"}>
                  Course
                </TableHead>
                <TableHead className={"text-sm font-semibold"}>
                  Exam Type
                </TableHead>
                <TableHead className={"text-sm font-semibold"}>Grade</TableHead>
                <TableHead className={"text-sm font-semibold"}>Score</TableHead>
                <TableHead className={"text-sm font-semibold"}>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {RecentResult?.slice(0, 4).map((item) => {
                return (
                  <TableRow key={item?._id}>
                    <TableCell>{item?.Subject}</TableCell>
                    <TableCell>{item?.ExamType}</TableCell>

                    <TableCell>
                      <div className="bg-success/20  flex items-center justify-center rounded-full size-6 p-4 dark:bg-success/30 text-success/60 ">
                        {item?.Grade}
                      </div>
                    </TableCell>
                    <TableCell>{item?.Score}</TableCell>
                    <TableCell>{item?.Date}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}

export default StudentRecentResult;
