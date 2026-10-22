import DashboardBottom from "@/components/DashboardBottom";
import DashboardHeader from "@/container/DashboardHeader";
import SideBar from "@/container/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:h-screen lg:min-h-0 lg:flex-row">
      <aside className="hidden shrink-0 bg-sidebar text-primary-foreground lg:block lg:h-full lg:w-56">
        <SideBar />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-dashboard-main">
        <div className="h-16 w-full shrink-0 border-b border-border">
          <DashboardHeader />
        </div>

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto pb-20 text-2xl lg:pb-0">
          <Outlet />
        </main>

        <div className="fixed inset-x-0 bottom-0 z-50 bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
          <DashboardBottom />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
