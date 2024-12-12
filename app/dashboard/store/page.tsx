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
import Paystack from "@paystack/inline-js";

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
                toast({
                    title: "Error fetching items",
                    description: "Could not load store items.",
                });
            }
        };

        fetchItems();
    }, [user, toast]);

    const handlePurchase = async (item: Item) => {
        if (!user) {
            console.error("User not found");
            return;
        }

        const { _id: itemId, price: itemPrice, name: itemName } = item;
        const userId = user.userId;
        const userEmail = user.email;

        const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
        if (!paystackPublicKey) {
            throw new Error("Public Key not valid or undefined");
        }

        try {
            const popup = new Paystack();
            popup.checkout({
                key: paystackPublicKey,
                email: userEmail,
                amount: parseFloat(itemPrice) * 100,
                onSuccess: async (transaction) => {
                    console.log("Transaction: ", transaction);
                    toast({
                        variant: "default",
                        title: "Payment successful",
                        description: "Thank you for your purchase.",
                    });

                    try {
                        const response = await fetch("/api/purchase", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                itemId,
                                userId,
                                reference: transaction.reference,
                            }),
                        });

                        if (response.ok) {
                            const updatedPurchasedItems = [...(user.purchasedItems || []), itemId];

                            const updatedUser: User = {
                                ...user,
                                purchasedItems: updatedPurchasedItems,
                            };
                            console.log("Purchase updated successfully:", updatedUser);
                            toast({
                                variant: "default",
                                title: "Purchase recorded successfully",
                                description: `You have purchased the ${itemName}. Please head over to the ${item.type} page to view your product.`,
                                duration: 5000,
                            });

                            setUser(updatedUser);
                        } else {
                            toast({
                                variant: "destructive",
                                title: "Unable to record the purchase.",
                            });
                            console.error("Failed to record purchase");
                        }
                    } catch (error) {
                        console.error("Error during purchase:", error);
                    }
                },
                onLoad: (response) => {
                    console.log("onLoad: ", response);
                },
                onCancel: () => {
                    toast({
                        variant: "destructive",
                        title: "Payment cancelled",
                        description: "Purchase was cancelled.",
                    });
                    console.log("onCancel");
                },
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Payment failed",
                        description: "Please try again.",
                    });
                    console.log("Error: ", error.message);
                },
            });
        } catch (error) {
            console.error("Error initializing Paystack:", error);
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
                                height={300}
                                className="rounded-sm"
                            />
                            <p className="my-4 text-sm">{item.description}</p>
                            <CardDescription className="text-lg text-teal-600 mb-3">
                                R{item.price}
                            </CardDescription>
                            <Button
                                onClick={() => handlePurchase(item)}
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
