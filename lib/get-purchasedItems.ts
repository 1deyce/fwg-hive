import clientPromise from "@/lib/mongodb";

export async function getPurchasedItems(userId: string) {
    const client = await clientPromise;
    const db = client.db("fitnessHub");
    const purchases = await db.collection("purchases").find({ userId }).toArray();
    return purchases.map((purchase) => purchase.itemId);
}