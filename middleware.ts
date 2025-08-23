// // middleware.ts (Next.js 13+)
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// console.log('SECRET', SECRET)

// export async function middleware(req: NextRequest) {
//     console.log('in middleware');
//   const token = req.cookies.get("token")?.value; // Or from Authorization header
//   // Protect /admin routes
//   if (req.nextUrl.pathname.startsWith("/dashboard")) {
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//       await jwtVerify(token, SECRET); // Verifies token
//       return NextResponse.next();
//     } catch (err) {
//       console.error("Invalid token:", err);
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//    matcher: ["/dashboard", "/dashboard/:path*"] // Apply only to /dashboard routes
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.error("Middleware hit for:", req.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};