import { Elements } from "@stripe/react-stripe-js";
import stripePromise from "@/config/stripe";
import StripeCheckoutForm from "./StripeCheckoutForm";

function StripeCheckout({ clientSecret, onSuccess }) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripeCheckoutForm onSuccess={onSuccess} />
    </Elements>
  );
}

export default StripeCheckout;
