import { Trip } from "@prisma/client";
import { prisma } from "../prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// NOTE: Cachirati ovo ?
export async function getFriendsForUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error("Not authorized to view friends.");
  }

  // Korisnici koji su poslali zahtjev ovom korisniku
  const q1 = prisma.user
    .findUnique({ where: { id: session.user.id } })
    .friends2({
      select: { id: true, name: true, email: true },
    });

  // korisnici kojima je korisnik poslao zahtjev
  const q2 = prisma.user
    .findUnique({
      where: { id: session.user.id },
    })
    .friends({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

  const [friendsToUser, userToFriends] = await Promise.all([q1, q2]);
  const ids = friendsToUser?.map((el) => el.id) ?? [];
  const ids2 = userToFriends?.map((el) => el.id) ?? [];

  // Prijatelji korisniku su o oni kojima je on poslao zahtjev i oni njemu isto
  const friends = userToFriends?.filter((elem) => ids?.includes(elem.id)) ?? [];

  // Zahtjevi za prijateljstvo su svi oni koji su prijatelj sa korisnikom
  // ali on nije prijatelj s njima
  const friendshipRequests = friendsToUser?.filter(
    (elem) => !ids2.includes(elem.id)
  );

  return {
    friends: friends ?? [],
    friendshipRequests: friendshipRequests ?? [],
  };
}

export async function getTripsForUser(userId: string) {
  const userTrips = await prisma.userTrips.findMany({
    where: { userId: userId },
    include: { trip: true },
  });
  const retval: { confirmedTrips: Trip[]; pendingTrips: Trip[] } = {
    confirmedTrips: [],
    pendingTrips: [],
  };
  userTrips.forEach((userTrip) =>
    userTrip.status === "pending"
      ? retval.pendingTrips.push(userTrip.trip)
      : retval.confirmedTrips.push(userTrip.trip)
  );
  return retval;
}
