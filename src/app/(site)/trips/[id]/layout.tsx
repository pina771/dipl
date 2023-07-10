import "@/app/leaflet/leaflet.css";
import Script from "next/script";
import TopBar from "../components/TopBar";

const Layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  return (
    <div className="h-full flex flex-col">
      <TopBar id={params.id} />

      {children}
      <Script src="/leaflet.js"></Script>
    </div>
  );
};
export default Layout;
