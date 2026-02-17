import Link from "next/link";
import React from "react";
import RoomImage from "./RoomImage";
import formatDate from "./FormatDate";

function BookedRoomCard({ booking }) {
  const room = booking?.rooms;

  return (
    <div className="mt-4 flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row sm:items-center">
      <div className="flex gap-3 items-center">
        <RoomImage
          room={room}
          className="w-full sm:w-20 sm:h-20 mb-3 sm:mb-0 object-cover rounded-lg"
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
      <div className="mt-2 flex w-full flex-col sm:mt-0 sm:w-auto sm:flex-row sm:space-x-2">
        <Link
          href={`/rooms/${room.$id}`}
          className="mb-2 w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:mb-0 sm:w-auto"
        >
          View Room
        </Link>
        <button
          type="button"
          className="w-full rounded bg-red-600 px-4 py-2 text-center text-white opacity-70 hover:bg-red-700 sm:w-auto"
        >
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

export default BookedRoomCard;
