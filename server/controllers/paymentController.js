import catchAsyncError from "../middleware/catchAsyncError.js";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51MZDSwLcqRf3mwTWgOGAUCLFmoVWpnpvykYykGMTUn9RlyDKeGbOPJYCnvVSeykOKy0iAjcGiEFlAOqq5Ks55ueU00v0qp75Zj"
);

export const processPayment = catchAsyncError(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
  });
  res.status(200).json({
    success: true,
    client_secret: myPayment.client_secret,
  });
});

export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .json({
      stripeApiKey:
        "pk_test_51MZDSwLcqRf3mwTWY8m2gvmxU0PAg7wdb4M5R9oi7jEyPIFQkIvNbv5xekEHeKJwtRiWT3NAOOgtzXn9ohgyrwAG00W0ItrRHr",
    });
});
