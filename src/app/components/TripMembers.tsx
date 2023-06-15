"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
    <ul className="flex gap-2 items-center">
      {tripMembers.map((user) => (
        <li key={user.id} className="flex">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger>
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
              </TooltipTrigger>
              <TooltipContent side="bottom">{user.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      ))}
    </ul>
  );
};
export default TripMembers;
