import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/group/:path*", "/home/:path*"],
};

export function middleware(request: NextRequest) {
  const res = request.cookies.get("token");
  if (!res) {
    return NextResponse.redirect(new URL("http://25.22.5.35:3000/login"));
  }
}
