"use client";

import useUserStore from "@/zustand/store/userStore";
import { useRouter } from "next/navigation";

const useLogout = () => {
    const clearUser = useUserStore((state) => state.clearUser);
    const router = useRouter();

    const logout = async () => {
        clearUser();

        await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.removeItem("token");
        router.push("/login");
    };

    return logout;
};

export default useLogout;
