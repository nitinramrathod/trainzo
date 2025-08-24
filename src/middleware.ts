import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function middleware(req: NextRequest) {
  
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, req.url));

  const verifyToken = async (token: string) => {
    try {
      await jwtVerify(token, SECRET);
      return true;
    } catch (err) {
      console.error("Invalid token:", err);
      return false;
    }
  };

  if (pathname.startsWith("/dashboard")) {
    if (!token || !(await verifyToken(token))) return redirectTo("/login");
    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (token && (await verifyToken(token))) return redirectTo("/dashboard");
  }

  return NextResponse.next();
}

export const config = {
   matcher: ["/dashboard/:path*", "/login"]
};
