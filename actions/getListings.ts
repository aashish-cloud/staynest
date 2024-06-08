import prisma from "@/lib/db";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      locationValue,
      category,
      startDate,
      endDate,
    } = params;

    let query: any = {};
    if (userId) query.userId = userId;
    if (guestCount)
      query.guestCount = {
        gte: +guestCount,
      };
    if (roomCount)
      query.roomCount = {
        gte: +roomCount,
      };
    if (bathroomCount)
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    if (locationValue) query.locationValue = locationValue;
    if (category) query.category = category;

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
