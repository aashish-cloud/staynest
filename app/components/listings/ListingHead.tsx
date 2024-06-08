"use client";

import HeartButton from "@/app/components/HeartButton";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  currentUser?: User | null;
  id: string;
}

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  currentUser,
  id,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{`${location?.region}, ${location?.label}`}</p>
      <div className="rounded-xl overflow-hidden w-full h-[60vh] relative">
        <Image src={imageSrc} fill alt={`Image of ${location?.region}`} />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
