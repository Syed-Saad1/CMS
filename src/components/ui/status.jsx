import { Badge } from "@/components/ui/badge";

const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 dark:bg-green-800/20 text-green-700 hover:bg-green-100",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] ?? statusConfig.inactive;

  return <Badge className={config.className}>{config.label}</Badge>;
}
