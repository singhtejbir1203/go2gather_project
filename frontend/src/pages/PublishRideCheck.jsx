import { useEffect, useState } from "react";
import api from "@/services/api";
import StripePayoutSetup from "@/features/stripe/components/StripePayoutSetup";
import PublishRide from "@/features/publish/components/PublishRide";
import { Spinner } from "@/components/ui/spinner";

function PublishRideCheck() {
  const [loading, setLoading] = useState(true);
  const [stripeStatus, setStripeStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get("/stripe/connect/status");
        setStripeStatus(res.data);
      } catch (err) {
        setStripeStatus(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (
    !stripeStatus ||
    !stripeStatus.chargesEnabled ||
    !stripeStatus.payoutsEnabled
  ) {
    return <StripePayoutSetup status={stripeStatus} />;
  }

  return <PublishRide />;
}

export default PublishRideCheck;
