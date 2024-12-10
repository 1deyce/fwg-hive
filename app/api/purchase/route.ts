import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
    try {
        const { itemId, userId } = await request.json();
        if (!userId) throw new Error("User Id required");
        if (!itemId) throw new Error("Item Id required");

        const client = await clientPromise;
        const db = client.db("fitnessHub");

        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
        if (!user) {
            throw new Error("Invalid User ID");
        }

        if (user.purchasedItems && user.purchasedItems.includes(itemId)) {
            return NextResponse.json(
                {
                    error: "You have already purchased this item",
                },
                {
                    status: 400,
                }
            );
        }

        const result = await db.collection("purchases").insertOne({
            userId,
            itemId,
            purchaseDate: new Date(),
        });

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            // Use $push if you want duplicates, $addToSet prevents duplicates
            { $addToSet: { purchasedItems: itemId } }
        );

        return NextResponse.json(
            {
                message: "Purchase successful",
                purchaseId: result.insertedId,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "An error occurred during the purchase",
            },
            {
                status: 500,
            }
        );
    }
}
