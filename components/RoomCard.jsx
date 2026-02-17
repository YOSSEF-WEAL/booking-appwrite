import Link from "next/link";
import React from "react";
import RoomImage from "./RoomImage";

function RoomCard({ room }) {
  return (
    <div className="mt-4 flex flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow sm:flex-row sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <RoomImage
          room={room}
          className="w-full sm:w-32 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
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
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/rooms/${room.$id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Room
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;
