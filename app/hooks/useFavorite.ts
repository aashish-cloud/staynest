import { User } from "@prisma/client";
import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return toast("Uh oh! Something went wrong.", {
          description: "You need to log in to continue!",
        });
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }

        await request();
        router.refresh();
        toast(
          `${
            hasFavorited ? "Removed from" : "Added to"
          } favorites successfully!`
        );
      } catch (error: any) {
        toast("Uh oh! Something went wrong.", {
          description: "Please try again later!",
        });
      }
    },
    [listingId, currentUser, router, hasFavorited]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
