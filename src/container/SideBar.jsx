import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import SidebarNavigation from "../container/SidebarNavigation";
import { Button } from "@/components/ui/button";
function SideBar() {
  const { theme } = useTheme();

  const navigation = useNavigate();

  const CurrentRole = Cookies.get("role") || "user";

  console.log("CurrentRole", CurrentRole);
  const NavigationItem = SidebarNavigation(CurrentRole);

  const location = useLocation();

  return (
    <aside className="flex flex-col h-full border border-r-border">
      <img
        className="h-14 w-48 object-cover mt-4 mx-2"
        src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
      />
      <div className="flex flex-col gap-y-2 mr-2 mt-8 ml-1">
        {NavigationItem.map((item) => {
          return item?.isNavigate === true ? (
            <Link
              to={item?.link}
              key={item.id}
              className={cn(
                "hover:bg-muted hover:transition hover:delay-150 text-foreground w-full h-5 px-3 py-5 rounded-md flex items-center gap-2 text-sm font-medium",

                location.pathname.startsWith(item?.link)
                  ? "text-[#0246FB]! border-l-4 border-l-[#0246FB] font-bold bg-accent"
                  : "",

                item.id === "Profile" ? "flex items-center" : "",
              )}
            >
              <Icon className="size-6" icon={item.icon} />
              {item.label}
            </Link>
          ) : null;
        })}
      </div>
      <div className="mt-auto ml-3 mb-4 mr-2">
        {" "}
        <button
          onClick={() => {
            Cookies.remove("token");
            Cookies.remove("role");
            navigation("/auth/login");
          }}
          className="text-foreground w-full flex items-center gap-2 px-2 py-1 rounded-sm hover:text-red-400 hover:bg-accent"
        >
          <Icon className="size-5" icon="ic:baseline-logout" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
