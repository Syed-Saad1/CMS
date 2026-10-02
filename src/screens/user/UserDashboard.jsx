import StudentDashboardMatrix from "@/components/StudentDashboardMatrix";
import StudentNoticedBoard from "@/components/StudentNoticedBoard";
import StudentRecentResult from "@/components/StudentRecentResult";

import WelcomeDashboard from "@/components/WelcomeDashboard";
import React, { useState } from "react";

function UserDashboard() {
  return (
    <div className="mt-16 mx-6 h-full w-full bg ">
      <WelcomeDashboard />
      <StudentDashboardMatrix />
      <div className="grid grid-cols-2 w-full gap-4  mt-6">
        <StudentRecentResult />
        <StudentNoticedBoard />
      </div>
    </div>
  );
}

export default UserDashboard;
