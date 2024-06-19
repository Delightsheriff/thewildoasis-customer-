"use server";

import { signIn } from "./auth";

///server actions

///sign in action
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
