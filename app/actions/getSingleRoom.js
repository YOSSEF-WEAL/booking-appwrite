"use server";

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

export default async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();

    // Fetch rooms
    const rooms = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id,
    );

    return rooms;
  } catch (error) {
    console.error("Faild to get room", error);
    redirect("/erorr");
    return [];
  }
}
