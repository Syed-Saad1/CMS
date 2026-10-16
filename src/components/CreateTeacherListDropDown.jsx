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

function TeacherListDropDown({
  TeacherData,
  selectedTeacher,
  setSelectedTeacher,
}) {
  return (
    <div>
      {" "}
      <div className=" w-full">
        <DropdownMenu>
          {" "}
          <DropdownMenuTrigger
            render={<Button variant="outline" />}
            className="flex w-full justify-between px-2"
          >
            {" "}
            {selectedTeacher
              ? `${selectedTeacher?.firstName} ${selectedTeacher?.lastName}`
              : "Select Teacher"}{" "}
            <ChevronDown className="ml-2 size-4" />
          </DropdownMenuTrigger>{" "}
          <DropdownMenuContent>
            {" "}
            <DropdownMenuGroup>
              {" "}
              {TeacherData?.map((item) => {
                return (
                  <div>
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => setSelectedTeacher(item)}
                    >
                      {" "}
                      <img
                        src={item?.avatar}
                        className="size-5 rounded-full object-cover"
                        alt={item?.firstName}
                      />{" "}
                      <CardTitle>
                        {" "}
                        {item?.firstName} {item?.lastName}
                      </CardTitle>{" "}
                    </DropdownMenuItem>{" "}
                  </div>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>{" "}
        </DropdownMenu>
      </div>
    </div>
  );
}

export default TeacherListDropDown;
