import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface PurchasedItem {
    _id: string;
    type: string;
    name: string;
    price: string;
    description: string;
    accessUrl: string;
    imgAlt: string;
    imgSrc: string;
}

export async function getPurchasedItems(userId: string): Promise<PurchasedItem[]> {
    const client = await clientPromise;
    const db = client.db("fitnessHub");

    if (!userId) throw new Error("User Id required");

    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

    if (!user || !user.purchasedItems || user.purchasedItems.length === 0) {
        return [];
    }

    const itemIds = user.purchasedItems;

    const items = await db
        .collection("storeItems")
        .find({ _id: { $in: itemIds } })
        .toArray();

    return items.map((item) => ({
        _id: item._id.toString(),
        type: item.type,
        name: item.name,
        price: item.price,
        description: item.description,
        accessUrl: item.accessUrl,
        imgAlt: item.imgAlt,
        imgSrc: item.imgSrc,
    }));
}
