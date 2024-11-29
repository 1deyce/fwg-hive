import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const { itemId } = await request.json();
        const client = await clientPromise;
        const db = client.db("fitnessHub");

        // In a real application, you would verify the user's session here
        // For this example, we'll use a placeholder user ID
        const userId = "placeholder_user_id";

        // Record the purchase
        const result = await db.collection("purchases").insertOne({
            userId,
            itemId,
            purchaseDate: new Date(),
        });

        return NextResponse.json(
            { message: "Purchase successful", purchaseId: result.insertedId },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred during the purchase" },
            { status: 500 }
        );
    }
}
