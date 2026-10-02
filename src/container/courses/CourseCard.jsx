import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const CourseCard = ({ item }) => {
  const [selectItem, setselectItem] = useState(null);
  const UserRole = Cookies.get("role");
  return (
    <Dialog>
      <Card
        key={item?._id}
        className="h-70 rounded-xl shadow-xl border border-border w-full flex flex-col gap-2 "
      >
        <div className="group relative h-32 bg-accent overflow-hidden">
          <img
            className="absolute inset-0 text-center flex justify-center items-center text-red-500 font-bold w-full
                    h-full object-cover"
            src={item?.thumbnail || "/DeafultThumbinal.png"}
          />

          {UserRole === "admin" && (
            <DialogTrigger>
              <Button
                onClick={() => setselectItem(item)}
                className="bg-destructive hover:bg-destructive/90

                   absolute -top-0.5 -right-0.5 group-hover:opacity-100 opacity-0  rounded-lg"
              >
                <Trash />
              </Button>
            </DialogTrigger>
          )}
        </div>
        <div className="flex flex-col pl-2">
          {" "}
          <Link to={`${item?._id}`} className="w-full">
            <CardTitle className="text-lg mt-2 leading-5 hover:underline hover:text-primary line-clamp-1">
              {item?.title}
            </CardTitle>
          </Link>
          <CardDescription className="text-xs mt-2 line-clamp-2">
            {item?.description}
          </CardDescription>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex relative px-0">
              <img className="rounded-full size-4" src="/men1.png" alt="" />
              <img
                className="rounded-full size-4 absolute left-2.5"
                src="/men2.png"
                alt=""
              />

              <div className="bg-primary rounded-full size-4 text-center text-primary-foreground text-xs absolute left-4.5">
                {item?.numenroll || "4"}
              </div>
            </div>
            <p className="text-muted-foreground text-xs pl-3.5">
              {item?.enrolltitle || "Enroll"}
            </p>
          </div>
          <div className="flex justify-between items-center  mt-2 ">
            <CardTitle className={"flex"}>
              ${item?.price}{" "}
              <CardDescription className={"pl-1"}> /6Months</CardDescription>
            </CardTitle>

            <Link to={`${item?._id}`}>
              {" "}
              <Button variant="button" className={"mr-3 px-6 text-sm"}>
                Join
              </Button>
            </Link>
          </div>
        </div>
      </Card>
      <DialogContent className={"h-38! w-130!"}>
        <DeleteCourseModal item={item} selectItem={selectItem} />
      </DialogContent>
    </Dialog>
  );
};
