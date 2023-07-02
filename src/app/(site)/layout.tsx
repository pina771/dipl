import { Sidebar } from "../components/sidebar/Sidebar";

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default SiteLayout;
