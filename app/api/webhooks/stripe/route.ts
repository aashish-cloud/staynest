import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const signature = headers().get("stripe-signature") as string;
  let body = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET_KEY!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  let reservation;
  let relinquish_lock_id;

  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;

      if (!checkoutSessionCompleted.metadata)
        return NextResponse.json(
          { error: "Invalid metadata" },
          { status: 400 }
        );

      const { totalPrice, startDate, endDate, listingId, userId } =
        checkoutSessionCompleted.metadata;
      relinquish_lock_id = listingId;

      if (checkoutSessionCompleted.payment_status === "paid") {
        reservation = await prisma.reservation.create({
          data: {
            totalPrice: +totalPrice,
            startDate,
            endDate,
            listingId,
            userId,
          },
        });
      }

      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  await prisma.listing.update({
    where: { id: relinquish_lock_id },
    data: { lockToken: null },
  });

  // Return a 200 response to acknowledge receipt of the event
  if (!reservation)
    return NextResponse.json({ message: "Booking failed" }, { status: 400 });
  return NextResponse.json({ message: "Reservation made" }, { status: 201 });
}
