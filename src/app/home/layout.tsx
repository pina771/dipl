import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
};
export default Layout;
