import connectMongo from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongo();
    const db = mongoose.connection.db!;

    try {
        const items = await db.collection("storeItems").find({}).toArray();
        return NextResponse.json(items, {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while fetching user data" },
            { status: 500 }
        );
    }
}
