"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Dumbbell,
    Utensils,
    Trophy,
    User,
    User2,
    LogOut,
    ShoppingBag,
    LayoutDashboard,
    Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCldImageUrl } from "next-cloudinary";
import { Separator } from "@/components/ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import useLogout from "@/lib/logout";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "@/zustand/store/userStore";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const logout = useLogout();
    const { toast } = useToast();
    const { getUser, clearUser } = useUserStore();

    const user = getUser();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
        { icon: Dumbbell, label: "Workouts", href: "/dashboard/workouts" },
        { icon: Trophy, label: "Challenges", href: "/dashboard/challenges" },
        { icon: Utensils, label: "Meal Plans", href: "/dashboard/meal-plans" },
        { icon: ShoppingBag, label: "Store", href: "/dashboard/store" },
        { icon: User, label: "Profile", href: "/dashboard/profile" },
    ];

    const handleLogout = () => {
        logout();
        clearUser();
        toast({
            variant: "default",
            title: `You have been logged out.`,
        });
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const avatarUrl = getCldImageUrl({
                    src: user?.avatarUrl || "",
                    width: 300,
                    height: 300,
                    crop: "fill",
                });
                setAvatar(avatarUrl);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching avatar:", error);
                setAvatar(null);
                setIsLoading(false);
            }
        };

        fetchAvatar();
    }, []);

    return (
        <SidebarProvider>
            <div className="flex w-full h-screen bg-neutral-950">
                <Sidebar variant="floating" className="bg-neutral-950">
                    <SidebarHeader>
                        <div className="flex items-center gap-2 px-4 py-2">
                            <Avatar>
                                {isLoading ? (
                                    <AvatarFallback>
                                        <Loader />
                                    </AvatarFallback>
                                ) : avatar ? (
                                    <AvatarImage src={avatar} alt="User" />
                                ) : (
                                    <AvatarFallback>
                                        <User2 />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <div>
                                <p className="font-semibold">{user?.name}</p>
                                <p className="text-sm text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Separator />
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Button onClick={handleLogout} variant={"default"}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </Button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <div className="flex-1 overflow-auto">
                    <header className="bg-background shadow">
                        <div className="flex items-center justify-between px-4 py-4">
                            <SidebarTrigger />
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <div>{/* Add any header actions here */}</div>
                        </div>
                    </header>
                    <main className="p-6">{children}</main>
                </div>
            </div>
        </SidebarProvider>
    );
}
