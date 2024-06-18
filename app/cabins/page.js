import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

export const metadata = {
  title: "Cabins",
  description: "Find your perfect cabin",
};

// this makes the page dynamic, basicalling telling Next.js to revalidate the page every 0 seconds
export const revalidate = 3600;
// export const revalidate = 15;

//typical server component
//storing states in the server through the searchParams URL

export default function Page({ searchParams }) {
  // console.log(searchParams);

  //getting the capacity parameter from the URL{the data stored in the server component}
  const filter = searchParams?.capacity ?? "all";

  // console.log(filter);

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* //Suspense is a react component that allows you to wrap around a component that is loading data, and it will show a fallback component until the data is loaded */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
