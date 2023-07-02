import { getServerSession } from "next-auth";
import { cache } from "react";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { prisma } from "../prisma";

// NOTE: Ovo bi tribalo pregledat jel radi kako treba
export const getTripInfoAndMembers = cache(async (id: string) => {
  console.log("getTripInfoAndMembers=========================");

  const tripInfo = await prisma.trip.findUnique({
    where: { id },
  });
  const tripUsers = await prisma.userTrips
    .findMany({
      where: { tripId: id, status: "confirmed" },
      include: { user: true },
    })
    .then((result) => result.map((tripUser) => tripUser.user));

  return { ...tripInfo, users: tripUsers };
});

export const getTripMembers = async (id: string) => {
  return await prisma.userTrips
    .findMany({
      where: { tripId: id, status: "confirmed" },
      include: { user: true },
    })
    .then((result) => result.map((elem) => elem.user));
};

export const getTripPointsOfInterest = async (tripId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new Error(
      "User not authenticated, but attempting to access trip POI."
    );
  }

  return prisma.pointOfInterest
    .findMany({
      where: {
        tripId: tripId,
      },
      include: {
        categories: true,
      },
    })
    .then((data) => data ?? []);
};
