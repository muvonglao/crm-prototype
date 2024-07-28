"use server";

import { signIn } from "~/server/auth";
import { signOut } from "~/server/auth";

export async function googleLogin() {
  await signIn("google");
}

export async function logout() {
  await signOut();
}
