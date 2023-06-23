import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const result = await prisma.message.findMany({
    where: {
      tripId: context.params.id,
    },
  });
  return NextResponse.json(result);
}
