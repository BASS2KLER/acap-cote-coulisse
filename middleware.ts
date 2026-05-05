import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protection de toutes les routes /admin sauf /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const auth = request.cookies.get("acap_admin")?.value;
    if (auth !== "ok") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
