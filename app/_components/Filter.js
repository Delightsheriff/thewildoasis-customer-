"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

//filtering the cabins based on the filter
function Filter() {
  //getting the flter from the searchParams URL stored on the server component

  const searchParams = useSearchParams();
  //router is a hook that gives us access to the router object
  //router object has a replace method that allows us to change the URL
  const router = useRouter();
  //usePathname is a hook that gives us access to the current pathname
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    //URLSearchParams is a built-in object that allows us to easily manipulate the URL
    const params = new URLSearchParams(searchParams);

    //setting the capacity parameter to the filter value
    params.set("capacity", filter);
    //replacing the current URL with the new URL that includes the capacity parameter
    router.replace(`${pathname}?${params.toString()}`, { shallow: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
export default Filter;
