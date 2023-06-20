import { Trip } from "@prisma/client";
import { prisma } from "../prisma";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// NOTE: Ovo bi tribalo pregledat jel radi kako treba
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

export const getTripPointsOfInterest = async (tripId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  return prisma.trip
    .findUnique({
      where: {
        id: tripId,
      },
      include: {
        pointsOfInterest: true,
      },
    })
    .then((data) => data?.pointsOfInterest);
};
