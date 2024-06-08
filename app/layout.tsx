import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StayNest",
  description:
    "Discover and book unique stays and experiences hosted by local property owners, tailored for travelers seeking authentic and comfortable accommodations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar currentUser={currentUser} />
        <RentModal />
        <SearchModal />
        <div className="pb-20 pt-28">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
