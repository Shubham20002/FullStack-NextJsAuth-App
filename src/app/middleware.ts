// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Public paths which don't need auth
  const publicPaths = ["/login", "/signup", "/"];

  if (publicPaths.includes(path)) {
    return NextResponse.next(); // allow public routes
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // if no token, redirect to login
  }

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next(); // valid token, allow access
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url)); // invalid token, redirect to login
  }
}

// Tell Next.js which paths to run middleware on
export const config = {
  matcher: ["/profile/:path*", "/dashboard/:path*"], // protect these paths
};
