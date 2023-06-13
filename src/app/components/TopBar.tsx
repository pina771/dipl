"use client";

import { Trip } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TopBar = ({ tripInfo }: { tripInfo: Trip }) => {
  const path = usePathname();
  const isMap = path.split("/").at(-1) === "map";

  return (
    <div className=" bg-slate-100 ">
      <ul className="flex text-2xl items-center pt-4 ">
        <li className={`${isMap ? "" : "bg-white"}`}>
          <Link href={`/trips/${tripInfo.id}`}>{tripInfo.name}</Link>
        </li>
        <li className={`${isMap ? "bg-white" : ""} `}>
          <Link href={`/trips/${tripInfo.id}/map`}>Map</Link>
        </li>
      </ul>
    </div>
  );
};
export default TopBar;
