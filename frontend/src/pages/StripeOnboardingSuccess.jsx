import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

function StripeOnboardingSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/stripe/connect/status").then(() => {
      navigate("/publish");
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Payout setup completed. Redirecting…</p>
    </div>
  );
}

export default StripeOnboardingSuccess;
