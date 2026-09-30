import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemHeader } from "@/components/ui/item";
import { getUserById } from "@/query/getUserById";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { TableCell } from "@/components/ui/table";

function DashboardHeader() {
  const { theme, setTheme } = useTheme();

  const UserId = Cookies.get("userId");
  const { data, isLoading } = getUserById(UserId);
  const UserProfileData = data?.data;

  const IntialFirst = UserProfileData?.firstName
    ?.trim()
    .charAt(0)
    .toUpperCase();
  const LastFirst = UserProfileData?.lastName?.trim().charAt(0).toUpperCase();
  return (
    <ItemHeader className="h-full px-8 flex justify-between items-center bg-sidebar">
      {" "}
      <div className="relative w-100">
        <Link>
          <Icon
            className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
            icon="bx:search"
          />
        </Link>
        <Input
          className="h-8 w-full pl-10 rounded-md outline-non"
          placeholder="Search courses, peers, or files "
        />
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Icon className="size-4.5" icon="clarity:notification-outline-badged" />
        <Icon className="size-4.5" icon="ant-design:setting-outlined" />
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <Icon
            className="size-4.5"
            icon={theme === "light" ? "akar-icons:sun" : "boxicons:moon"}
          />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="flex size-8 justify-center items-center ">
            {UserProfileData?.avatar ? (
              <img
                className="size-full rounded-full object-cover "
                src={UserProfileData?.avatar}
              />
            ) : (
              <h1 className="size-full text-xs flex flex-col justify-center items-center bg-muted! rounded-full ">
                {IntialFirst}
                {LastFirst}
              </h1>
            )}
          </div>
          <div className="flex flex-col">
            <TableCell className={"py-0 pl-0"}>
              {UserProfileData?.firstName}
              {UserProfileData?.lastName}
            </TableCell>

            <span className="text-xs text-muted-foreground">
              {UserProfileData?.email || "---"}
            </span>
          </div>
        </div>
      </div>
    </ItemHeader>
  );
}

export default DashboardHeader;
