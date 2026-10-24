import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  EllipsisVertical,
  Pencil,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StatusBadge } from "@/components/ui/status";

export const CourseCard = ({ item }) => {
  const [selectItem, setselectItem] = useState(null);
  const navigate = useNavigate();
  const UserRole = Cookies.get("role");

  return (
    <Dialog>
      <Link to={`${item?._id}`}>
        <Card
          key={item?._id}
          className="h-fit! pb-2 hover:shadow-xs  rounded-xl border border-border w-86 flex flex-col gap-2"
        >
          <div className=" relative h-32 bg-accent overflow-hidden">
            <img
              className="absolute aspect-video inset-0 text-center flex justify-center items-center font-bold w-full h-full object-cover"
              src={item?.thumbnail || "/DeafultThumbinal.png"}
            />
          </div>

          <div className="flex flex-col pl-2 pr-2">
            <CardTitle className="text-lg mt-1 line-clamp-1 truncate">
              {item?.title}
            </CardTitle>

            <CardDescription className="text-xs min-h-8  line-clamp-2">
              {item?.description}
            </CardDescription>
            <div className="flex items-center gap-2 mt-1">
              <div>
                <img
                  className="size-8 object-cover rounded-full"
                  src="/men1.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-y-0">
                <CardTitle className={"text-sm"}>Sir Jhon</CardTitle>
                <CardDescription className={"text-xs p-0 m-0"}>
                  john285@gmail.com
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <div className="gap-1 flex items-center">
                <Calendar className="text-muted-foreground size-3" />
                <CardDescription className={"text-xs flex gap-1"}>
                  {item?.courseDays?.map((item) => (
                    <div>{item.slice(0, 3)},</div>
                  ))}
                </CardDescription>
              </div>
              <div className="gap-1 flex items-center">
                <Clock className="text-muted-foreground size-3" />
                <CardDescription className={"text-xs flex gap-1"}>
                  {item?.courseTime?.startTime || "00:00"}
                  <span> to</span> {item?.courseTime?.endTime || "00:00"}
                </CardDescription>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 ">
              <CardTitle className="flex w-24 text-primary font-bold text-lg line-clamp-1 min-w-20">
                $ {item?.price}
              </CardTitle>

              {UserRole === "admin" && (
                <div className="flex gap-1 mr-2">
                  {" "}
                  <Button
                    className={
                      "text-xs border-2 text-primary cursor-pointer border-primary/40 bg-primary/5"
                    }
                  >
                    View Details
                  </Button>
                  <Link to={`/courses/edit/${item?.id}`}>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                      className={"text-xs cursor-pointer"}
                      variant="outline"
                    >
                      <Pencil /> Edit{" "}
                    </Button>{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </Dialog>
  );
};
