"use client";

import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MealPlanDetail = () => {
    const [mealPlan, setMealPlan] = useState<Item[]>([]);
    const { id } = useParams();
    const mealPlanId = id;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await fetchStoreItems();
                const filteredMealPlan = items?.filter((item) => item._id === mealPlanId) || [];
                const accessUrl = filteredMealPlan[0]?.accessUrl;
                console.log(accessUrl);
                // use url to access file data to display
                setMealPlan(filteredMealPlan);
            } catch (err) {
                console.error("Failed to fetch store items:", err);
            }
        };

        fetchItems();
    }, [mealPlanId]);

    return (
        <div>
            <h1>Workout Details for ID: {id}</h1>
            <div>{mealPlan.map((plan) => plan.imgSrc)}</div>
        </div>
    );
};

export default MealPlanDetail;
