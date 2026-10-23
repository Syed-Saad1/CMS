import DashboardHeader from "@/container/DashboardHeader";
import SideBar from "@/container/SideBar";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import DashboardBottom from "@/components/DashboardBottom";

function DashboardLayout() {
  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const location = useLocation();
  const isUsersPage = location.pathname === "/admin/users";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  if (!token) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-pink-900 xl:flex-row">
      <div className="hidden w-56 shrink-0 text-primary-foreground bg-sidebar xl:block xl:h-full">
        <SideBar />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-dashboard-main">
        <div className="h-16 w-full shrink-0 border-b border-b-border">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        </div>
        <div className={`min-h-0 min-w-0 flex-1 text-2xl ${isUsersPage ? "overflow-hidden" : "overflow-x-hidden overflow-y-auto scrollbar-thin"}`}>
          <Outlet />
        </div>
        <div className="fixed inset-x-0 bottom-0 z-50 bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
          <DashboardBottom />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
