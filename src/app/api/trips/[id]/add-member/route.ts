import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";

type RouteParams = {
  id: string;
};
type RequestBody = {
  user: {
    id: string;
    name: string;
  };
};
export async function POST(request: Request, context: { params: RouteParams }) {
  const tripId = context.params.id;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }
  const { user } = (await request.json()) as RequestBody;
  console.log(
    session?.user.name + " inviting  " + user.name + " to : " + tripId
  );
  try {
    await prisma.userTrips.create({
      data: {
        userId: user.id,
        tripId: tripId,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json(
          {
            message: ` ${user.name} is already a member of this trip or has a pending invitation.`,
          },
          { status: 409 }
        );
      }
    }
  }
  return NextResponse.json(
    { message: `Sent invite to ${user.name}` },
    { status: 200 }
  );
}
