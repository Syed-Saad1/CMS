import { Input } from "@/components/ui/input";
import { ItemHeader } from "@/components/ui/item";
import { getUserById } from "@/query/getUserById";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import GlobalSearch from "@/container/GlobalSearch";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Bell, LogOut, Menu, User } from "lucide-react";
import { Switch } from "@/components/ui/switch";

function DashboardHeader({ onMenuClick }) {
  const { theme, setTheme } = useTheme();
  const UserId = Cookies.get("userId");
  const { data, isLoading: Loading } = getUserById(UserId);
  const UserProfileData = data?.data;

  const IntialFirst = UserProfileData?.firstName
    ?.trim()
    .charAt(0)
    .toUpperCase();
  const LastFirst = UserProfileData?.lastName?.trim().charAt(0).toUpperCase();
  Cookies.get("token");
  const role = Cookies.get("role");
  const navigation = useNavigate();
  return (
    <Dialog>
      <ItemHeader className="h-full min-w-0 px-2 sm:px-3 md:px-4 lg:px-8 flex justify-between items-center bg-sidebar gap-2 sm:gap-4">
        <div className="md:hidden flex justify-between items-center w-full">
          {" "}
          <div>
            {" "}
            <img
              className="h-11 w-44 pr-3 object-contain text-primary! cursor-pointer"
              src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
            />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Popover>
              <PopoverTrigger>
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
              </PopoverTrigger>
              <PopoverContent className={"w-50"}>
                <div className="flex gap-2 items-center">
                  {" "}
                  {UserProfileData?.avatar ? (
                    <img
                      className="size-10 rounded-full object-cover"
                      src={UserProfileData?.avatar}
                      alt="Profile"
                    />
                  ) : (
                    <h1 className="size-10 text-xs flex flex-col justify-center items-center bg-muted! rounded-full">
                      {IntialFirst}
                      {LastFirst}
                    </h1>
                  )}
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
                  <CardDescription className={"text-xs"}>
                    Theme{" "}
                  </CardDescription>
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
        </div>{" "}
        {role === "admin" && (
          <DialogTrigger>
            <Input
              className="h-8 w-32 min-w-0 md:block hidden rounded-md outline-non focus:outline-none focus:ring-0 focus:border-none  xl:w-64"
              placeholder="Search courses, teachers, students..."
            />
          </DialogTrigger>
        )}
        {role === "user" && (
          <DialogTrigger>
            <Input
              className="h-8 w-32 min-w-0 md:block hidden rounded-md outline-non focus:outline-none focus:ring-0 focus:border-none sm:w-48 xl:w-64"
              placeholder="Search courses and learning resources..."
            />
          </DialogTrigger>
        )}
        <div className="md:flex hidden lg:gap-2 justify-center items-center shrink-0 ">
          <LanguageSwitcher className="" />

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center"
          >
            <Icon
              className="size-4.5 cursor-pointer"
              icon={theme === "light" ? "akar-icons:sun" : "boxicons:moon"}
            />
          </button>
          <button className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
            <Bell className="size-4.5 cursor-pointer" />
          </button>
        </div>
        <DialogContent className={"min-h-88"}>
          <GlobalSearch Loading={Loading} />
        </DialogContent>
      </ItemHeader>
    </Dialog>
  );
}

export default DashboardHeader;
