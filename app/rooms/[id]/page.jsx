import React from "react";
import getSingleRoom from "@/app/actions/getSingleRoom";

import Heading from "@/components/Heading";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import RoomImage from "@/components/RoomImage";
import checkAuth from "@/app/actions/checkAuth";

export default async function RoomPage({ params }) {
  const { id } = await params;
  const { isAuthenticated } = await checkAuth();

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
            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-zinc-200">
                  Description:{" "}
                </span>{" "}
                {room.description}
              </li>
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

        {isAuthenticated ? (
          <BookingForm roomId={room.$id} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-2 mt-6 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
            <h3 className="text-lg font-semibold text-zinc-100">
              Login Required
            </h3>
            <p className="mt-2 text-sm text-zinc-400">
              You need to login first to book this room.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="w-full rounded bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-700 sm:w-auto"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-full rounded border border-zinc-700 px-4 py-2 text-center text-zinc-100 hover:bg-zinc-800 sm:w-auto"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
