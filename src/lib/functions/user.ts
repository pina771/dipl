import { Trip } from "@prisma/client";
import { prisma } from "../prisma";

export async function getFriendsForUser(userId: string) {
  const userFriends = await prisma.user
    .findUnique({
      where: { id: userId },
    })
    .friends({
      select: {
        id: true,
        name: true,
      },
    });
  return userFriends;
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
