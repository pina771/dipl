import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NOTE: Zašto bi se uopće slao userId
// -> možda bi se moglo
export type JoinTripRequestBody = {
  userId: string;
  joinDecline: "decline" | "join";
};
export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const tripId = context.params.id;
  const session = await getServerSession(authOptions);
  const data = (await request.json()) as JoinTripRequestBody;

  console.log("This is the getServerSession object in route: ");
  console.log(session);

  if (!session || data.userId !== session.user.id) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }

  try {
    if (data.joinDecline === "decline") {
      await prisma.userTrips.delete({
        where: {
          userId_tripId: {
            userId: data.userId,
            tripId: tripId,
          },
        },
      });
      return NextResponse.json(
        { message: "Declined invitiation." },
        { status: 200 }
      );
    } else {
      await prisma.userTrips.update({
        where: {
          userId_tripId: {
            userId: data.userId,
            tripId: tripId,
          },
        },
        data: {
          status: "confirmed",
        },
      });
      return NextResponse.json(
        { message: "Accepted invitiation!" },
        { status: 200 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
