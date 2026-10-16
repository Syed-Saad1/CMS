export default function SidebarNavigation(role, t = (value) => value) {
  return [
    {
      id: "Dashboard",
      label: t("common.dashboard"),
      link: "/user/dashboard",
      icon: "boxicons:dashboard",
      isNavigate: role === "user" ? true : false,
    },
    {
      id: "Dashboard",
      label: t("common.dashboard"),
      link: "/admin/dashboard",
      icon: "boxicons:dashboard",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "Users2",
      label: t("common.users"),
      link: "/admin/users",
      icon: "ci:users",
      isNavigate: role === "admin" ? true : false,
    },
    {
      id: "Courses",
      label: t("common.courses"),
      link: "/courses",
      icon: "flowbite:graduation-cap-outline",
      isNavigate: true,
    },

    {
      id: "profile",
      label: t("common.profile"),
      link: "/admin/profile",
      icon: "iconamoon:profile",
      isNavigate: role === "admin" ? true : false,
    },

    {
      id: "profile",
      label: t("common.profile"),
      link: "/user/profile",
      icon: "iconamoon:profile",
      isNavigate: role === "user" ? true : false,
    },
  ];
}
