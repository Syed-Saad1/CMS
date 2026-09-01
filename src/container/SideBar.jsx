import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import { LinkSidebar, SidebarNavigation } from "./SidebarNavigation";
import { cn } from "@/lib/utils";

function SideBar() {
  return (
    <aside className="flex flex-col  h-full">
      <div className="mt-4 ml-2.5">
        <img src="/dashboardlogo.png" className="h-12.5 object-cover " alt="" />
      </div>
      <div className="flex flex-col gap-y-2 mr-2 mt-8 ml-1">
        {SidebarNavigation.map((item) => (
          <Link
            key={item.id}
            className="hover:bg-gray-500 w-full h-6 px-3 py-5 rounded-md hover:text-white text-gray-300 flex items-center gap-2"
          >
            <Icon className="size-5" icon={item.icon} /> {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto mr-2 ml-1 mb-4">
        {LinkSidebar.map((item) => (
          <Link
            key={item.id}
            className={cn(
              " w-full h-6 px-3 py-4 rounded-md hover:text-white text-gray-300 flex items-center gap-2",
              item.id === "logout" ? "hover:bg-red-500 mt-1.5" : "",
            )}
          >
            <Icon className="size-5" icon={item.icon} /> {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
