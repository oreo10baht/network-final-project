import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/group/:path*","/home/:path*"],
};

export function middleware(request: NextRequest) {
  const res = request.cookies.get("token");
  if (!res) {
    const currentURL = new URL(window.location.href);
    const loginURL = new URL("/login", currentURL);
    return NextResponse.redirect(loginURL);
    // return NextResponse.redirect(new URL("http://localhost:3000/login"));
  }
}
