"use server";

import { cookies } from "next/headers";

export async function login(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  const username = formData.get("username");
  const password = formData.get("password");
  const cookieStore = await cookies();

  try {
    const response = await fetch("http://localhost:5000/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
      return { success: false, message: errorData.message };
    }

    const data = await response.json();
    const jwtToken = data.access_token;
    cookieStore.set({
      name: "access_token",
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.error("Request failed:", error);
    return { success: false, message: "An unexpected error occurred!" };
  }
}
