import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  const property = await prisma.listing.delete({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(property);
}
