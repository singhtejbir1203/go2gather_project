import { Badge } from "@/components/ui/badge";

function RideStatusBadge({ status }) {
  const variant =
    status === "active"
      ? "default"
      : status === "cancelled"
        ? "destructive"
        : "secondary";

  return <Badge variant={variant}>{status.toUpperCase()}</Badge>;
}

export default RideStatusBadge;
