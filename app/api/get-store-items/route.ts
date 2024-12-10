import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("fitnessHub");

    try {
        const items = await db.collection("storeItems").find({}).toArray();
        console.log("store items from db: ", items);
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
