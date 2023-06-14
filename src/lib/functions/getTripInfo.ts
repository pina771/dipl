import { prisma } from "../prisma";
import { cache } from "react";

export const getTripInfo = cache(async (id: string) => {
  return await prisma.trip.findFirst({
    where: { id },
    include: { users: { select: { id: true, name: true, image: true } } },
  });
});
