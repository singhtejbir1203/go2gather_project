import stripe from "../config/stripe.js";
import Booking from "../models/Booking.js";
import RevenueTransaction from "../models/RevenueTransaction.js";
import Ride from "../models/Ride.js";
import User from "../models/User.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log("hey");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded":
      await handlePaymentIntentSucceeded(event.data.object);
      break;

    case "account.updated":
      {
        const account = event.data.object;

        const user = await User.findOne({
          stripeAccountId: account.id,
        });

        if (user) {
          user.stripeDetailsSubmitted = account.details_submitted;
          user.stripeChargesEnabled = account.charges_enabled;
          user.stripePayoutsEnabled = account.payouts_enabled;

          await user.save();
        }
      }
      break;

    default:
      break;
  }

  res.json({ received: true });
};

async function handlePaymentIntentSucceeded(paymentIntent) {
  // Find booking linked to this payment
  const booking = await Booking.findOne({
    paymentIntentId: paymentIntent.id,
  });

  if (!booking) return;

  // Prevent duplicate revenue records (important)
  const exists = await RevenueTransaction.findOne({
    bookingId: booking._id,
  });
  if (exists) return;

  const ride = await Ride.findById(booking.rideId);

  const grossAmount = booking.totalAmount;
  const platformFee = Math.round(grossAmount * 0.25);
  const driverPayout = grossAmount - platformFee;

  await RevenueTransaction.create({
    bookingId: booking._id,
    rideId: ride._id,
    passengerId: booking.userId,
    driverId: ride.driverId,

    stripePaymentIntentId: paymentIntent.id,
    stripeChargeId: paymentIntent.latest_charge,

    grossAmount,
    platformFee,
    driverPayout,

    paidAt: new Date(paymentIntent.created * 1000),
  });
}
