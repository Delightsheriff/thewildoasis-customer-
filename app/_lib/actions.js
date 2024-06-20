"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

///server actions

///sign in action
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

///sign out action
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile"); // revalidate the profile page {refetching the updated data}
}

//deleting reservations
export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You are not authorized to delete this booking");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations"); // revalidate the reservations page {refetching the updated data}
}

//updating reservations
export async function updateReservation(formData) {
  // console.log(formData);

  //AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //AUTHORIZATION
  const reservationId = Number(formData.get("reservationId"));
  const guestReservations = await getBookings(session.user.guestId);
  // console.log(guestBookings);
  const guestBookingIds = guestReservations.map((booking) => booking.id);

  if (!guestBookingIds.includes(reservationId)) {
    throw new Error("You are not authorized to edit this booking");
  }

  //BUSINESS UPDATE LOGIC
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000);

  const updateData = { numGuests, observations };

  //MUTATION
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", reservationId);
  // .select()
  // .single();

  //ERROR HANDLING
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  //REVALIDATION
  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath("/account/reservations"); // revalidate the reservations page {refetching the updated data}

  //REDIRECT
  redirect("/account/reservations");
}
