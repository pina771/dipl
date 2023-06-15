import TopBar from "../../components/TopBar";

const TripLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  // TODO: Check if user is a member of trip
  // if not , then redirect him to /home
  return (
    <div>
      <TopBar id={params.id} />
      {children}
    </div>
  );
};
export default TripLayout;
