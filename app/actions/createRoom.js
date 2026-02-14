"use server";

import { createAdminClient } from "@/config/appwrite";
import checkAuth from "./checkAuth";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { revalidatePath } from "next/cache";

export default async function createRoom(previousState, formData) {
  // Get DataBases instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: "You must be logged to create a room",
      };
    }

    // Uploading image
    let imageID;
    const image = formData.get("image");

    if (image && image.size > 0 && image.name !== "undefined") {
      try {
        const bucketId = process.env.NEXT_PUBLIC_APPWRITE_ROOMS_STORAGE_BUCKET;
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const file = InputFile.fromBuffer(imageBuffer, image.name);

        // Upload
        const response = await storage.createFile(bucketId, ID.unique(), file);
        imageID = response.$id;
      } catch (error) {
        console.error("Error Uploading Image", error);
        return {
          error: "Error Uploading image",
        };
      }
    } else {
      console.log("No image file provided or file is invalid");
    }

    // create rrom
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get("name"),
        description: formData.get("description"),
        sqft: formData.get("sqft"),
        capacity: formData.get("capacity"),
        availability: formData.get("availability"),
        address: formData.get("address"),
        price_per_hour: formData.get("price_per_hour"),
        image: imageID,
      },
    );

    revalidatePath("/", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error?.response?.message || error?.message || "An unexpected error has occured";
    return {
      error: errorMessage,
    };
  }
}
