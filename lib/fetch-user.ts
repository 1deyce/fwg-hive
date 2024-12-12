"use client"

import { useEffect, useState } from "react";

export const fetchUserData = async () => {
    const [token, setToken] = useState<String>(); 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token Required");
        setToken(token);
    })

    try {
        const response = await fetch('/api/get-user', {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return { _id: data._id, name: data.name, email: data.email };
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { name: '', email: '' };
    }
};