import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/group/:path*","/home/:path*"],
};

export function middleware(request: NextRequest) {
  const res = request.cookies.get("token");
  if (!res) {
    return NextResponse.redirect(new URL("https://clownfish-app-dyj8n.ondigitalocean.app/login"));
  }
}
