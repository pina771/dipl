import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getTripsForUser } from "../../lib/functions/user";

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;

  const trips = await getTripsForUser(session.user.id);

  return (
    <nav className="flex flex-col min-h-screen w-64 bg-slate-100 p-4">
      <h1 className=" text-2xl font-black text-indigo-600">TripPlanner</h1>
      <Link href="/home">
        <div className="flex items-center gap-2 mt-4 mb-8 hover:bg-slate-200">
          <span className="rounded-full w-6 h-6 ring-2  border-1 "></span>
          <h2 className=" text-xl "> {session.user.name}</h2>
        </div>
      </Link>
      <Link href="/trips/add">ADD TRIP</Link>
      <div className="flex flex-col items-start">
        <h3 className=" text-lg font-semibold">Your trips:</h3>
        <ul className="w-full">
          {trips?.map((trip) => (
            <li key={trip.id} className="w-full flex">
              <Link
                href={`/trips/${trip.id}`}
                className="text-lg hover:bg-slate-200 rounded-md p-2 w-full"
              >
                {trip.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
