import { Icon } from "@iconify/react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import SidebarNavigation from "../container/SidebarNavigation";
function SideBar() {
  const { theme } = useTheme();

  const navigation = useNavigate();

  const CurrentRole = Cookies.get("role") || "user";

  const NavigationItem = SidebarNavigation(CurrentRole);

  const location = useLocation();

  return (
    // <aside className="flex flex-col h-full border border-r-border">
    //   <div className="flex justify-start items-start">
    //     <img
    //       className="h-14 w-44 object-contain mt-3 text-primary! cursor-pointer"
    //       src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
    //     />
    //   </div>
    //   <div className="flex flex-col gap-y-2 mr-2 mt-4 ml-1">
    //     {NavigationItem.map((item) => {
    //       return item?.isNavigate === true ? (
    //         <Link
    //           to={item?.link}
    //           key={item.id}
    //           className={cn(
    //             "hover:transition hover:delay-100 text-foreground w-full h-5 px-3 py-5 rounded-md flex items-center gap-2 text-sm font-medium",

    //             location.pathname.startsWith(item?.link)
    //               ? "text-primary-foreground! font-bold bg-primary"
    //               : "hover:bg-accent hover:text-accent-foreground",

    //             item.id === "Profile" ? "flex items-center" : "",
    //           )}
    //         >
    //           <Icon className="size-6" icon={item.icon} />
    //           {item.label}
    //         </Link>
    //       ) : null;
    //     })}
    //   </div>
    //   <div className="mt-auto ml-3 mb-4 mr-2">
    //     {" "}
    //     <button
    //       onClick={() => {
    //         Cookies.remove("token");
    //         Cookies.remove("role");
    //         navigation("/auth/login");
    //       }}
    //       className="text-foreground w-full flex items-center gap-2 px-2 py-1 rounded-sm hover:text-red-400 hover:bg-accent"
    //     >
    //       <Icon className="size-5" icon="ic:baseline-logout" />
    //       Logout
    //     </button>
    //   </div>
    // </aside>

    <aside
      className="
      flex flex-col h-screen
      w-64
      shrink-0
      border-r border-border
      transition-all duration-300
      max-md:w-20
      max-sm:w-20
    "
    >
      <div className="flex items-center justify-center h-20 shrink-0">
        <img
          className="
          h-14 w-44
          object-contain
          cursor-pointer
          max-md:w-12
          max-md:h-12
        "
          src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
          alt="Logo"
        />
      </div>

      <nav className="flex flex-col gap-y-2 px-2 mt-2 overflow-y-auto overflow-x-hidden">
        {NavigationItem.map((item) => {
          if (!item?.isNavigate) return null;

          const isActive = location.pathname.startsWith(item?.link);

          return (
            <Link
              to={item?.link}
              key={item.id}
              title={item.label}
              className={cn(
                `
                w-full
                min-h-10
                px-3
                py-2.5
                rounded-md
                flex
                items-center
                gap-3
                text-sm
                font-medium
                whitespace-nowrap
                transition-colors

                max-md:justify-center
                max-md:px-2
              `,
                isActive
                  ? "text-primary-foreground! font-bold bg-primary"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" icon={item.icon} />

              <span className="truncate max-md:hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-2 shrink-0">
        <button
          onClick={() => {
            Cookies.remove("token");
            Cookies.remove("role");
            navigation("/auth/login");
          }}
          title="Logout"
          className="
          text-foreground
          w-full
          min-h-10
          flex
          items-center
          gap-3
          px-3
          py-2
          rounded-md
          text-sm
          font-medium
          transition-colors
          hover:text-red-400
          hover:bg-accent

          max-md:justify-center
          max-md:px-2
        "
        >
          <Icon className="size-5 shrink-0" icon="ic:baseline-logout" />

          <span className="max-md:hidden">Logout</span>
        </button>
      </div>
    </aside>
    // <aside className="flex flex-col h-full border border-r-border w-64 md:w-20 lg:w-64">
    //   <div className="flex justify-start items-start">
    //     <img
    //       className="h-14 w-44 object-contain mt-3 text-primary! cursor-pointer md:w-12 lg:w-44"
    //       src={theme === "light" ? "/lightlogo.png" : "/darklogo.png"}
    //       alt="Logo"
    //     />
    //   </div>

    //   <div className="flex flex-col gap-y-2 mr-2 mt-4 ml-1">
    //     {NavigationItem.map((item) => {
    //       return item?.isNavigate === true ? (
    //         <Link
    //           to={item?.link}
    //           key={item.id}
    //           title={item.label}
    //           className={cn(
    //             "hover:transition hover:delay-100 text-foreground w-full h-5 px-3 py-5 rounded-md flex items-center gap-2 text-sm font-medium",

    //             "md:justify-center md:px-2 lg:justify-start lg:px-3",

    //             location.pathname.startsWith(item?.link)
    //               ? "text-primary-foreground! font-bold bg-primary"
    //               : "hover:bg-accent hover:text-accent-foreground",

    //             item.id === "Profile" ? "flex items-center" : "",
    //           )}
    //         >
    //           <Icon className="size-6 shrink-0" icon={item.icon} />

    //           <span className="md:hidden lg:inline">{item.label}</span>
    //         </Link>
    //       ) : null;
    //     })}
    //   </div>

    //   <div className="mt-auto ml-3 mb-4 mr-2">
    //     <button
    //       onClick={() => {
    //         Cookies.remove("token");
    //         Cookies.remove("role");
    //         navigation("/auth/login");
    //       }}
    //       title="Logout"
    //       className="text-foreground w-full flex items-center gap-2 px-2 py-1 rounded-sm hover:text-red-400 hover:bg-accent md:justify-center lg:justify-start"
    //     >
    //       <Icon className="size-5 shrink-0" icon="ic:baseline-logout" />

    //       <span className="md:hidden lg:inline">Logout</span>
    //     </button>
    //   </div>
    // </aside>
  );
}

export default SideBar;
