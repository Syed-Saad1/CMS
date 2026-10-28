import { Icon } from "@iconify/react";
import { ChevronDown, ChevronUp, LogOut, User, X } from "lucide-react";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import SidebarNavigation from "./MockData/SidebarNavigation";
import { useTranslation } from "react-i18next";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserById } from "@/query/getUserById";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
function SideBar({ onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const navigation = useNavigate();

  const CurrentRole = Cookies.get("role") || "user";
  const NavigationItem = SidebarNavigation(CurrentRole, t);

  const location = useLocation();
  const UserId = Cookies.get("userId");

  const role = Cookies.get("role");
  const { data, isLoading: Loading } = getUserById(UserId);
  const UserProfileData = data?.data;
  const IntialFirst = UserProfileData?.firstName
    ?.trim()
    .charAt(0)
    .toUpperCase();
  const LastFirst = UserProfileData?.lastName?.trim().charAt(0).toUpperCase();
  return (
    <aside className="flex h-full w-full flex-col items-stretch border border-r-border/40">
      <div className="flex items-center justify-between">
        <img
          className="h-14 w-44 ml-2 object-contain mt-3 text-primary! cursor-pointer"
          src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
        />
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="mr-3 rounded-md p-2 hover:bg-accent xl:hidden"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-y-2 overflow-y-auto px-1 py-2 xl:mt-4 xl:mr-2 xl:ml-1 xl:overflow-visible xl:px-0 xl:py-0">
        {NavigationItem.map((item) => {
          return item?.isNavigate === true ? (
            <Link
              to={item?.link}
              key={item.id}
              className={cn(
                "hover:transition hover:delay-100 text-foreground w-full shrink-0 h-5 px-3 py-5 rounded-md flex items-center gap-2 text-sm font-medium",

                location.pathname.startsWith(item?.link)
                  ? "text-primary-foreground! font-bold bg-primary"
                  : "hover:bg-accent hover:text-accent-foreground",

                item.id === "Profile" ? "flex items-center" : "",
              )}
              onClick={onClose}
            >
              <Icon className="size-6" icon={item.icon} />
              {item.label}
            </Link>
          ) : null;
        })}
      </div>
      <div className="shrink-0 px-1 xl:mt-auto xl:ml-1 xl:mb-4 xl:mr-2">
        {" "}
        <Popover>
          <PopoverTrigger>
            {Loading ? (
              <CardDescription className="flex items-center justify-center border border-border rounded-xl gap-2 h-14 w-52">
                <Skeleton className="size-8 shrink-0 rounded-full" />

                <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                  <Skeleton className="h-3 w-20 rounded-md" />
                  <Skeleton className="h-3 w-28 rounded-md" />
                </div>

                <Skeleton className="size-4 rounded-sm mr-2" />
              </CardDescription>
            ) : (
              <CardDescription
                onClick={() => setIsOpen((prev) => !prev)}
                className={
                  "flex items-center justify-center border border-border rounded-xl gap-2 h-14  w-52 cursor-pointer"
                }
              >
                <div className="flex size-8 shrink-0 gap-0 justify-center items-center">
                  {UserProfileData?.avatar ? (
                    <img
                      className="size-full rounded-full object-cover"
                      src={UserProfileData?.avatar}
                      alt="Profile"
                    />
                  ) : (
                    <h1 className="size-full text-xs flex flex-col justify-center items-center bg-muted! rounded-full">
                      {IntialFirst}
                      {LastFirst}
                    </h1>
                  )}
                </div>
                <div className="flex gap-0.5 justify-start items-start mt-1 flex-col">
                  {" "}
                  <div className="min-w-0">
                    {" "}
                    <CardTitle className={"truncate text-xs -mt-1"}>
                      {UserProfileData?.firstName}
                      {UserProfileData?.lastName}
                    </CardTitle>
                  </div>
                  <div className="min-w-0">
                    {" "}
                    <CardDescription className="truncate line-clamp-1 text-xs -mt-1">
                      {UserProfileData?.email || "---"}
                    </CardDescription>
                  </div>
                </div>{" "}
                {!isOpen ? (
                  <ChevronDown className="text-xs size-4" />
                ) : (
                  <ChevronUp className="text-xs size-4" />
                )}
              </CardDescription>
            )}
          </PopoverTrigger>
          <PopoverContent className={"w-50"}>
            <div
              className={
                "flex items-center justify-center  gap-2 cursor-pointer"
              }
            >
              <div className="flex size-8 shrink-0 gap-0 justify-center items-center">
                {UserProfileData?.avatar ? (
                  <img
                    className="size-full rounded-full object-cover"
                    src={UserProfileData?.avatar}
                    alt="Profile"
                  />
                ) : (
                  <h1 className="size-full text-xs flex flex-col justify-center items-center bg-muted! rounded-full">
                    {IntialFirst}
                    {LastFirst}
                  </h1>
                )}
              </div>
              <div className="flex flex-col">
                {" "}
                <div className="min-w-0">
                  {" "}
                  <CardTitle className={"truncate text-xs -mt-1"}>
                    {UserProfileData?.firstName}
                    {UserProfileData?.lastName}
                  </CardTitle>
                </div>
                <div className="min-w-0 w-32">
                  {" "}
                  <CardDescription className="truncate line-clamp-1 text-xs -mt-1">
                    {UserProfileData?.email || "---"}
                  </CardDescription>
                </div>
              </div>
            </div>
            <hr />

            <div className="flex gap-1 flex-col">
              <div className="flex flex-col justify-start  items-start">
                {role === "admin" && (
                  <Link
                    className="flex gap-2 items-center"
                    to={"/admin/profile"}
                  >
                    {" "}
                    <div className="shrink-0  size-8 rounded-full flex justify-center items-center">
                      <User className="size-4.5" />
                    </div>
                    Profile
                  </Link>
                )}
                {role === "user" && (
                  <Link className="flex items-center" to={"/user/profile"}>
                    {" "}
                    <div className="shrink-0  size-8 rounded-full flex justify-center items-center">
                      <User className="size-4.5" />
                    </div>
                    Profile
                  </Link>
                )}
              </div>
              <hr />
            </div>
            <div className="flex flex-col rounded-sm justify-center items-start py-1 px-4 h-fit bg-accent w-full">
              <CardDescription className={"text-xs"}>Theme </CardDescription>
              <div className="flex mt-1 gap-8 items-center">
                {" "}
                <CardTitle className={"text-xs"}>
                  {theme === "dark" ? "Dark Mode" : "Light Mode "}
                </CardTitle>{" "}
                <Switch
                  className={"cursor-pointer"}
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                />
              </div>
            </div>
            <hr />
            <div className="flex gap-1 flex-col">
              <button
                type="button"
                className="flex gap-1 font-semibold pl-1 cursor-pointer items-center text-destructive"
                onClick={() => {
                  Cookies.remove("token");
                  Cookies.remove("role");
                  Cookies.remove("userId");

                  navigation("/auth/login");
                }}
              >
                <div className="shrink-0 size-8 rounded-full text-destructive flex justify-center items-center">
                  <LogOut className="size-4.5" />
                </div>
                Logout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}

export default SideBar;
