"use client";

import { fetchStoreItems, Item } from "@/lib/fetch-storeItems";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChallengeDetail = () => {
    const [challenge, setChallenge] = useState<Item[]>([]);
    const { id } = useParams();
    const challengeId = id;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await fetchStoreItems();
                const filteredChallenge = items?.filter((item) => item._id === challengeId) || [];
                const accessUrl = filteredChallenge[0]?.accessUrl;
                console.log(accessUrl);
                // use url to access file data to display
                setChallenge(filteredChallenge);
            } catch (err) {
                console.error("Failed to fetch store items:", err);
            }
        };

        fetchItems();
    }, [challengeId]);

    return (
        <div>
            <h1>Workout Details for ID: {id}</h1>
            <div>{challenge.map((chal) => chal.imgSrc)}</div>
        </div>
    );
};

export default ChallengeDetail;
