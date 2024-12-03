import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { jwtVerify } from "jose";

interface JWTUserPayload {
    userId: string; // Define the expected property
    name: string; // Add other properties if present
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    console.log("Token: ", token);
    const { pathname, origin } = req.nextUrl;

    if (!token) {
        console.log("No token found, redirecting to login");
        if (pathname !== "/login") {
            const loginUrl = new NextURL("/login", origin);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    let userId: string | undefined;
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: JWTUserPayload };
        console.log("Token valid, user ID:", payload.userId);
        userId = payload.userId; 
    } catch (err) {
        console.error("Token validation error:", err);
        if (pathname !== "/login") {
            const loginUrl = new NextURL("/login", origin);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // If token is valid and trying to access login, redirect to dashboard
    if (pathname === "/login") {
        const dashboardUrl = new NextURL("/dashboard", req.url);
        if (userId) {
            req.nextUrl.searchParams.set('userId', userId);
        }
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};