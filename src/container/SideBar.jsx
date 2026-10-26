import { Icon } from "@iconify/react";
import { X } from "lucide-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import SidebarNavigation from "./MockData/SidebarNavigation";
import { useTranslation } from "react-i18next";
function SideBar({ onClose }) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation = useNavigate();

  const CurrentRole = Cookies.get("role") || "user";

  const NavigationItem = SidebarNavigation(CurrentRole, t);

  const location = useLocation();

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
        <button
          onClick={() => {
            Cookies.remove("token");
            navigation("/auth/login");
            Cookies.remove("role");
            Cookies.remove("userId");
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
        >
          <Icon className="size-5" icon="ic:baseline-logout" />
          {t("common.logout")}
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
