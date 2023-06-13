import "./globals.css";
import { Inter } from "next/font/google";
import ToasterContext from "./context/ToasterContext";
import Provider from "./context/AuthContext";
import { Sidebar } from "./components/Sidebar";

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
          <div className="flex">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
          {modal}
          <ToasterContext />
        </Provider>
      </body>
    </html>
  );
}
