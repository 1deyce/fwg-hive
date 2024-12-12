"use client";

import { useEffect, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast();
    const setUser = useUserStore((state) => state.setUser);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

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
            useEffect(() => {
                localStorage.setItem("token", token);
            })
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
                    <CardTitle>Login to FWG Hive</CardTitle>
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
                            <div className="relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={isVisible ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 mt-3"
                                    type="button"
                                    onClick={toggleVisibility}
                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                    aria-pressed={isVisible}
                                    aria-controls="password"
                                >
                                    {isVisible ? (
                                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                                    ) : (
                                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                                    )}
                                </button>
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