import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ExternalLink } from "lucide-react";

function PendingVehicleCard({
  vehicle,
  onApprove,
  onReject,
  approving,
  rejecting,
}) {
  const { userId, modelId, plateNumber, licenseFile } = vehicle;

  return (
    <div className="border rounded-lg bg-white p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="text-lg font-semibold">
            {userId.name} ({userId.email})
          </div>

          <div className="text-sm text-gray-600">
            Vehicle:{" "}
            <span className="font-medium">
              {modelId.brandId.name} {modelId.name}
            </span>
          </div>

          <div className="text-sm">
            Plate Number: <span className="font-mono">{plateNumber}</span>
          </div>

          <Badge variant="secondary">Approval Pending</Badge>
        </div>

        {licenseFile && (
          <a
            href={licenseFile}
            target="_blank"
            rel="noreferrer"
            className="text-primary flex items-center gap-1 text-sm"
          >
            View License
            <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          onClick={onApprove}
          disabled={approving}
          className="flex items-center gap-2"
        >
          <CheckCircle size={16} />
          Approve
        </Button>

        <Button
          variant="destructive"
          onClick={onReject}
          disabled={rejecting}
          className="flex items-center gap-2"
        >
          <XCircle size={16} />
          Reject
        </Button>
      </div>
    </div>
  );
}

export default PendingVehicleCard;
