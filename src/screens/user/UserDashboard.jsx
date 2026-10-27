import StudentDashboardMatrix from "@/components/StudentDashboardMatrix";
import StudentNoticedBoard from "@/components/StudentNoticedBoard";
import StudentRecentResult from "@/components/StudentRecentResult";

import WelcomeDashboard from "@/components/WelcomeDashboard";
import React from "react";

function UserDashboard() {
  return (
    <div className="w-full mb-18 md:mb-4 min-w-0 px-3 py-4 sm:px-6">
      <WelcomeDashboard />
      <StudentDashboardMatrix />
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-w-0 gap-4 mt-6">
        <StudentRecentResult />
        <StudentNoticedBoard />
      </div>
    </div>
  );
}

export default UserDashboard;
