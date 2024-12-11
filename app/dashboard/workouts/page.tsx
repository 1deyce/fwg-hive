"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useState, useEffect } from "react";
import useUserStore from "@/zustand/store/userStore";
import { categories } from "@/utils/storeItemCategories";
import { useRouter } from "next/navigation";

export default function Workouts() {
    const [workouts, setWorkouts] = useState<Item[]>([]);
    const { getUser } = useUserStore();
    const user = getUser();
    const router = useRouter();
    const purchasedWorkoutIds = user?.purchasedItems || [];

    useEffect(() => {
        const fetchItems = async () => {
            const items = await fetchStoreItems();

            const filteredWorkouts =
                items?.filter((item) => item.type === categories.workoutsType) || [];

            setWorkouts(filteredWorkouts);
        };

        fetchItems();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Workouts</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workouts.map((workout) => (
                    <Card key={workout._id}>
                        <CardHeader>
                            <CardTitle>{workout.name}</CardTitle>
                            <CardDescription>{workout.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {purchasedWorkoutIds.includes(workout._id) ? (
                                <Button onClick={() => router.push(`/dashboard/workouts/${workout._id}`)}>
                                    Open
                                </Button>
                            ) : (
                                <Button onClick={() => router.push("/dashboard/store")}>
                                    Purchase Workout
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
