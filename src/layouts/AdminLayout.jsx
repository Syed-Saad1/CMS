import DashboardHeader from "@/container/DashboardHeader";
import SideBar from "@/container/SideBar";
import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col lg:h-screen lg:min-h-0 lg:flex-row">
      <div className="w-full shrink-0 text-primary-foreground bg-sidebar lg:h-full lg:w-56">
        <SideBar />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-dashboard-main">
        <div className=" h-16 w-full border-b border-b-border">
          <DashboardHeader />
        </div>
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto text-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
