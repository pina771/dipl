"use client";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { Trip } from "@prisma/client";
import { SocketLoader } from "./SocketLoader";

type ConfirmedPendingTrips = {
  confirmedTrips: Trip[];
  pendingTrips: Trip[];
};

// NOTE: Možda bi se mogao i ovdje dodati nekakav tag
// npr. "${userId}-tripInvites" da se cachira zahtjev
// U takvom slučaju bi imali cache od RQ koji bi se provjerava na interakcijama
// svakih 10 sekundi, ali bi imali http cache od servera za pozive tog korisnika
// koji bi se moga invalidirati sa npr. invalidateTag u API-u api/trips/[id]/add-member
async function fetchTripsForUser(): Promise<ConfirmedPendingTrips> {
  return fetch("/api/user/trips", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((value) => value);
}

export function DynamicTrips({ userId }: { userId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tripInvites"],
    queryFn: fetchTripsForUser,
    staleTime: 10 * 1000,
  });
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {data?.pendingTrips.length ?? ""} Invitations
          </Button>
        </PopoverTrigger>
        {!isLoading && data!.pendingTrips.length > 0 && (
          <PopoverContent>
            {data?.pendingTrips.map((trip) => (
              <Link key={trip.id} href={`/trips/join/${trip.id}`}>
                {trip.name}
              </Link>
            ))}
          </PopoverContent>
        )}
      </Popover>
      <div className="flex flex-col mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">Your trips:</h3>
          <SocketLoader userId={userId} trips={data?.confirmedTrips} />
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          data?.confirmedTrips.map((trip) => (
            <Button
              key={trip.id}
              variant="ghost"
              className="justify-start text-lg"
              asChild
            >
              <Link href={`/trips/${trip.id}`}>{trip.name}</Link>
            </Button>
          ))
        )}
      </div>
    </>
  );
}
