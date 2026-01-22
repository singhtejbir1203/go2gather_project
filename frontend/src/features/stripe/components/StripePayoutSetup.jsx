import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import api from "@/services/api";

function StripePayoutSetup({ status }) {
  const startOnboarding = async () => {
    if (!status) await api.post("/stripe/connect/create");
    const res = await api.post("/stripe/connect/onboarding");
    window.location.href = res.data.url;
  };

  return (
    <div className="max-w-xl mx-auto mt-16 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">
        Set up payouts to publish rides
      </h2>

      <p className="text-gray-600 mb-6">
        To receive payments for rides, you need to securely add your bank
        details. This is handled by Stripe.
      </p>

      <div className="space-y-3 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600 h-4 w-4" />
          Payments handled securely
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-600 h-4 w-4" />
          No bank data stored on our servers
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-yellow-600 h-4 w-4" />
          Required before publishing rides
        </div>
      </div>

      <Button className="w-full" onClick={startOnboarding}>
        Set up payouts with Stripe
      </Button>
    </div>
  );
}

export default StripePayoutSetup;
