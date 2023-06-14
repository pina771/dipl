import { Trip } from "@prisma/client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import TripMembers from "./TripMembers";
import { getTripInfo } from "../../lib/functions/getTripInfo";
import { PlusCircle } from "lucide-react";

const TopBar = async ({ id }: { id: string }) => {
  const tripInfo = await getTripInfo(id);
  if (!tripInfo) throw new Error("Error with tripInfo in topBar");

  return (
    <div className=" bg-slate-100 ">
      <div className="flex justify-between items-center p-4">
        <ul className="flex text-2xl">
          <li>
            <Link href={`/trips/${tripInfo.id}`}>{tripInfo.name}</Link>
          </li>
          <li>
            <Link href={`/trips/${tripInfo.id}/map`}>Map</Link>
          </li>
        </ul>
        <div className="flex gap-4 items-center">
          <TripMembers tripMembers={tripInfo.users} />
          <Link href={`/trips/${id}/add-member`}>
            <PlusCircle className="h-8 w-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default TopBar;
