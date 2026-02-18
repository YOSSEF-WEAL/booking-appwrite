"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";
import checkAuth from "./checkAuth";
import checkRoomAvailability from "./checkRoomAvailability";

export default async function bookRoom(previousState, formData) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    // Get user's ID
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to book a room",
      };
    }
    // Extract date and time from the formData
    const checkInDate = formData.get("check_in_date");
    const checkInTime = formData.get("check_in_time");
    const checkOutDate = formData.get("check_out_date");
    const checkOutTime = formData.get("check_out_time");
    const roomId = formData.get("room_id");

    // Combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;

    // Chack id room is available

    const bookingData = {
      // Appwrite collection schema uses these legacy attribute names.
      chack_in: checkInDateTime,
      chack_out: checkOutDateTime,
      user_id: user.id,
      rooms: roomId,
    };

    // create booking
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData,
    );

    // Revalidate cache
    revalidatePath("/bookings", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Failed to book room", error);
    return {
      error: "Something went wrong booking the room",
    };
  }
}
