import Link from "next/link";
import React from "react";
import RoomImage from "./RoomImage";

function RoomCard({ room }) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row sm:items-center">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:space-x-4">
        <RoomImage
          room={room}
          className="h-40 w-full rounded-lg object-cover sm:h-24 sm:w-32"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-zinc-100">{room.name}</h4>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200"> Address:</span> 555
            {room.address}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200"> Availability:</span>9
            AM
            {room.availability}
          </p>
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-200"> Price:</span>$
            {room.price_per_hour}/hour
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col sm:w-auto sm:flex-row sm:space-x-2">
        <Link
          href={`/rooms/${room.$id}`}
          className="w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:w-auto"
        >
          View Room
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
