"use server";

export default async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Please fill out all fields" };
  }

  console.log("🚀 ~ createSession ~ email:", email);
  console.log("🚀 ~ createSession ~ password:", password);
}
