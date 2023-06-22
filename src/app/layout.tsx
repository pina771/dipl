import { Toaster } from "@/app/components/ui/toaster";
import { Inter } from "next/font/google";
import Provider from "./context/AuthContext";
import "./globals.css";
import SocketProvider from "./context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TripPlanner",
  description: "Organize and plan trips together.",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <SocketProvider>
            {children}
            {modal}
          </SocketProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
}
