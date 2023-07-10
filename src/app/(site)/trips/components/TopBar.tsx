import { UserPlus } from "lucide-react";
import Link from "next/link";
import { getTripInfoAndMembers } from "../../../../lib/functions/trips";
import TripMembers from "./TripMembers";

const TopBar = async ({ id }: { id: string }) => {
  const tripInfo = await getTripInfoAndMembers(id);
  if (!tripInfo) throw new Error("Error with tripInfo in topBar");

  return (
    <div className="mx-2">
      <div className="flex justify-between items-center p-4">
        <ul className="flex">
          <li className="font-bold text-2xl ">
            <Link href={`/trips/${tripInfo.id}/main`}>{tripInfo.name}</Link>
          </li>
          <li className="font-bold text-2xl">
            <Link href={`/trips/${tripInfo.id}/map`} className="ml-4">
              Map
            </Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <TripMembers tripMembers={tripInfo.users} />
          <Link href={`/trips/${id}/add-member`}>
            <UserPlus size={28} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
