"use client";

import { Listing, Reservation, User } from "@prisma/client";
import Container from "../components/Container";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import ListingCard from "../components/listings/ListingCard";

interface TripsClientProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser?: User | null;
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast("Reservation cancelled successfully!");
          router.refresh();
        })
        .catch((error) => {
          toast("Uh oh! Something went wrong.", {
            description: error?.response?.data?.error,
          });
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <h1 className="text-2xl font-bold">Trips</h1>
      <p className="text-muted-foreground">
        Where you&apos;ve been and where you&apos;re going?
      </p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
