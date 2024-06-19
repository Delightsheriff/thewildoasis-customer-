import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account Page",
  description: "This is the account page",
};

export default async function Page() {
  const session = await auth();
  const firstName = session?.user?.name.split(" ")[0];

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName} !
    </h2>
  );
}
