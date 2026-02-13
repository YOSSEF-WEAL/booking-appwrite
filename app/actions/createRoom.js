"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { revalidatePath } from "next/cache";

export default async function name(previousState, formData) {
  // Get DataBases instance
  const { databases } = await createAdminClient();
}
