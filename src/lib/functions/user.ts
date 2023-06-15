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
    where: { userId: userId, status: "confirmed" },
    include: { trip: true },
  });
  return userTrips.map((userTrip) => userTrip.trip);
}
