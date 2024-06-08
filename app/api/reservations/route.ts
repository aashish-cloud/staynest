import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { stripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser)
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );

    const body = await request.json();
    const { totalPrice, startDate, endDate, listingId } = body;

    if (!totalPrice || !startDate || !endDate || !listingId)
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });

    const lockToken = "lock-" + listingId;
    let checkout_url;

    await prisma.$transaction(async (prisma) => {
      // Try to acquire the lock by setting a unique lockToken
      // const lock = await prisma.listing.updateMany({
      //   where: { id: listingId, lockToken: null },
      //   data: { lockToken: lockToken },
      // });

      // If the lock is not acquired, throw an error
      // if (!lock) {
      //   throw new Error("Property is currently being booked by another user.");
      // }

      // Check for existing bookings that overlap with the desired dates
      const overlappingBooking = await prisma.reservation.findFirst({
        where: {
          listingId,
          OR: [
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
          ],
        },
      });

      if (overlappingBooking) {
        // Release the lock before throwing the error
        // await prisma.listing.update({
        //   where: { id: listingId },
        //   data: { lockToken: null },
        // });
        throw new Error("Property is already booked for the selected dates.");
      }

      // Proceed to payment if the booking can be made
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "INR",
              unit_amount: +totalPrice * 100,
              product_data: {
                name: "Have a nice vacation! 🏝️",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          totalPrice,
          startDate,
          endDate,
          listingId,
          userId: currentUser.id,
        },
        success_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/payment/success"
            : "https://staynest-mu.vercel.app/payment/success",
        cancel_url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/payment/cancel"
            : "https://staynest-mu.vercel.app/payment/cancel",
      });

      if (!session) throw new Error("Failed to create payment session");

      checkout_url = session.url;

      // return NextResponse.redirect(session.url as string);
      // const reservation = await prisma.reservation.create({
      //   data: {
      //     totalPrice,
      //     startDate,
      //     endDate,
      //     listingId,
      //     userId: currentUser.id,
      //   },
      // });

      // Release the lock
      // await prisma.listing.update({
      //   where: { id: listingId },
      //   data: { lockToken: null },
      // });
    });

    return NextResponse.json(checkout_url, { status: 201 });
  } catch (error: any) {
    console.error("Booking failed:", error.message);

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
