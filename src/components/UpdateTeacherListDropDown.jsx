import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { CardTitle } from "./ui/card";

function UpdateTeacherListDropDown({
  TeacherData,
  updateAssigned,
  setUpdateAssignedTeacher,
}) {
  return (
    <div>
      {" "}
      <div className="w-full">
        <DropdownMenu className="h-full">
          {" "}
          <DropdownMenuTrigger
            render={<Button variant="outline" />}
            className="flex h-10 bg-transparent  rounded-sm w-full justify-between px-2"
          >
            <div className="flex gap-1">
              <img
                src={updateAssigned?.avatar}
                className="size-5 rounded-full object-cover"
                alt={updateAssigned?.firstName || "Teacher"}
              />
              <CardTitle>
                {" "}
                {updateAssigned
                  ? `${updateAssigned?.firstName} ${updateAssigned?.lastName}`
                  : "Select Teacher"}
              </CardTitle>{" "}
            </div>
            <ChevronDown className="ml-2 size-4" />
          </DropdownMenuTrigger>{" "}
          <DropdownMenuContent>
            {" "}
            <DropdownMenuGroup>
              {" "}
              {TeacherData?.map((item) => (
                <DropdownMenuItem
                  key={item?._id || item?.id}
                  onClick={() => setUpdateAssignedTeacher(item)}
                >
                  <img
                    src={item?.avatar}
                    className="size-5 rounded-full object-cover"
                    alt={item?.firstName || "Teacher"}
                  />

                  <CardTitle>
                    {item?.firstName} {item?.lastName}
                  </CardTitle>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>{" "}
        </DropdownMenu>
      </div>
    </div>
  );
}

export default UpdateTeacherListDropDown;
