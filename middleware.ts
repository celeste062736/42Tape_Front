import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
// export default withAuth({
//   callbacks: {
//     authorized({ req, token }) {
//       // `/admin` requires admin role
//       if (req.nextUrl.pathname === "/admin") {
//         return token?.userRole === "admin"
//       }
//       // `/me` only requires the user to be logged in
//       return !!token
//     },
//   },
// })

import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const protectedPaths = ["/admin"];
  const matchesProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  if (matchesProtectedPath) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.role !== "admin") {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}

// export const config = { matcher: ["/admin", "/me"] }
