import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.services";

// Define protected routes
const protectedRoutes = ["/profile", "/news-feed", "/payment"];
const adminOnlyRoutes = ["/dashboard"];

type role = keyof typeof roleBasedRoutes;

// Define role-based routes
const roleBasedRoutes = {
  USER: [/^\/profile/],
  ADMIN: [/^\/admin/],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the current logged-in user (if any)
  const user = await getCurrentUser();

  // Check if the current route is protected (for all logged-in users)
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is admin-only ("/dashboard")
  const isAdminOnlyRoute = adminOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the user is not logged in and trying to access a protected route
  if (!user && (isProtectedRoute || isAdminOnlyRoute)) {
    // Redirect to the sign-in page
    return NextResponse.redirect(
      new URL(`/signin?redirect=${pathname}`, request.url)
    );
  }

  // If the route is admin-only but the user's role is not "admin"
  if (isAdminOnlyRoute && user?.role !== "admin") {
    // Redirect to the home page or an unauthorized page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Handle logged-in users and role-based route access for non-admin users
  if (user?.role && roleBasedRoutes[user?.role as role]) {
    const routes = roleBasedRoutes[user?.role as role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Default: allow access if not a protected route or if the user has access
  return NextResponse.next();
}

// Configuring the middleware to match specific routes
export const config = {
  matcher: [
    "/profile",
    "/profile/:page*",
    "/dashboard",
    "/dashboard/:page*",
    "/payment",
    "/news-feed",
    "/signin",
    "/register",
  ],
};
