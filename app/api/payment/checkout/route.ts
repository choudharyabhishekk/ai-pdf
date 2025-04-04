import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error("Stripe secret key is not defined");
  }
  const stripe = new Stripe(stripeSecretKey);
  const { priceId } = await req.json();
  console.log(priceId, stripeSecretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOST_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.HOST_URL}/dashboard/upgrade`,
  });
  return NextResponse.json({ session });
}
