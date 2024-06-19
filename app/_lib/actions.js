"use server";

import { signIn, signOut } from "./auth";

///server actions

///sign in action
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

///sign out action
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
