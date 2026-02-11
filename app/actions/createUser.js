"use server";
import { createAdminClient } from "@/config/appwrite";
import { ID } from "node-appwrite";

export default async function (previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!email || !name || !password) {
    return {
      error: "Please Fill in all fields",
    };
  }

  if (password.length < 8) {
    return {
      error: "Password must ba at least 8 characters long",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Password do not match",
    };
  }

  // Get account instance
  const { account } = await createAdminClient();
  try {
    // Create user
    await account.create(ID.unique(), email, password, name);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Registration Error: ", error);
    return {
      error: "Password do not match",
    };
  }
}
