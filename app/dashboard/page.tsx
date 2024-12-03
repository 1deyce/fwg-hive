import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

async function getPurchasedItems(userId: string) {
    const client = await clientPromise;
    const db = client.db("fitnessHub");
    const purchases = await db.collection("purchases").find({ userId }).toArray();
    return purchases.map((purchase) => purchase.itemId);
}

export default async function Dashboard({ searchParams }) {
    const params = await searchParams;
    const userId = params.userId;
    console.log("User ID from URL: ", userId);

    // if (!userId) {
    //     redirect('/login');
    // }

    const purchasedItems = await getPurchasedItems(userId);
    console.log("Purchased items: ", purchasedItems);


    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Workouts</CardTitle>
                        <CardDescription>Number of completed workouts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">24</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Challenges</CardTitle>
                        <CardDescription>Ongoing fitness challenges</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">3</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Calories Burned</CardTitle>
                        <CardDescription>Total calories burned this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">1,250</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Meal Plan Adherence</CardTitle>
                        <CardDescription>This week's meal plan progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">85%</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Your Purchased Items</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {purchasedItems
                        .filter((item) => purchasedItems.includes(item.id))
                        .map((item) => (
                            <Card key={item.id}>
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Access your purchased content here</p>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </div>
    );
}
