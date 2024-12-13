import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ message: "Logged out successfully" });

    res.headers.set(
        "Set-Cookie",
        serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0),
            path: "/",
        })
    );

    return res;
}
