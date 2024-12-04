"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const items = [
    {
        id: 1,
        name: "'Premium Workout Plan'",
        price: 29.99,
        description: "'Access to exclusive workout routines'",
    },
    {
        id: 2,
        name: "'Nutrition Guide'",
        price: 19.99,
        description: "'Comprehensive meal planning and recipes'",
    },
    {
        id: 3,
        name: "'Fitness Tracker Pro'",
        price: 39.99,
        description: "'Advanced progress tracking and analytics'",
    },
    {
        id: 4,
        name: "'Personal Trainer Sessions'",
        price: 99.99,
        description: "'5 one-on-one virtual training sessions'",
    },
];

export default function Store() {
    const [purchasedItems, setPurchasedItems] = useState<number[]>([]);

    const handlePurchase = async (itemId: number) => {
        // In a real application, you would integrate with a payment gateway here
        // For this example, we'll simulate a successful purchase
        try {
            const response = await fetch("/api/purchase", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ itemId }),
            });

            if (response.ok) {
                setPurchasedItems([...purchasedItems, itemId]);
            } else {
                console.error("Purchase failed");
            }
        } catch (error) {
            console.error("Error during purchase:", error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Fitness Hub Store</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                    <Card key={item.id}>
                        <CardHeader>
                            <CardTitle>{item.name}</CardTitle>
                            <CardDescription>${item.price.toFixed(2)}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="mb-4">{item.description}</p>
                            <Button
                                onClick={() => handlePurchase(item.id)}
                                disabled={purchasedItems.includes(item.id)}
                            >
                                {purchasedItems.includes(item.id) ? "View" : "Buy Now"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
