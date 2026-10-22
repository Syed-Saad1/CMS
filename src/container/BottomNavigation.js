import { LayoutDashboard, Users, BookOpen, UserRound } from "lucide-react";

export default function BottomItems(role) {
  return [
    {
      id: "AdminDashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      isNavigate: role === "admin",
      icon: LayoutDashboard,
    },
    {
      id: "UserDashboard",
      label: "Dashboard",
      path: "/user/dashboard",
      isNavigate: role === "user",
      icon: LayoutDashboard,
    },
    {
      id: "Users",
      label: "Users",
      path: "/admin/users",
      isNavigate: role === "admin",
      icon: Users,
    },
    {
      id: "Courses",
      label: "Courses",
      path: "/courses",
      isNavigate: role === "admin" || role === "user",
      icon: BookOpen,
    },
    {
      id: "AdminProfile",
      label: "Profile",
      path: "/admin/profile",
      isNavigate: role === "admin",
      icon: UserRound,
    },
    {
      id: "UserProfile",
      label: "Profile",
      path: "/user/profile",
      isNavigate: role === "user",
      icon: UserRound,
    },
  ];
}
