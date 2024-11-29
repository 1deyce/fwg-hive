import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyPassword } from "@/lib/verify-password";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const client = await clientPromise;
        const db = client.db("fitnessHub");

        const existingUser = await db.collection("users").findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found, please head over to sign up" }, { status: 400 });
        }

        const isValidPassword = await verifyPassword(password, existingUser.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: existingUser._id, name: existingUser.name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json(
            { message: "Login successful", userId: existingUser._id, name: existingUser.name, token },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while logging in" },
            { status: 500 }
        );
    }
}
