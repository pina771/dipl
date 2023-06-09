import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import { SessionProvider } from "next-auth/react";
import Provider from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripPlanner",
  description: "Organize and plan trips together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <ToasterContext />
        </Provider>
      </body>
    </html>
  );
}
