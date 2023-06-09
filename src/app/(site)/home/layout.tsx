import { Sidebar } from "../../components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
};
export default HomeLayout;
