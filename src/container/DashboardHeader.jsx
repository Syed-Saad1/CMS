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
import DeleteTeacherAssignedModal from "@/components/DeleteTeacherAssignedModal";
import GlobalSearch from "@/components/GlobalSearch";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function DashboardHeader() {
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
      <ItemHeader className="h-full px-8 md:px-4 sm:px-3 flex justify-between items-center bg-sidebar gap-4">
        {role === "admin" && (
          <DialogTrigger>
            <Input
              className="h-8 w-64 rounded-md outline-non focus:outline-none focus:ring-0 focus:border-none"
              placeholder="Search courses, teachers, students..."
            />
          </DialogTrigger>
        )}
        {role === "user" && (
          <DialogTrigger>
            <Input
              className="h-8 w-64 rounded-md outline-non focus:outline-none focus:ring-0 focus:border-none"
              placeholder="Search courses and learning resources..."
            />
          </DialogTrigger>
        )}

        <div className="flex lg:gap-2 justify-center items-center shrink-0 ">
          <LanguageSwitcher />

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
                  <CardTitle>
                    {UserProfileData?.firstName}
                    {UserProfileData?.lastName}
                  </CardTitle>

                  <CardDescription className="text-xs -mt-1">
                    {UserProfileData?.email || "---"}
                  </CardDescription>
                </PopoverTrigger>

                <PopoverContent className="w-fit">
                  <div className="flex flex-col justify-center items-center gap-2 bg-transparent">
                    {role === "admin" && (
                      <Link to={"/admin/profile"}>
                        <Button variant="button" className={" w-30"}>
                          Profile
                        </Button>
                      </Link>
                    )}
                    {role === "user" && (
                      <Link to={"/user/profile"}>
                        <Button variant="button" className={" w-30"}>
                          Profile
                        </Button>
                      </Link>
                    )}

                    <Button
                      onClick={() => {
                        Cookies.remove("token");
                        Cookies.remove("role");
                        navigate("/auth/login");
                      }}
                      className=" group flex w-full items-center gap-3
    rounded-lg px-4 py-3
    text-sm font-medium
    text-red-600
    transition-all duration-200 ease-in-out
    hover:bg-red-200 hover:text-red-700
    active:scale-[0.98]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-red-500
    dark:text-red-400
    dark:hover:bg-red-950/50
    dark:hover:text-red-300"
                      variant="ghost"
                    >
                      Logout
                    </Button>
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
