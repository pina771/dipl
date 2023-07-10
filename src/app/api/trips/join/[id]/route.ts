import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export type JoinTripRequestBody = {
  joinDecline: "decline" | "join";
};
export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const tripId = context.params.id;
  const session = await getServerSession(authOptions);
  const data = (await request.json()) as JoinTripRequestBody;

  if (!session?.user) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }
  try {
    if (data.joinDecline === "decline") {
      await prisma.userTrips.delete({
        where: {
          userId_tripId: {
            userId: session?.user.id,
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
            userId: session?.user.id,
            tripId: tripId,
          },
        },
        data: {
          status: "confirmed",
        },
      });
      revalidatePath(`/trips/${tripId}`);
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
