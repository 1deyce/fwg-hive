"use client";

import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const WorkoutDetail = () => {
    const [workout, setWorkout] = useState<Item[]>([]);
    const { id } = useParams();
    const workoutId = id;

    const fetchItems = async () => {
        try {
            const items = await fetchStoreItems();
            const filteredWorkout = items?.filter((item) => item._id === workoutId) || [];
            const accessUrl = filteredWorkout[0].accessUrl;
            console.log(accessUrl)
            // use url to access file data to display
            setWorkout(filteredWorkout);
        } catch (err) {
            console.error("Failed to fetch store items:", err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [workoutId, fetchItems]);

    return (
        <div>
            <h1>Workout Details for ID: {id}</h1>
            <div>{workout.map((wrkt) => wrkt.imgSrc)}</div>
        </div>
    );
};

export default WorkoutDetail;
