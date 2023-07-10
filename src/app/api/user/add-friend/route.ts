import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

type SendFriendRequestBody = {
  userEmail: string;
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userEmail } = (await request.json()) as SendFriendRequestBody;
  const friendExists = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!friendExists) {
    return NextResponse.json(
      { message: "No such user exists." },
      { status: 404 }
    );
  }

  const result = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      friends: {
        connect: { id: friendExists.id },
      },
    },
  });
  if (result) {
    revalidateTag("/home");
    return NextResponse.json(
      { message: "Friend request sent." },
      { status: 200 }
    );
  }
}
