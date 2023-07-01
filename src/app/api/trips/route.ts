import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

interface AddTripBody {
  name: string;
  desc: string;
  dateRange: {
    from: Date;
    to: Date;
  };
}

// TODO: Backend Validation
export async function POST(req: Request) {
  const body = (await req.json()) as AddTripBody;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  try {
    await prisma.trip.create({
      data: {
        name: body.name,
        desc: body.desc,
        dateFrom: body.dateRange.from,
        dateUntil: body.dateRange.to,
        userTrips: {
          create: {
            userId: session.user.id,
            status: "confirmed",
          },
        },
      },
    });
  } catch (e) {
    throw new Error("Error while attempting to insert new trip to DB.");
  }

  return NextResponse.json({ message: "Created." }, { status: 201 });
}
