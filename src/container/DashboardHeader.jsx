import { Input } from "@/components/ui/input";
import { ItemHeader } from "@/components/ui/item";
import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";

function DashboardHeader() {
  return (
    <ItemHeader className="h-full px-8 flex justify-between items-center">
      {" "}
      <div className="relative w-100">
        <Link>
          <Icon
            className="absolute left-3 top-1/2 text-gray-400 -translate-y-2 cursor-pointer"
            icon="ant-design:search-outlined"
          />
        </Link>
        <Input
          className="h-8 w-full pl-10 rounded-xl"
          placeholder="Search courses, peers, or files "
        />
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Icon className="size-4.5" icon="clarity:notification-outline-badged" />
        <Icon className="size-4.5" icon="ant-design:setting-outlined" />
        <Icon className="size-4.5" icon="boxicons:moon" />
        <Icon className="size-4.5" icon="akar-icons:sun" />

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
