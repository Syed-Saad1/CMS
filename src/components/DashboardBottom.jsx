import { NavLink } from "react-router-dom";
import BottomItems from "@/container/BottomNavigation";
import Cookies from "js-cookie";

export default function DashboardBottom() {
  const role = Cookies.get("role");

  const Bottom = BottomItems(role).filter((item) => item.isNavigate === true);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="mx-auto grid h-16 max-w-lg grid-cols-4 items-center px-1">
        {Bottom.map(({ id, label, path, icon: Icon }) => (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) =>
              `flex h-full flex-col items-center justify-center gap-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex size-9 items-center justify-center rounded-xl ${
                    isActive ? "bg-primary/10" : ""
                  }`}
                >
                  <Icon size={21} strokeWidth={isActive ? 2.4 : 1.8} />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
