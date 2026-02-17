"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import checkAuth from "./checkAuth";

export default async function getMyBookings() {
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
        error: "You must be logged in to view bookings",
      };
    }

    // Fetch users bookings
    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal("user_id", user.id), Query.select(["*", "rooms.*"])],
    );

    return bookings;
  } catch (error) {
    console.error("Faild to get bookings", error);
    return {
      error: "Failed to get bookings",
    };
  }
}
