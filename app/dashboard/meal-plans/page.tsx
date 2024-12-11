"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useState, useEffect } from "react";
import useUserStore from "@/zustand/store/userStore";
import { categories } from "@/utils/storeItemCategories";
import { useRouter } from "next/navigation";

export default function MealPlans() {
    const [mealPlans, setMealPlans] = useState<Item[]>([]);
    const { getUser } = useUserStore();
    const user = getUser();
    const router = useRouter();
    const purchasedMealPlanIds = user?.purchasedItems || [];

    useEffect(() => {
        const fetchItems = async () => {
            const items = await fetchStoreItems();

            const filteredPlans =
                items?.filter((item) => item.type === categories.mealPlansType) || [];

            setMealPlans(filteredPlans);
        };

        fetchItems();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Meal Plans</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mealPlans.map((plan) => (
                    <Card key={plan._id}>
                        <CardHeader>
                            <CardTitle>{plan.name}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {purchasedMealPlanIds.includes(plan._id) ? (
                                <Button
                                    onClick={() =>
                                        router.push(`/dashboard/challenges/${plan._id}`)
                                    }
                                >
                                    Open
                                </Button>
                            ) : (
                                <Button onClick={() => router.push("/dashboard/store")}>
                                    Purchase Meal Plan
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
