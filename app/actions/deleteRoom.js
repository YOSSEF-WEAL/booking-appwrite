"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";
import { Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

export default async function deleteRoom(roomId) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appwrite-session");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const { account, databases } = await createSessionClient(
      sessionCookie.value,
    );

    // Get user's ID
    const user = await account.get();
    const userID = user.$id;

    // Fetch users rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal("user_id", userID)],
    );

    // Find room to delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    // Delete the room

    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id,
      );

      // Revalidate my rooms and all rooms
      revalidatePath("/rooms/my", "layout");
      revalidatePath("/", "layout");

      return {
        success: true,
      };
    } else {
      return {
        error: "Room Not Found",
      };
    }
  } catch (error) {
    console.error("Faild to delete rooms", error);
    return {
      error: "Faild to delete room",
    };
  }
}
