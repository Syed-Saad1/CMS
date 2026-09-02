import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "react-router-dom";
import { LinkSidebar, SidebarNavigation } from "./SidebarNavigation";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

function SideBar() {
  const { theme } = useTheme();

  return (
    <aside className="flex flex-col h-full border border-r-border">
      <img
        className=""
        src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
      />
      <div className="flex flex-col gap-y-2 mr-2 mt-8 ml-1">
        {SidebarNavigation.map((item) => (
          <Link
            key={item.id}
            className="hover:bg-muted hover:transition hover:delay-150 text-foreground w-full h-5 px-3 py-5 rounded-md  flex items-center gap-2 text-sm font-medium"
          >
            <Icon className="size-6" icon={item.icon} /> {item.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto mr-2 ml-1 mb-4">
        {LinkSidebar.map((item) => (
          <Link
            key={item.id}
            className={cn(
              " hover:transition hover:delay-150 text-foreground w-full h-5 px-3 py-5 rounded-md  flex items-center gap-2 text-sm font-medium",
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
