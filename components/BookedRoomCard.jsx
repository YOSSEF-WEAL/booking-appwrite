import Link from "next/link";
import React from "react";
import RoomImage from "./RoomImage";
import formatDate from "./FormatDate";
import CancelBookingButton from "./CancelBookingButton";

function BookedRoomCard({ booking }) {
  const room = booking?.rooms;

  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row sm:items-center">
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <RoomImage
          room={room}
          className="h-40 w-full rounded-lg object-cover sm:h-20 sm:w-20"
        />
        <div>
          <h4 className="text-lg font-semibold text-zinc-100">{room.name}</h4>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200">Check In:</span>{" "}
            {formatDate(booking?.chack_in)}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200">Check Out:</span>{" "}
            {formatDate(booking?.chack_out)}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-0 sm:space-x-2">
        <Link
          href={`/rooms/${room.$id}`}
          className="w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:w-auto"
        >
          View Room
        </Link>

        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
}

export default BookedRoomCard;
