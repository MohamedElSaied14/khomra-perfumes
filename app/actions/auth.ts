"use server";

import { signIn, signOut } from "@/auth";

/**
 * Sign-in must be a POST (NextAuth v5 protects the endpoint with a CSRF token),
 * which is why this runs as a server action instead of a plain link.
 */
export async function signInWithGoogle(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") || "/");
  await signIn("google", { redirectTo: redirectTo.startsWith("/") ? redirectTo : "/" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
