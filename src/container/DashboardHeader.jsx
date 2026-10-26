import { Button } from "@/components/ui/button";
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
import DeleteTeacherAssignedModal from "@/container/DeleteTeacherAssignedModal";
import GlobalSearch from "@/container/GlobalSearch";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { LogOut, Menu, User } from "lucide-react";

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
  const navigate = useNavigate();
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
              <PopoverContent className={"w-26"}>
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
                      <CardTitle className={"truncate text-sm -mt-1"}>
                        {UserProfileData?.firstName}
                        {UserProfileData?.lastName}
                      </CardTitle>
                    </div>
                    <div className="min-w-0">
                      {" "}
                      <CardDescription className="truncate text-xs -mt-1">
                        {UserProfileData?.email || "---"}
                      </CardDescription>
                    </div>
                  </div>
                </div>

                <div className="flex gap-1 flex-col">
                  <div className="mt-2 flex flex-col justify-start gap-2 items-start">
                    {role === "admin" && (
                      <Link
                        className="flex gap-2 items-center"
                        to={"/admin/profile"}
                      >
                        {" "}
                        <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                          <User className="size-4.5" />
                        </div>
                        Profile
                      </Link>
                    )}
                    {role === "user" && (
                      <Link
                        className="flex gap-2 items-center"
                        to={"/user/profile"}
                      >
                        {" "}
                        <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                          <User className="size-4.5" />
                        </div>
                        Profile
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 flex-col">
                  <div className="flex justify-start gap-2 items-center">
                    {" "}
                    <button
                      onClick={() => setTheme("light")}
                      className="flex items-center gap-2"
                    >
                      <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                        <Icon
                          className="size-4.5 cursor-pointer"
                          icon={"akar-icons:sun"}
                        />
                      </div>
                      <CardTitle>Light</CardTitle>
                    </button>
                  </div>
                  <div className="flex justify-start gap-2 items-center">
                    {" "}
                    <button
                      className="flex gap-2 items-center"
                      onClick={() => setTheme("dark")}
                    >
                      <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                        <Icon
                          className="size-4.5 cursor-pointer"
                          icon={"boxicons:moon"}
                        />
                      </div>
                      <CardTitle>Dark</CardTitle>
                    </button>
                  </div>
                  <div>
                    {" "}
                    <button
                      className="flex gap-2 items-center text-destructive"
                      onClick={() => {
                        Cookies.remove("token");
                        Cookies.remove("role");
                        navigate("/auth/login");
                      }}
                    >
                      <div className="shrink-0 bg-muted! size-8 rounded-full text-destructive flex justify-center items-center">
                        <LogOut className="size-4.5" />
                      </div>
                      Logout
                    </button>
                  </div>
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
          <LanguageSwitcher className="w-fit" />

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center"
          >
            <Icon
              className="size-4.5 cursor-pointer"
              icon={theme === "light" ? "akar-icons:sun" : "boxicons:moon"}
            />
          </button>

          {Loading ? (
            <div className="flex items-center gap-1 min-w-0 animate-pulse">
              <div className="flex size-8 shrink-0 items-center justify-center">
                <div className="size-8 rounded-full bg-muted" />
              </div>

              <div className="flex min-w-0 flex-col items-start gap-2 md:hidden lg:flex">
                <div className="h-3.5 w-24 rounded-md bg-muted" />

                <div className="h-3 w-32 rounded-md bg-muted" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 cursor-pointer min-w-0">
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

              <Popover>
                <PopoverTrigger
                  asChild
                  className="
                  flex flex-col justify-start items-start min-w-0 gap-y-0 md:hidden lg:flex cursor-pointer
                "
                >
                  {" "}
                  <CardTitle>
                    {UserProfileData?.firstName}
                    {UserProfileData?.lastName}
                  </CardTitle>
                  <CardDescription className="text-xs -mt-1">
                    {UserProfileData?.email || "---"}
                  </CardDescription>
                </PopoverTrigger>

                <PopoverContent className="w-50 mr-6">
                  {" "}
                  <div className="flex flex-col">
                    {" "}
                    <div className="min-w-0">
                      {" "}
                      <CardTitle className={"truncate text-sm -mt-1"}>
                        {UserProfileData?.firstName}
                        {UserProfileData?.lastName}
                      </CardTitle>
                    </div>
                    <div className="min-w-0">
                      {" "}
                      <CardDescription className="truncate text-xs -mt-1">
                        {UserProfileData?.email || "---"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="mt-2 flex flex-col justify-start gap-2 items-start">
                      {role === "admin" && (
                        <Link
                          className="flex gap-2 items-center"
                          to={"/admin/profile"}
                        >
                          {" "}
                          <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                            <User className="size-4.5" />
                          </div>
                          Profile
                        </Link>
                      )}
                      {role === "user" && (
                        <Link
                          className="flex gap-2 items-center"
                          to={"/user/profile"}
                        >
                          {" "}
                          <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                            <User className="size-4.5" />
                          </div>
                          Profile
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-col">
                    <div className="flex justify-start gap-2 items-center">
                      {" "}
                      <button
                        onClick={() => setTheme("light")}
                        className="flex items-center gap-2"
                      >
                        <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                          <Icon
                            className="size-4.5 cursor-pointer"
                            icon={"akar-icons:sun"}
                          />
                        </div>
                        <CardTitle>Light</CardTitle>
                      </button>
                    </div>
                    <div className="flex justify-start gap-2 items-center">
                      {" "}
                      <button
                        className="flex gap-2 items-center"
                        onClick={() => setTheme("dark")}
                      >
                        <div className="shrink-0 bg-muted! size-8 rounded-full flex justify-center items-center">
                          <Icon
                            className="size-4.5 cursor-pointer"
                            icon={"boxicons:moon"}
                          />
                        </div>
                        <CardTitle>Dark</CardTitle>
                      </button>
                    </div>
                    <div>
                      {" "}
                      <button
                        className="flex gap-2 items-center text-destructive"
                        onClick={() => {
                          Cookies.remove("token");
                          Cookies.remove("role");
                          navigate("/auth/login");
                        }}
                      >
                        <div className="shrink-0 bg-muted! size-8 rounded-full text-destructive flex justify-center items-center">
                          <LogOut className="size-4.5" />
                        </div>
                        Logout
                      </button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <DialogContent className={"min-h-88"}>
          <GlobalSearch Loading={Loading} />
        </DialogContent>
      </ItemHeader>
    </Dialog>
  );
}

export default DashboardHeader;
