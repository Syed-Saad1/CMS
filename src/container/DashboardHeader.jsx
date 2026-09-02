import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemHeader } from "@/components/ui/item";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import React from "react";
import { Link } from "react-router-dom";

function DashboardHeader() {
  const { theme, setTheme } = useTheme();
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
        <img
          className="h-10 w-10 object-cover rounded-full"
          src="/img.jpeg"
          alt=""
        />
      </div>
    </ItemHeader>
  );
}

export default DashboardHeader;
