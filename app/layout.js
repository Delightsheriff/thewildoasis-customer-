import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

//importing fonts
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
// console.log(josefin);

// The layout component is a wrapper that will be used to wrap all of our pages.
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

// The metadata object is used to define the title and description of the site. This will be used by the search engines to display information about the site.
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s - The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel located in the heart of the Italian Domolites, surrounded by beautiful mountains and forests.",
};

// The layout component is a wrapper that will be used to wrap all of our pages.

export default function RootLayout({ children }) {
  return (
    <html>
      <body
        className={`${josefin.className} antialiased bg-primary-900 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
