import { Trip } from "@prisma/client";
import { prisma } from "../prisma";
import { cache } from "react";

export const getTripInfoAndMembers = cache(async (id: string) => {
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
