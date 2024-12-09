"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface User {
    userId: string;
    name: string;
    email: string;
    avatarUrl: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    getUser: () => User | null;
    clearUser: () => void;
}

const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// TODO: fix internal server error 500 - "localStorage is not defined"

const persistUserToLocalStorage = (user: User | null) => {
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        localStorage.removeItem("user");
    }
};

const userStore = (
    set: (partial: Partial<UserState>) => void,
    get: () => UserState
): UserState => ({
    user: getUserFromLocalStorage(),
    setUser: (user: User) => {
        set({ user });
        persistUserToLocalStorage(user);
    },
    clearUser: () => {
        set({ user: null });
        persistUserToLocalStorage(null);
    },
    getUser: () => get().user,
});

const useUserStore = create(devtools(userStore, { name: "userStore" }));

export default useUserStore;
