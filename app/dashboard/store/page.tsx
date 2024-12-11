"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useUserStore from "@/zustand/store/userStore";
import { User } from "@/zustand/store/userStore";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Item } from "@/lib/fetch-storeItems";
import { fetchStoreItems } from "@/lib/fetch-storeItems";

export default function Store() {
    const [items, setItems] = useState<Item[]>([]);
    const { getUser, setUser } = useUserStore();
    const user = getUser();
    const { toast } = useToast();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const fetchedItems = await fetchStoreItems();
                console.log("Store items fetched successfully:", fetchedItems);
                setItems(fetchedItems);
            } catch (error) {
                console.error("Failed to fetch store items:", error);
                toast({ title: "Error fetching items", description: "Could not load store items." });
            }
        };

        fetchItems();
    }, [user]);

    const handlePurchase = async (itemId: string) => {
        if (!user) {
            console.error("User not found");
            return;
        }
        const userId = user.userId;

        try {
            const response = await fetch("/api/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId, userId }),
            });

            if (response.ok) {
                const updatedPurchasedItems = [...(user.purchasedItems || []), itemId];

                const updatedUser: User = {
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    avatarUrl: user.avatarUrl,
                    purchasedItems: updatedPurchasedItems,
                };
                console.log("Purchase successful:", updatedUser);
                toast({
                    variant: "default",
                    title: "Purchase successful",
                    description: `You have purchased ${items}`,
                    duration: 5000,
                });

                setUser(updatedUser);
            } else {
                toast({
                    variant: "destructive",
                    title: "You have already purchased this product.",
                });
                console.error("Purchase failed");
            }
        } catch (error) {
            console.error("Error during purchase:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Shop FWG</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <Card key={item._id} className="">
                        <CardHeader className="text-center">
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center flex flex-col items-center">
                            <Image
                                src={item.imgSrc}
                                alt={item.imgAlt}
                                width={300}
                                height={10}
                                className="rounded-sm"
                            />
                            <p className="my-4 text-sm">{item.description}</p>
                            <CardDescription className="text-lg text-teal-600 mb-3">
                                R{item.price}
                            </CardDescription>
                            <Button
                                onClick={() => handlePurchase(item._id)}
                                disabled={user?.purchasedItems?.includes(item._id)}
                            >
                                Buy Now
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
