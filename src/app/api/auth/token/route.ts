import { encode, getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req, secret: process.env.SECRET });

  if (!token)
    return NextResponse.json({ message: "Not Authorized." }, { status: 401 });
  return NextResponse.json({ token: cookies().get("next-auth.session-token") });
}
