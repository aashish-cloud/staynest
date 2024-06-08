import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import { getCurrentUser } from "@/actions/getCurrentUser";
import FavoriteClient from "./FavoriteClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized access" subtitle="Please login" />;
  }

  const listings = await getFavoriteListings();

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listing."
      />
    );
  }

  return <FavoriteClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
