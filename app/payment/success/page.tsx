import EmptyState from "@/app/components/EmptyState";
import { XCircle } from "lucide-react";

const SuccessPage = () => {
  return (
    <EmptyState
      success
      title="Payment Successful"
      subtitle="Visit the My Trips page to check your bookings"
    />
  );
};

export default SuccessPage;
