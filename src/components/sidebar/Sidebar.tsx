import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { SignOutButton } from "../SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/button";
import { DynamicTrips } from "./DynamicTrips";

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;

  return (
    <nav className="flex flex-col min-h-screen w-64 p-4 gap-4">
      <Link href={`/home`} prefetch={false}>
        <div className="flex items-center p-2 transition-colors hover:bg-secondary rounded-md">
          <Avatar className="w-8 h-8 mr-2">
            <AvatarImage
              src={session.user.image ? session.user.image : ""}
              alt={session.user.name!}
            />
            <AvatarFallback>
              <div
                className={`h-8 w-8 rounded-full flex justify-center items-center font-semibold relative bg-fuchsia-400`}
              >
                {Array.from(session.user.name!)[0]}
              </div>
            </AvatarFallback>
          </Avatar>
          <h2 className=" text-lg font-semibold">{session.user.name}</h2>
        </div>
      </Link>
      <div className="flex flex-col gap-2 h-full ">
        <Button asChild>
          <Link href="/trips/add">New Trip</Link>
        </Button>
        <DynamicTrips userId={session.user.id} />
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <SignOutButton />
            <h3 className="font-semibold text-lg text-muted-foreground">
              TripPlanner
            </h3>
          </div>
        </div>
      </div>
    </nav>
  );
}
