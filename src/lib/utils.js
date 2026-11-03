import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ROLE_DASHBOARDS = {
  ADMIN: "/admin/dashboard",
  USER: "/dashboard",
  TEACHER: "/teacher/dashboard",
};

export const getDashboardPath = (role) => {
  return ROLE_DASHBOARDS[role] || "/";
};
