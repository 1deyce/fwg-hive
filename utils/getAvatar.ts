"use client"

import useUserStore from "@/zustand/store/userStore";

const { getUser } = useUserStore();

export async function getUserAvatar(userId: string) {
    const response = await fetch(`/api/getAvatar?userId=${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch avatar");
    }
    const data = await response.json();
    return data.avatarUrl; // Assuming the API returns the avatar URL
}
