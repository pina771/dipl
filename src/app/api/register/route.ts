import prisma from "@/utils/prisma";
import { pbkdf2Sync } from "crypto";
import { NextRequest, NextResponse } from "next/server";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

const secret = process.env.SECRET as string;

export async function POST(request: NextRequest) {
  const body = (await request.json()) as unknown as RegisterBody;
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse("One or more fields is missing!", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: { email },
  });

  if (exist) {
    throw new Error("Email already exists");
  }
  const hashedPassword = pbkdf2Sync(
    password,
    secret,
    5000,
    128,
    "sha512"
  ).toString("hex");

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
