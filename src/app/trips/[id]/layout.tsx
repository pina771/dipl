import TopBar from "../../components/TopBar";

const TripLayout = ({
  children,
  chat,
  params,
}: {
  children: React.ReactNode;
  chat: React.ReactNode;
  params: { id: string };
}) => {
  // TODO: Check if user is a member of trip
  // if not , then redirect him to /home
  return (
    <div className="h-full flex flex-col">
      <TopBar id={params.id} />
      <div className="flex h-full">
        <div className="flex flex-col flex-grow h-full justify-between max-w-prose p-2 pl-4">
          {children}
        </div>
        <div className="h-full flex-grow">{chat}</div>
      </div>
    </div>
  );
};
export default TripLayout;
