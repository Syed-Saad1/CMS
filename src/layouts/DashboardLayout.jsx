import DashboardHeader from "@/container/DashboardHeader";
import SideBar from "@/container/SideBar";
import React from "react";

function DashboardLayout() {
  return (
    <div className="h-screen w-full flex">
      <div className=" w-56 shrink-0 text-primary-foreground bg-sidebar h-full">
        <SideBar />
      </div>
      <div className=" flex h-full w-full flex-col bg-dashboard-main">
        <div className=" h-16 w-full border-b border-b-border">
          <DashboardHeader />
        </div>
        <div className=" size-full flex justify-center items-center text-2xl">
          content
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
