import TopBar from "../../components/TopBar";

export const dynamic = "force-dynamic";
const TripLayout = ({
  children,
  chat,
}: {
  children: React.ReactNode;
  chat: React.ReactNode;
}) => {
  // TODO: Check if user is a member of trip
  // if not , then redirect him to /home
  return (
    <div className="h-full flex flex-col">
      <div className="flex h-full">
        <div className="flex flex-col h-full justify-between w-full max-w-prose p-2 pl-4 md:w-3/4">
          {children}
        </div>
        <div className="h-full flex-grow flex-shrink max-w-lg xl:first:mr-auto lg:mr-2  ">
          {chat}
        </div>
      </div>
    </div>
  );
};
export default TripLayout;
