"use server";

import { createSessionClient } from "@/config/appwrite";
import { cookies } from "next/headers";

export default async function destroySession() {
  // Retrieve the session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("appwrite-session");

  if (!sessionCookie) {
    return {
      error: "No Session Cookie found",
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    // Delete session
    await account.deleteSession("current");

    // Clear session cookie
    cookieStore.delete("appwrite-session");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Authentication Error:", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      type: error?.type,
      response: error?.response,
    });

    return {
      error: "Error Deleting Session",
    };
  }
}
