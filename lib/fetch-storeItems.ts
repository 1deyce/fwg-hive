export interface Item {
    _id: string;
    type: string;
    name: string;
    price: string;
    description: string;
    accessUrl: string;
    imgSrc: string;
    imgAlt: string;
}

export const fetchStoreItems = async (): Promise<Item[]> => {
    const response = await fetch("/api/get-store-items", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.error("Failed to fetch store items");
        return [];
    }

    const data: Item[] = await response.json();
    return data;
};