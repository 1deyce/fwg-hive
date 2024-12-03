"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useUserStore from "@/zustand/store/userStore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { toast } = useToast();
    const setUser = useUserStore((state) => state.setUser);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json();
        const token = data.token;

        if (response.ok) {
            localStorage.setItem("token", token);
            setUser(data);
            router.push("/dashboard");
            toast({
                variant: "default",
                title: `Login successful, welcome back ${data.name}.`,
            });
        } else {
            console.error("An error occurred while logging in");
            if (response.status === 400) {
                toast({
                    variant: "destructive",
                    title: "User not found, please sign up first or try again",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            } else if (response.status === 401) {
                toast({
                    variant: "destructive",
                    title: "Invalid Password",
                    description: "Please try again",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Login to FWG HIVE</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-6">
                            <Button type="submit">Login</Button>
                            <Button variant="outline" onClick={() => router.push("/signup")}>
                                Sign Up
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
