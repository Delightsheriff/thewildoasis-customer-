import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// The layout component is a wrapper that will be used to wrap all of our pages.
import "@/app/_styles/globals.css";

// The metadata object is used to define the title and description of the site. This will be used by the search engines to display information about the site.
export const metadata = {
  title: "The Wild Oasis",
  description: "Welcome to paradise",
};

// The layout component is a wrapper that will be used to wrap all of our pages.

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="bg-blue-600">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2024</p>
        </footer>
      </body>
    </html>
  );
}
