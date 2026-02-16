"use client";

import Heading from "@/components/Heading";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createRoom from "@/app/actions/createRoom";

export default function AddRoomPage() {
  const [state, formAction] = useActionState(createRoom, {});
  const router = useRouter();
  const labelClass = "mb-2 block font-bold text-zinc-200";
  const inputClass =
    "w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 placeholder-zinc-400";

  useEffect(() => {
    if (state.error) toast.error(state.error);

    if (state.success) {
      toast.success("Room created successfully!");
      router.push("/");
    }
  }, [state]);

  return (
    <>
      <Heading title="Add Room" />

      <div className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <form action={formAction}>
          <div className="mb-4">
            <label htmlFor="name" className={labelClass}>
              Room Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={inputClass}
              placeholder="Enter a name (Large Conference Room)"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className={`${inputClass} h-24`}
              placeholder="Enter a description for the room"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="sqft" className={labelClass}>
              Square Feet
            </label>
            <input
              type="number"
              id="sqft"
              name="sqft"
              className={inputClass}
              placeholder="Enter room size in ft"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="capacity" className={labelClass}>
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              className={inputClass}
              placeholder="Number of people the room can hold"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price_per_hour" className={labelClass}>
              Price Per Hour
            </label>
            <input
              type="number"
              id="price_per_hour"
              name="price_per_hour"
              className={inputClass}
              placeholder="Enter price per hour"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className={labelClass}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className={inputClass}
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className={inputClass}
              placeholder="Location (Building, Floor, Room)"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="availability" className={labelClass}>
              Availability
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
              className={inputClass}
              placeholder="Availability (Monday - Friday, 9am - 5pm)"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amenities" className={labelClass}>
              Amenities
            </label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              className={inputClass}
              placeholder="Amenities CSV (projector, whiteboard, etc.)"
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="image" className={labelClass}>
              Image
            </label>

            <input
              type="file"
              id="image"
              name="image"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
