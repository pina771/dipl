import { Trip } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userTrips = await prisma.userTrips.findMany({
    where: { userId: session.user.id },
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
  return NextResponse.json(retval);
}
