import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get("Authorization");
        if (!authHeader) {
            return NextResponse.json({ error: "Authorization header missing" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return NextResponse.json({ error: "Token missing" }, { status: 401 });
        }

        let userId: string;
        try {
            if (!JWT_SECRET) {
                throw new Error("JWT_SECRET is not defined");
            }
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
            userId = decoded.userId;
        } catch (err) {
            return NextResponse.json({ error: "Invalid token" }, { status: 403 });
        }

        const client = await clientPromise;
        const db = client.db("fitnessHub");
        const user = await db.collection("users").findOne({ _id : new ObjectId(userId) });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ _id: userId, name: user.name, email: user.email }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while fetching user data" },
            { status: 500 }
        );
    }
}
