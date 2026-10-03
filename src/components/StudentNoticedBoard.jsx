import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";

function StudentNoticedBoard() {
  const Annoucment = [
    {
      id: "An1",
      icon: Megaphone,
      Title: "End Semester Exam Shedule",
      des: "The end semester exams will begin from 10,Octuber 2026",
      PostDate: "2,Octuber 2026",
    },
    {
      id: "An2",
      icon: Megaphone,
      Title: "Independence Day Event",
      des: "Independence Day Event Celebrate Our Freedom on 14,Augusts 2026",
      PostDate: "12,August 2026",
    },
    {
      id: "An3",
      icon: Megaphone,
      Title: "AI Attack On Gen-z",
      des: "this Event Specaily of Gen-z at Institute on 16,Octuber 2026",
      PostDate: "12,Octuber 2026",
    },
    {
      id: "An4",
      icon: Megaphone,
      Title: "Teacher's Picnic",
      des: "The Anualy Picnic of Teacher's on 10,November 2026",
      PostDate: "1,November 2026",
    },
  ];
  return (
    <div>
      <Card className={"block! h-72! w-full rounded-xl p-4 mb-5"}>
        {" "}
        <div className="w-full flex justify-between items-center">
          {" "}
          <h1 className="flex gap-2 text-lg font-semibold text-shadow-muted">
            Notice Board{" "}
          </h1>
          <Link className="flex items-center gap-2 text-primary! text-sm font-normal ">
            View All Noticed
          </Link>
        </div>
        <div className="mt-3 flex flex-col gap-3">
          {Annoucment?.slice(0, 3)?.map((item) => {
            return (
              <div key={item?.id} className="flex gap-3 items-center">
                <div className="size-16 bg-primary/15 rounded-xl flex justify-center items-center">
                  {" "}
                  <Megaphone className="size-7 text-primary" />
                </div>
                <div>
                  <CardTitle className={"font-semibold"}>
                    {item?.Title}{" "}
                  </CardTitle>
                  <CardDescription>{item?.des} </CardDescription>
                  <p className="text-primary">{item?.PostDate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default StudentNoticedBoard;
