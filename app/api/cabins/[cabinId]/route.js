import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

//creating custom APIs

export async function GET(request, { params }) {
  //   console.log(request);
  //   console.log(params);

  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch (error) {}

  return Response.json({ message: "Cabin not found" });
}
