import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { CardDescription, CardTitle } from "./ui/card";
import Cookies from "js-cookie";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
function GlobalSearch({ Loading }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const role = Cookies.get("role");

  const SearchInput = [
    {
      id: "AdminDashboard",
      label: "Dashboard",
      link: "/user/dashboard",
      icon: "boxicons:dashboard",
      des: "Here's Whats happening with your course managment system today. keep up the great work!",
      isNavigate: role === "user" ? true : false,
    },
    {
      id: "AdminDashboard",
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: "boxicons:dashboard",
      des: "Here's Whats happening with your course managment system today. keep up the great work!",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "AllUsers",
      label: "All Users",
      link: "/admin/users",
      icon: "ci:users",
      des: "Manage user roles and access permissions across the platform.",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "Courses",
      label: "All Courses",
      link: "/courses",
      icon: "flowbite:graduation-cap-outline",
      des: "Manage curriculum, assign educators, and monitor course status.",
      isNavigate: true,
    },
    {
      id: "CreateCourses",
      label: "Create Courses",
      link: "/courses-create",
      icon: "flowbite:graduation-cap-outline",
      des: "Add a new educational module to the portal.",
      isNavigate: role === "admin" ? true : false,
    },

    {
      id: "profile",
      label: "Profile",
      link: "/admin/profile",
      icon: "iconamoon:profile",
      des: "Update your basic profile details and contact information.",
      isNavigate: role === "admin" ? true : false,
    },

    {
      id: "profile",
      label: "Profile",
      link: "/user/profile",
      icon: "iconamoon:profile",
      des: "Update your basic profile details and contact information.",
      isNavigate: role === "user" ? true : false,
    },
  ];

  const FilterRoute = SearchInput.filter((route) => {
    const SearchRoute = search.toLowerCase();
    return route?.label?.toLowerCase().includes(SearchRoute);
  });
  return (
    <div className="w-full  mt-6">
      <div className="w-full flex justify-between items-center">
        {" "}
        <div className="relative w-full max-w-88 min-w-0">
          <Icon
            className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
            icon="bx:search"
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("ui.searchAll")}
            className={"pt-0 pl-8"}
          />
        </div>
      </div>
      <div className="flex gap-2 flex-col mt-6">
        {" "}
        {FilterRoute?.map((item) => {
          if (!item?.isNavigate) return null;

          return (
            <Suspense key={item?.id} fallback={<Loading />}>
              {" "}
              <Link
                onClick={() => onClose()}
                to={item?.link}
                className="block w-full"
              >
                <div className="bg-muted h-12 rounded-sm p-2 w-full">
                  <div className="flex items-center gap-2 justify-start">
                    <div className="bg-primary/15 rounded-sm size-8 flex justify-center items-center">
                      {" "}
                      <Icon className="size-5" icon={item?.icon} />
                    </div>
                    <div>
                      {" "}
                      <CardDescription className={"text-sm"}>
                        {item?.label}
                      </CardDescription>
                      <div className="max-w-50 flex-1 -mt-1">
                        <CardDescription className="truncate text-xs font-normal">
                          {item?.des}{" "}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Suspense>
          );
        })}
      </div>
    </div>
  );
}

export default GlobalSearch;
