import React from "react";
import getSingleRoom from "@/app/actions/getSingleRoom";

import Heading from "@/components/Heading";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import RoomImage from "@/components/RoomImage";

export default async function RoomPage({ params }) {
  const { id } = await params;

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room Not Found" />;
  }

  return (
    <>
      <Heading title={room.name} />
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow">
        <Link
          href="/"
          className="mb-4 flex items-center text-zinc-400 hover:text-zinc-200"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="ml-2">Back to Rooms</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <RoomImage
            room={room}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="mb-4 text-zinc-400">{room.description}</p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-zinc-200">Size: </span>{" "}
                {room.sqft}
              </li>
              <li>
                <span className="mr-2 font-semibold text-zinc-200">
                  Availability:
                </span>
                {room.availability}
              </li>
              <li>
                <span className="font-semibold text-zinc-200">Price: </span>$
                {room.price_per_hour}/hour
              </li>
              <li>
                <span className="font-semibold text-zinc-200">Address: </span>{" "}
                {room.address}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm roomId={room.$id} />
      </div>
    </>
  );
}
