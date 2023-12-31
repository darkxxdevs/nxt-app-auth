import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  const isPublicRoute =
    path === "/users/login" ||
    path === "/users/signup" ||
    path === "/users/verifyemail" ||
    path === "/users/recovery/password" ||
    path === "/users/recovery"

  const token = req.cookies.get("token")?.value || ""

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl))
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/users/login", req.nextUrl))
  }
}

export const config = {
  matcher: [
    "/",
    "/users/login",
    "/users/signup",
    "/users/profile/:path*",
    "/users/verifyemail",
    "/users/recovery/password",
    "/users/recovery",
  ],
}
