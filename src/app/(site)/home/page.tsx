import AddFriendForm from "@/app/(site)/home/components/AddFriendForm";
import { Suspense } from "react";
import { FriendsList } from "./components/FriendsList";
export const dynamic = "force-dynamic";

const Loading = () => {
  return (
    <div className=" w-full rounded-md h-72 max-w-sm bg-muted animate-pulse"></div>
  );
};

const HomeDashboard = async () => {
  return (
    <div className="w-full h-full">
      <div className="w-full max-w-sm">
        <h2>Friends</h2>
        <AddFriendForm />
        <div className="mt-4">
          <Suspense fallback={<Loading />}>
            <FriendsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default HomeDashboard;
