import { cache } from "react";
import { prisma } from "../prisma";

export const getCategories = cache(async () => {
  return prisma.category.findMany();
});
