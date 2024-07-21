import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const hasSessionToken = req.cookies.get("next-auth.session-token");

  if (!hasSessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
