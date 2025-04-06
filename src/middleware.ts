// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserData } from "./types/user";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const cookie: string | null | undefined =
    request.cookies.get("userData")?.value;

  if (!cookie && path.startsWith("/information")) {
    return NextResponse.redirect(new URL("/userinfo", request.url));
  }

  if (cookie) {
    const userData: UserData | null = JSON.parse(cookie);

    if (path.startsWith("/information")) {
      if (userData === null) {
        return NextResponse.redirect(new URL("/userinfo", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/information"],
};
