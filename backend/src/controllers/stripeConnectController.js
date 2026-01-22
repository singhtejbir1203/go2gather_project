import stripe from "../config/stripe.js";
import User from "../models/User.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const createStripeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.stripeAccountId) {
      const err = new Error("Stripe account already exists");
      err.statusCode = 400;
      throw err;
    }

    let account;
    try {
      account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: user.email,
        capabilities: {
          transfers: { requested: true },
        },
      });
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    user.stripeAccountId = account.id;
    await user.save();

    logDbOperation({
      operation: "UPDATE",
      model: "User",
      documentId: user._id,
      userId: req.user._id,
    });

    res.json({
      stripeAccountId: account.id,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const createStripeOnboardingLink = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.stripeAccountId) {
      const err = new Error("Stripe account not created");
      err.statusCode = 400;
      throw err;
    }

    let accountLink;
    try {
      accountLink = await stripe.accountLinks.create({
        account: user.stripeAccountId,
        refresh_url: `${process.env.FRONTEND_URL}/payouts/refresh`,
        return_url: `${process.env.FRONTEND_URL}/payouts/success`,
        type: "account_onboarding",
      });
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    res.json({ url: accountLink.url });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const syncStripeAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.stripeAccountId) {
      const err = new Error("Stripe account not created");
      err.statusCode = 400;
      throw err;
    }

    let account;
    try {
      account = await stripe.accounts.retrieve(user.stripeAccountId);
    } catch (err) {
      err.statusCode = 502;
      throw err;
    }

    user.stripeDetailsSubmitted = account.details_submitted;
    user.stripeChargesEnabled = account.charges_enabled;
    user.stripePayoutsEnabled = account.payouts_enabled;

    await user.save();

    logDbOperation({
      operation: "UPDATE",
      model: "User",
      documentId: user._id,
      userId: req.user._id,
    });

    res.json({
      detailsSubmitted: account.details_submitted,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      requirements: account.requirements,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
