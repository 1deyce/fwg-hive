import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
    try {
        const { itemId } = await request.json();
        const client = await clientPromise;
        const db = client.db("fitnessHub");

        // Get the user ID by calling the get-user route
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

        const result = await db.collection("purchases").insertOne({
            userId,
            itemId,
            purchaseDate: new Date(),
        });

        await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            { $addToSet: { purchasedItems: itemId } }  // Use $push if you want duplicates, $addToSet prevents duplicates
        );

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
