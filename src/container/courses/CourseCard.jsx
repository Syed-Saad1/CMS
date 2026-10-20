import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ArrowRight, EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DeleteCourseModal } from "./DeleteCourseModal";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const CourseCard = ({ item }) => {
  const [selectItem, setselectItem] = useState(null);

  const UserRole = Cookies.get("role");

  return (
    <Dialog>
      <Link to={`${item?._id}`}>
        <Card
          key={item?._id}
          className="h-fit pb-2 hover:shadow-xs hover:h-62 hover:w-64 rounded-xl border border-border w-full flex flex-col gap-2"
        >
          <div className="group relative h-32 bg-accent overflow-hidden">
            <img
              className="absolute aspect-video inset-0 text-center flex justify-center items-center text-red-500 font-bold w-full h-full object-cover"
              src={item?.thumbnail || "/DeafultThumbinal.png"}
            />
          </div>

          <div className="flex flex-col pl-2">
            <CardTitle className="text-lg mt-1  line-clamp-1 truncate">
              {item?.title}
            </CardTitle>

            <CardDescription className="text-xs min-h-8  line-clamp-2">
              {item?.description}
            </CardDescription>

            <div className="flex justify-between items-center mt-2 ">
              <CardTitle className="flex w-24 text-lg font-bold line-clamp-1 min-w-20">
                ${item?.price}
              </CardTitle>

              <Button variant="button" className="mr-3 px-4 py-1 text-sm">
                Explore More <ArrowRight />
              </Button>
            </div>
          </div>
        </Card>
      </Link>
      <DialogContent className="h-38! w-130!">
        <DeleteCourseModal item={item} selectItem={selectItem} />
      </DialogContent>
    </Dialog>
  );
};
