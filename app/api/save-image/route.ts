import mongoose from "mongoose";
import connectMongo from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/verify-token";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    const { publicId } = await request.json();
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
        await connectMongo();
        const db = mongoose.connection.db!;
        const result = await db
            .collection("users")
            .findOneAndUpdate(
                { _id: new ObjectId(userId) },
                { $set: { avatarUrl: publicId } },
                { returnDocument: "after" }
            );

        if (!result) {
            console.error("No document found or updated.");
            return NextResponse.json(
                { message: "Public Id not found or updated" },
                { status: 404 }
            );
        }

        if (!result.value) {
            console.error("No document found or updated.");
        } else {
            console.log("Updated document:", result.value);
        }

        return NextResponse.json({ message: "Public Id saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving public Id:", error);
        return NextResponse.json({ message: "Error saving public Id", error }, { status: 500 });
    }
}
