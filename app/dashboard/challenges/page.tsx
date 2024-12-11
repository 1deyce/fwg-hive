"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useState, useEffect } from "react";
import useUserStore from "@/zustand/store/userStore";
import { categories } from "@/utils/storeItemCategories";
import { useRouter } from "next/navigation";

export default function Challenges() {
    const [challenges, setChallenges] = useState<Item[]>([]);
    const { getUser } = useUserStore();
    const user = getUser();
    const router = useRouter();
    const purchasedChallengeIds = user?.purchasedItems || [];

    useEffect(() => {
        const fetchItems = async () => {
            const items = await fetchStoreItems();

            const filteredChallenges =
                items?.filter((item) => item.type === categories.challengesType) || [];

            setChallenges(filteredChallenges);
        };

        fetchItems();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Fitness Challenges</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {challenges.map((challenge) => (
                    <Card key={challenge._id}>
                        <CardHeader>
                            <CardTitle>{challenge.name}</CardTitle>
                            <CardDescription>{challenge.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {purchasedChallengeIds.includes(challenge._id) ? (
                                <Button onClick={() => router.push(`/dashboard/challenges/${challenge._id}`)}>
                                    Open
                                </Button>
                            ) : (
                                <Button onClick={() => router.push("/dashboard/store")}>
                                    Join Challenge
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
