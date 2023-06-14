"use client";
import { getTripInfo } from "../../lib/functions/getTripInfo";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/Avatar";
import { PlusCircle } from "lucide-react";

const randomColors = [
  "bg-yellow-300",
  "bg-emerald-300",
  "bg-teal-300",
  "bg-indigo-300",
  "bg-fuchsia-300",
];
const generateRandomBgColor = () => {
  return randomColors[Math.floor(Math.random() * randomColors.length)];
};

const TripMembers = ({
  tripMembers,
}: {
  tripMembers: { name: string | null; id: string; image: string | null }[];
}) => {
  return (
    <ul className="flex gap-2">
      {tripMembers.map((user) => (
        <li key={user.id}>
          <Avatar className="w-8 h-8">
            <AvatarImage
              className=""
              src={user.image ? user.image : ""}
              alt={user.name!}
            />
            <AvatarFallback>
              <div
                className={`h-8 w-8 rounded-full flex justify-center items-center font-semibold relative ${generateRandomBgColor()}`}
              >
                {Array.from(user.name!)[0]}
              </div>
            </AvatarFallback>
          </Avatar>
        </li>
      ))}
    </ul>
  );
};
export default TripMembers;
