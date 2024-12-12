"use client";

import useUserStore from "@/zustand/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useLogout = () => {
    const clearUser = useUserStore((state) => state.clearUser);
    const router = useRouter();

    const logout = async () => {
        clearUser();

        await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        });
        router.push("/login");
    };

    useEffect(() => {
        localStorage.removeItem("token");
    });

    return logout;
};

export default useLogout;
