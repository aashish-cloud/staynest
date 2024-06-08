import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    title,
    description,
    price,
    location,
    imageSrc,
    category,
    roomCount,
    guestCount,
    bathroomCount,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      locationValue: location.value,
      imageSrc,
      category,
      roomCount,
      guestCount,
      bathroomCount,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
