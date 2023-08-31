import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(`${process.env.API}/login`);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*"],
};
