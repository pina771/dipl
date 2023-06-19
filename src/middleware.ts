import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      return !!token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
});
export const config = {
  matcher: ["/(home|trips)/:path*"],
};
