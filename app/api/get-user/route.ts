import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/verify-token";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) throw new Error("Token not found");

    let userId: string | undefined;

    try {
        const user = await verifyToken(token);
        if (!user) {
            throw new Error("No user found");
        }
        userId = user.userId;
    } catch (error) {
        console.error("Token verification failed: ", error);
    }

    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const client = await clientPromise;
        const db = client.db("fitnessHub");
        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                _id: userId,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "An error occurred while fetching user data",
            },
            { status: 500 }
        );
    }
}
