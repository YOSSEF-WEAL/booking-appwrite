"use client";

import cancelBooking from "@/app/actions/cancelBooking";
import { toast } from "react-toastify";

function CancelBookingButton({ bookingId }) {
  const handleCancelBooking = async () => {
    if (!confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        toast.success("Booking cancelled successfully!");
      }
    } catch (error) {
      console.log("Failed to cancel booking", error);
      return {
        error: "Failed to cancel booking",
      };
    }
  };

  return (
    <button
      onClick={handleCancelBooking}
      type="button"
      className="w-full cursor-pointer rounded bg-red-600 px-4 py-2 text-center text-white hover:bg-red-700 sm:w-auto"
    >
      Cancel Booking
    </button>
  );
}

export default CancelBookingButton;
