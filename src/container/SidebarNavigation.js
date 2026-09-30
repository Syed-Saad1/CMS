export default function SidebarNavigation(role) {
  return [
    {
      id: "Dashboard",
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: "boxicons:dashboard",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "Users2",
      label: "Users",
      link: "/admin/users",
      icon: "ci:users",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "Courses",
      label: "Courses",
      link: "/admin/courses",
      icon: "flowbite:graduation-cap-outline",
      isNavigate: true,
    },

    {
      id: "profile",
      label: "Profile",
      link: "/admin/profile",
      icon: "iconamoon:profile",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "profile",
      label: "Profile",
      link: "/user/profile",
      icon: "iconamoon:profile",
      isNavigate: role === "user" ? true : false,
    },
  ];
}
