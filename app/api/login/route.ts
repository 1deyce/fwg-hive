import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyPassword } from "@/lib/verify-password";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        console.log("Received login request for email:", email);

        const client = await clientPromise;
        console.log("Connected to MongoDB");

        const db = client.db("fitnessHub");
        const existingUser = await db.collection("users").findOne({ email });

        if (!existingUser) {
            console.log("User not found:", email);
            return NextResponse.json(
                { error: "User not found, please head over to sign up" },
                { status: 400 }
            );
        }

        const isValidPassword = await verifyPassword(password, existingUser.password);
        if (!isValidPassword) {
            console.log("Invalid password for user:", email);
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const token = jwt.sign({ userId: existingUser._id, name: existingUser.name }, JWT_SECRET, {
            expiresIn: "1h",
        });

        const response = NextResponse.json(
            {
                message: "Login successful",
                userId: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                avatarUrl: existingUser.avatarUrl,
                purchasedItems: existingUser.purchasedItems,
                token,
            },
            { status: 200 }
        );

        response.headers.set(
            "Set-Cookie",
            serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60,
                path: "/",
            })
        );

        return response;
    } catch (error) {
        console.error("Error during login:", error);
        return NextResponse.json({ error: "An error occurred while logging in" }, { status: 500 });
    }
}
