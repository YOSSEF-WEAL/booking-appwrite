"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import bookRoom from "@/app/actions/bookRoom";

function BookingForm({ roomId }) {
  const [state, formAction] = useActionState(bookRoom, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room has been booked!");
      router.push("/bookings");
    }
  }, [state, router]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-zinc-100">Book this Room</h2>
      <form action={formAction} className="mt-4">
        <input type="hidden" name="room_id" value={roomId} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="check_in_date"
              className="block text-sm font-medium text-zinc-300"
            >
              Check-In Date
            </label>
            <input
              type="date"
              id="check_in_date"
              name="check_in_date"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="check_in_time"
              className="block text-sm font-medium text-zinc-300"
            >
              Check-In Time
            </label>
            <input
              type="time"
              id="check_in_time"
              name="check_in_time"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="check_out_date"
              className="block text-sm font-medium text-zinc-300"
            >
              Check-Out Date
            </label>
            <input
              type="date"
              id="check_out_date"
              name="check_out_date"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="check_out_time"
              className="block text-sm font-medium text-zinc-300"
            >
              Check-Out Time
            </label>
            <input
              type="time"
              id="check_out_time"
              name="check_out_time"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 "
          >
            Book Room
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookingForm;
