import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const roleStyles = {
  admin: "bg-red-100 text-red-700 border-red-200",
  teacher: "bg-blue-100 dark:bg-blue-200 text-blue-700 border-blue-200",
  student: "bg-green-100 text-green-700 border-green-200",
  user: "bg-gray-100 text-gray-700 border-gray-200",
};

export const RoleBadge = ({ role }) => {
  const roleKey = role?.toLowerCase();

  return (
    <Badge
      variant="outline"
      className={cn(
        "capitalize font-medium",
        roleStyles[roleKey] || "bg-gray-100 text-gray-700 border-gray-200",
      )}
    >
      {role || "Unknown"}
    </Badge>
  );
};
